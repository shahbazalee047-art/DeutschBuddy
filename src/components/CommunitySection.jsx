import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const samplePosts = [
  { id: 'sample-1', user: 'Maria K.', level: 'A2', avatar: 'M', title: 'Difference between "war" and "war gewesen"?', category: 'Grammar', content: 'I\'m confused about when to use Präteritum vs Perfekt in spoken German. Can someone explain the key differences?', upvotes: 24, comments: 8, time: '2h ago', solved: false },
  { id: 'sample-2', user: 'Tom L.', level: 'A1', avatar: 'T', title: 'Best way to memorize noun genders?', category: 'Vocabulary', content: 'I keep forgetting if it\'s der, die, or das. Any tips for remembering noun genders?', upvotes: 18, comments: 12, time: '5h ago', solved: true },
  { id: 'sample-3', user: 'Sophie M.', level: 'A2', avatar: 'S', title: 'Pronunciation of "ch" sound', category: 'Pronunciation', content: 'The "ch" in "ich" vs "Bach" is so confusing. Can someone explain the difference?', upvotes: 31, comments: 15, time: '1d ago', solved: false },
  { id: 'sample-4', user: 'Ahmed R.', level: 'A1', avatar: 'A', title: 'How to introduce yourself in German', category: 'General', content: 'I\'m just starting and want to know the basic phrases for introducing myself.', upvotes: 12, comments: 6, time: '3h ago', solved: true },
  { id: 'sample-5', user: 'Lisa W.', level: 'A2', avatar: 'L', title: 'German Christmas traditions explained', category: 'Culture', content: 'Can someone explain the Advent calendar tradition and why Germans put shoes outside on Dec 5th?', upvotes: 28, comments: 11, time: '6h ago', solved: false },
  { id: 'sample-6', user: 'James P.', level: 'A1', avatar: 'J', title: 'When to use "du" vs "Sie"?', category: 'Grammar', content: 'I understand the basic rule but when exactly should I switch from formal to informal?', upvotes: 35, comments: 20, time: '4h ago', solved: true },
  { id: 'sample-7', user: 'Yuki T.', level: 'A2', avatar: 'Y', title: 'Tips for German listening comprehension', category: 'Pronunciation', content: 'I can read German well but struggle with understanding spoken German. Any tips?', upvotes: 22, comments: 9, time: '12h ago', solved: false },
  { id: 'sample-8', user: 'Carlos M.', level: 'A1', avatar: 'C', title: 'Best resources for learning German numbers', category: 'Vocabulary', content: 'Numbers above 20 are tricky. How do you remember the German number system?', upvotes: 15, comments: 7, time: '8h ago', solved: true },
];

const categories = ['All', 'Grammar', 'Vocabulary', 'Pronunciation', 'Culture', 'General'];

function formatTime(dateStr) {
  if (!dateStr || dateStr.endsWith('ago')) return dateStr || 'Just now';
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

export default function CommunitySection({ user }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [upvotedIds, setUpvotedIds] = useState(new Set());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({ title: '', content: '', category: 'General' });
  const [submitting, setSubmitting] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select('*, profiles:user_id(full_name, email)')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setPosts(data.map(p => ({
          id: p.id,
          user: p.profiles?.full_name || p.profiles?.email?.split('@')[0] || 'Anonymous',
          level: p.level,
          avatar: (p.profiles?.full_name || p.profiles?.email || 'A').charAt(0).toUpperCase(),
          title: p.title,
          category: p.category,
          content: p.content,
          upvotes: p.upvotes || 0,
          comments: p.comment_count || 0,
          time: p.created_at,
          solved: p.solved,
          userId: p.user_id,
        })));
        setUsingFallback(false);
      } else {
        setPosts(samplePosts);
        setUsingFallback(true);
      }

      const { data: upvoted } = await supabase
        .from('community_upvotes')
        .select('post_id');
      if (upvoted) setUpvotedIds(new Set(upvoted.map(u => u.post_id)));

    } catch {
      setPosts(samplePosts);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const handleUpvote = async (postId) => {
    if (usingFallback || !user) return;
    const isUpvoted = upvotedIds.has(postId);

    setPosts(prev => prev.map(p => p.id === postId ? { ...p, upvotes: p.upvotes + (isUpvoted ? -1 : 1) } : p));
    setUpvotedIds(prev => {
      const next = new Set(prev);
      isUpvoted ? next.delete(postId) : next.add(postId);
      return next;
    });

    try {
      if (isUpvoted) {
        await supabase.from('community_upvotes').delete().match({ post_id: postId, user_id: user.id });
      } else {
        await supabase.from('community_upvotes').insert({ post_id: postId, user_id: user.id });
      }
    } catch {
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, upvotes: p.upvotes + (isUpvoted ? 1 : -1) } : p));
      setUpvotedIds(prev => {
        const next = new Set(prev);
        isUpvoted ? next.add(postId) : next.delete(postId);
        return next;
      });
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!user || !createForm.title.trim() || !createForm.content.trim()) return;
    setSubmitting(true);
    try {
      const { data, error } = await supabase.from('community_posts').insert({
        user_id: user.id,
        title: createForm.title.trim(),
        content: createForm.content.trim(),
        category: createForm.category,
        level: 'All',
      }).select('*, profiles:user_id(full_name, email)').single();

      if (error) throw error;
      if (data) {
        setPosts(prev => [{
          id: data.id,
          user: data.profiles?.full_name || user.email?.split('@')[0] || 'You',
          level: data.level,
          avatar: (data.profiles?.full_name || user.email || 'Y').charAt(0).toUpperCase(),
          title: data.title,
          category: data.category,
          content: data.content,
          upvotes: 0,
          comments: 0,
          time: data.created_at,
          solved: false,
          userId: data.user_id,
        }, ...prev]);
      }
      setShowCreateModal(false);
      setCreateForm({ title: '', content: '', category: 'General' });
    } catch {
      alert('Failed to create post. Make sure the community schema is set up in Supabase.');
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory);

  return (
    <div className="fade-in space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.5px' }}>💬 Community</h1>
          <p className="text-zinc-500 text-sm mt-1">Discuss, ask questions, and share tips</p>
          {usingFallback && <span className="text-[11px] text-amber-400">Showing sample posts (DB not connected)</span>}
        </div>
        <button onClick={() => setShowCreateModal(true)}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-900 text-lg transition-all hover:scale-110 active:scale-95" style={{ background: 'linear-gradient(135deg, #A3E635, #06B6D4)' }}>+</button>
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowCreateModal(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-lg rounded-2xl p-6 shadow-2xl scale-in" onClick={e => e.stopPropagation()} style={{ background: '#1E1E24', border: '1px solid rgba(63, 63, 70, 0.5)' }}>
            <h2 className="text-lg font-bold text-zinc-100 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Create Post</h2>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <input placeholder="Title" value={createForm.title} onChange={e => setCreateForm(p => ({ ...p, title: e.target.value }))}
                className="w-full h-12 px-4 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm focus:outline-none focus:border-lime-500/50" required />
              <textarea placeholder="What's on your mind?" value={createForm.content} onChange={e => setCreateForm(p => ({ ...p, content: e.target.value }))}
                className="w-full h-32 px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm focus:outline-none focus:border-lime-500/50 resize-none" required />
              <div className="flex gap-2">
                {categories.filter(c => c !== 'All').map(cat => (
                  <button key={cat} type="button" onClick={() => setCreateForm(p => ({ ...p, category: cat }))}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
                      createForm.category === cat ? 'bg-lime-500 text-zinc-900' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                    }`}>{cat}</button>
                ))}
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowCreateModal(false)} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-zinc-400 hover:text-zinc-200 transition">Cancel</button>
                <button type="submit" disabled={submitting}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-zinc-900 transition-all active:scale-95 disabled:opacity-50" style={{ background: 'linear-gradient(135deg, #A3E635, #06B6D4)' }}>
                  {submitting ? 'Posting...' : 'Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all active:scale-95 ${
              activeCategory === cat ? 'text-zinc-900 bg-lime-500 shadow-md shadow-lime-500/20' : 'bg-zinc-800 text-zinc-400 border border-zinc-700/50 hover:text-zinc-200'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Posts List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full skeleton" />
                <div className="flex-1"><div className="h-4 w-32 skeleton mb-1" /><div className="h-3 w-20 skeleton" /></div>
              </div>
              <div className="h-5 w-3/4 skeleton mb-2" />
              <div className="h-4 w-full skeleton mb-1" />
              <div className="h-4 w-2/3 skeleton" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card p-8 text-center">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-zinc-400 font-medium">No posts in this category yet</p>
          <p className="text-zinc-600 text-sm mt-1">Be the first to start a discussion!</p>
        </div>
      ) : (
        filtered.map(post => (
          <div key={post.id} className="glass-card p-5 hover:shadow-lg transition-all hover:border-lime-500/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-zinc-900" style={{ background: 'linear-gradient(135deg, #A3E635, #06B6D4)' }}>{post.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold text-zinc-200 truncate">{post.user}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-lime-400 border border-lime-500/20" style={{ background: 'rgba(163, 230, 53, 0.1)' }}>{post.level}</span>
                </div>
                <span className="text-[11px] text-zinc-600">{formatTime(post.time)}</span>
              </div>
            </div>

            <div className="mb-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-500/20" style={{ background: 'rgba(6, 182, 212, 0.1)', color: '#06B6D4' }}>{post.category}</span>
            </div>

            <h3 className="text-[14px] font-bold text-zinc-200 mb-2">{post.title}</h3>
            <p className="text-[13px] text-zinc-400 line-clamp-2">{post.content}</p>

            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-zinc-700/50">
              <button onClick={() => handleUpvote(post.id)}
                className={`flex items-center gap-1 text-[12px] transition active:scale-90 ${
                  upvotedIds.has(post.id) ? 'text-lime-400' : 'text-zinc-500 hover:text-lime-400'
                }`}>
                <span>▲</span><span>{post.upvotes}</span>
              </button>
              <button className="flex items-center gap-1 text-[12px] text-zinc-500 hover:text-cyan-400 transition active:scale-90">
                <span>💬</span><span>{post.comments}</span>
              </button>
              {post.solved && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-lime-400 border border-lime-500/20" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>✓ Solved</span>}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
