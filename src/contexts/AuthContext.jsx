import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);
  const profileFetchedRef = useRef(false);
  const userIdRef = useRef(null);

  const fetchProfile = useCallback(async (userId, forceRefresh = false) => {
    if (!userId) return;
    if (profileFetchedRef.current && !forceRefresh && userIdRef.current === userId) return;

    userIdRef.current = userId;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('fetchProfile error:', error);
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
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (!mountedRef.current) return;
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('getSession error:', err);
        if (mountedRef.current) setLoading(false);
      });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mountedRef.current) return;
      const nextUser = session?.user ?? null;
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

  const refreshProfile = useCallback(() => {
    if (user) {
      profileFetchedRef.current = false;
      return fetchProfile(user.id, true);
    }
    return Promise.resolve();
  }, [user, fetchProfile]);

  async function signUp(email, password, fullName) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) throw error;
    return data;
  }

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    profileFetchedRef.current = false;
    userIdRef.current = null;
  }

  async function resetPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  }

  async function updatePassword(newPassword) {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  }

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
