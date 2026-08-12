import { createContext, useContext, useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { mapAuthError } from '../utils/authErrors';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const AuthContext = createContext(null);

// Fast-path user from local storage so the first render doesn't flash a
// signed-out state while getSession() resolves. supabase-js stores the session
// under `sb-<project-ref>-auth-token`; the legacy `supabase.auth.token` key is
// checked too for older installs.
function getCachedUser() {
  if (typeof window === 'undefined') return null;
  try {
    for (const key of Object.keys(window.localStorage)) {
      if (key === 'supabase.auth.token' || (key.startsWith('sb-') && key.endsWith('-auth-token'))) {
        const parsed = JSON.parse(window.localStorage.getItem(key));
        return parsed?.user ?? null;
      }
    }
  } catch {
    /* ignore */
  }
  return null;
}

// A session with token_type 'recovery' is the one created when the user opens
// the email reset link — the reset page must render the new-password form for
// it instead of treating the user as fully signed in.
function isRecoverySession(session) {
  return session?.token_type === 'recovery' || session?.user?.amr?.some((a) => a.method === 'recovery');
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getCachedUser);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recovery, setRecovery] = useState(false);
  const mountedRef = useRef(true);
  const profileFetchedRef = useRef(false);
  const userIdRef = useRef(null);

  const PROFILE_COLUMNS = 'id, full_name, avatar_url, selected_pacing, notification_preferences, created_at, updated_at';
  const PROFILE_COLUMNS_SAFE = 'id, full_name, avatar_url, selected_pacing, created_at, updated_at';
  const profileColumnFallbackRef = useRef(false);
  const fetchProfileRef = useRef(null);

  const fetchProfile = useCallback(async (userId, forceRefresh = false) => {
    if (!userId) return;
    if (profileFetchedRef.current && !forceRefresh && userIdRef.current === userId) return;

    userIdRef.current = userId;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(profileColumnFallbackRef.current ? PROFILE_COLUMNS_SAFE : PROFILE_COLUMNS)
        .eq('id', userId)
        .single();

      if (error) {
        const isMissingColumn = error.code === '42703'
          || /column .* does not exist/i.test(error.message || '');
        // Future schema drift on the read path must not spam errors on every
        // navigation: drop the unknown column and degrade silently.
        if (isMissingColumn && !profileColumnFallbackRef.current) {
          profileColumnFallbackRef.current = true;
          void fetchProfileRef.current(userId, forceRefresh);
          return;
        }
        if (!isMissingColumn) {
          console.error('fetchProfile error:', error);
        }
        if (error.code === 'PGRST116') {
          if (mountedRef.current) setProfile(null);
        }
      } else {
        if (mountedRef.current) {
          setProfile(data);
          profileFetchedRef.current = true;
        }
      }
    } catch (err) {
      console.error('fetchProfile exception:', err);
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (!mountedRef.current) return;
        setRecovery(isRecoverySession(session));
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        }
      })
      .catch((err) => {
        console.error('getSession error:', err);
      })
      .finally(() => {
        if (mountedRef.current) setLoading(false);
      });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mountedRef.current) return;
      const nextUser = session?.user ?? null;
      if (event === 'PASSWORD_RECOVERY') setRecovery(true);
      else if (event === 'SIGNED_OUT') setRecovery(false);
      setUser(nextUser);
      if (nextUser) {
        if (userIdRef.current !== nextUser.id) {
          profileFetchedRef.current = false;
        }
        fetchProfile(nextUser.id);
      } else {
        setProfile(null);
        profileFetchedRef.current = false;
        userIdRef.current = null;
        setLoading(false);
      }
    });

    return () => {
      mountedRef.current = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  useEffect(() => { fetchProfileRef.current = fetchProfile; }, [fetchProfile]);

  const refreshProfile = useCallback(() => {
    if (user) {
      profileFetchedRef.current = false;
      return fetchProfile(user.id, true);
    }
    return Promise.resolve();
  }, [user, fetchProfile]);

  // Auth methods close only over the stable supabase client, so they're stable
  // across renders — keeping the context value referentially stable and
  // preventing memoized consumers (Navbar) from re-rendering needlessly.
  // Errors are mapped to friendly messages before they reach the UI.
  const signUp = useCallback(async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) throw new Error(mapAuthError(error));
    return data;
  }, []);

  const signIn = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(mapAuthError(error));
    return data;
  }, []);

  const signInWithGoogle = useCallback(async () => {
    // Pre-flight check: /auth/v1/settings is a public endpoint listing enabled
    // OAuth providers. When Google is not configured on the Supabase project
    // the authorize URL just returns 400, so fail with a friendly error before
    // leaving the app instead of navigating to a dead page.
    try {
      const res = await fetch(`${supabaseUrl}/auth/v1/settings`, {
        headers: { apikey: supabaseAnonKey },
      });
      const settings = await res.json();
      if (settings?.external?.google === false) {
        const err = new Error('Google sign-in is not available yet. Please use email instead.');
        err.code = 'provider_disabled';
        throw err;
      }
    } catch (err) {
      if (err?.code === 'provider_disabled') throw err;
      // Settings fetch failed (offline etc.) — fail open and let OAuth try.
    }
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
        skipBrowserRedirect: true,
      },
    });
    if (error) throw new Error(mapAuthError(error));
    if (data?.url) {
      const popup = window.open(data.url, 'db_google_oauth', 'popup,width=500,height=650');
      if (!popup) window.location.href = data.url;
    }
    return data;
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(mapAuthError(error));
    profileFetchedRef.current = false;
    userIdRef.current = null;
  }, []);

  const resetPassword = useCallback(async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw new Error(mapAuthError(error));
  }, []);

  const updatePassword = useCallback(async (newPassword) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw new Error(mapAuthError(error));
  }, []);

  const value = useMemo(() => ({
    user,
    profile,
    loading,
    recovery,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    updatePassword,
    refreshProfile,
  }), [user, profile, loading, recovery, signUp, signIn, signInWithGoogle, signOut, resetPassword, updatePassword, refreshProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
