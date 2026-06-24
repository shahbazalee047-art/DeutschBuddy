import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import {
  IconSearch, IconMessageCircle, IconArrowUp, IconCheck, IconPlus,
  IconX
} from './Icons';

const samplePosts = [
  { id: 'sample-1', user: 'Maria K.', level: 'A2', avatar: 'M', title: 'Difference between "war" and "war gewesen"?', category: 'Grammar', content: 'I\'m confused about when to use Präteritum vs Perfekt in spoken German. Can someone explain the key differences?', upvotes: 24, comments: 8, time: '2h ago', solved: false, userId: null },
  { id: 'sample-2', user: 'Tom L.', level: 'A1', avatar: 'T', title: 'Best way to memorize noun genders?', category: 'Vocabulary', content: 'I keep forgetting if it\'s der, die, or das. Any tips for remembering noun genders?', upvotes: 18, comments: 12, time: '5h ago', solved: true, userId: null },
  { id: 'sample-3', user: 'Sophie M.', level: 'A2', avatar: 'S', title: 'Pronunciation of "ch" sound', category: 'Pronunciation', content: 'The "ch" in "ich" vs "Bach" is so confusing. Can someone explain the difference?', upvotes: 31, comments: 15, time: '1d ago', solved: false, userId: null },
  { id: 'sample-4', user: 'Ahmed R.', level: 'A1', avatar: 'A', title: 'How to introduce yourself in German', category: 'General', content: 'I\'m just starting and want to know the basic phrases for introducing myself.', upvotes: 12, comments: 6, time: '3h ago', solved: true, userId: null },
];

const categories = ['All', 'Grammar', 'Vocabulary', 'Pronunciation', 'Culture', 'General'];

function formatTime(dateStr) {
  if (!dateStr || String(dateStr).endsWith('ago')) return dateStr || 'Just now';
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
  const [activePost, setActivePost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  const mapPost = useCallback((p) => ({
    id: p.id,
    user: p.profiles?.full_name || 'Anonymous',
    level: p.level,
    avatar: (p.profiles?.full_name || 'A').charAt(0).toUpperCase(),
    title: p.title,
    category: p.category,
    content: p.content,
    upvotes: p.upvotes || 0,
    comments: p.comment_count || 0,
    time: p.created_at,
    solved: p.solved,
    userId: p.user_id,
    raw: p,
  }), []);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select('*, profiles:user_id(id, full_name, avatar_url)')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setPosts(data.map(mapPost));
        setUsingFallback(false);
      } else {
        setPosts(samplePosts);
        setUsingFallback(true);
      }

      if (user) {
        const { data: upvoted } = await supabase
          .from('community_upvotes')
          .select('post_id')
          .eq('user_id', user.id);
        if (upvoted) setUpvotedIds(new Set(upvoted.map(u => u.post_id)));
      }
    } catch {
      setPosts(samplePosts);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  }, [user, mapPost]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const fetchComments = useCallback(async (postId) => {
    if (usingFallback || !postId) return;
    setCommentLoading(true);
    try {
      const { data, error } = await supabase
        .from('community_comments')
        .select('*, profiles:user_id(id, full_name, avatar_url)')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments(data.map(c => ({
        id: c.id,
        user: c.profiles?.full_name || 'Anonymous',
        avatar: (c.profiles?.full_name || 'A').charAt(0).toUpperCase(),
        content: c.content,
        time: c.created_at,
        userId: c.user_id,
      })));
    } catch {
      setComments([]);
    } finally {
      setCommentLoading(false);
    }
  }, [usingFallback]);

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
        await supabase.from('community_upvotes').delete().eq('post_id', postId).eq('user_id', user.id);
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
      }).select('*, profiles:user_id(id, full_name, avatar_url)').single();

      if (error) throw error;
      if (data) {
        setPosts(prev => [mapPost(data), ...prev]);
      }
      setShowCreateModal(false);
      setCreateForm({ title: '', content: '', category: 'General' });
    } catch {
      alert('Failed to create post. Make sure the community schema is set up in Supabase.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateComment = async (e) => {
    e.preventDefault();
    if (!user || !activePost || !commentText.trim()) return;
    setCommentSubmitting(true);
    try {
      const { data, error } = await supabase.from('community_comments').insert({
        user_id: user.id,
        post_id: activePost.id,
        content: commentText.trim(),
      }).select('*, profiles:user_id(id, full_name, avatar_url)').single();

      if (error) throw error;
      if (data) {
        setComments(prev => [...prev, {
          id: data.id,
          user: data.profiles?.full_name || user.full_name || 'You',
          avatar: (data.profiles?.full_name || user.full_name || 'Y').charAt(0).toUpperCase(),
          content: data.content,
          time: data.created_at,
          userId: data.user_id,
        }]);
        setPosts(prev => prev.map(p => p.id === activePost.id ? { ...p, comments: p.comments + 1 } : p));
      }
      setCommentText('');
    } catch {
      alert('Failed to add comment. Please try again.');
    } finally {
      setCommentSubmitting(false);
    }
  };

  const openPost = (post) => {
    if (usingFallback) return;
    setActivePost(post);
    fetchComments(post.id);
  };

  const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory);

  return (
    <div className="fade-in space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="eyebrow">Community</span>
          <h1 className="text-3xl font-bold text-text-dark editorial-heading" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '-0.5px' }}>Discuss & <i>Share</i></h1>
          <p className="text-text-muted text-sm mt-1">Discuss, ask questions, and share tips</p>
          {usingFallback && <span className="text-[11px] text-gold-light">Showing sample posts (DB not connected)</span>}
        </div>
        <button onClick={() => setShowCreateModal(true)}
          className="w-10 h-10 flex items-center justify-center text-text-on-dark bg-gold transition-all hover:scale-110 active:scale-95"><IconPlus className="w-5 h-5" /></button>
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowCreateModal(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-[calc(100vw-32px)] sm:max-w-lg p-6 shadow-2xl scale-in bg-bg-white border border-border" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-text-dark mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Create Post</h2>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <input placeholder="Title" value={createForm.title} onChange={e => setCreateForm(p => ({ ...p, title: e.target.value }))}
                className="w-full h-12 px-4 bg-bg-white border border-border text-text-body text-sm focus:outline-none focus:border-gold" required />
              <textarea placeholder="What's on your mind?" value={createForm.content} onChange={e => setCreateForm(p => ({ ...p, content: e.target.value }))}
                className="w-full h-32 px-4 py-3 bg-bg-white border border-border text-text-body text-sm focus:outline-none focus:border-gold resize-none" required />
              <div className="flex gap-2 flex-wrap">
                {categories.filter(c => c !== 'All').map(cat => (
                  <button key={cat} type="button" onClick={() => setCreateForm(p => ({ ...p, category: cat }))}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
                      createForm.category === cat ? 'bg-gold text-text-on-dark' : 'bg-bg-secondary text-text-muted border border-border'
                    }`}>{cat}</button>
                ))}
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" disabled={submitting}
                  className="btn-primary disabled:opacity-50">
                  {submitting ? 'Posting...' : 'Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Post Detail Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setActivePost(null)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-[calc(100vw-32px)] sm:max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl scale-in bg-bg-white border border-border" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-text-on-dark" style={{ background: 'var(--gold)' }}></div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-text-body">{activePost.user}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-gold border border-gold/20 bg-gold/10">{activePost.level}</span>
                  </div>
                  <span className="text-[11px] text-text-muted">{formatTime(activePost.time)}</span>
                </div>
              </div>
              <button onClick={() => setActivePost(null)} className="p-2 hover:bg-bg-secondary text-text-muted transition"><IconX className="w-5 h-5" /></button>
            </div>

            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-gold/20 text-gold bg-gold/10">{activePost.category}</span>
            <h2 className="text-lg font-bold text-text-dark mt-3 mb-2">{activePost.title}</h2>
            <p className="text-[13px] text-text-muted whitespace-pre-wrap">{activePost.content}</p>

            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/50">
              <button onClick={() => handleUpvote(activePost.id)}
                className={`flex items-center gap-1 text-[12px] transition active:scale-90 ${
                  upvotedIds.has(activePost.id) ? 'text-gold' : 'text-text-muted hover:text-gold'
                }`}>
                <IconArrowUp className="w-4 h-4 text-current" /><span>{activePost.upvotes}</span>
              </button>
              <span className="flex items-center gap-1 text-[12px] text-text-muted">
                <IconMessageCircle className="w-3.5 h-3.5" /><span>{activePost.comments}</span>
              </span>
              {activePost.solved && <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full text-gold border border-gold/20 bg-gold/10"><IconCheck className="w-2.5 h-2.5" /> Solved</span>}
            </div>

            {/* Comments */}
            <div className="mt-6 pt-4 border-t border-border/50">
              <h3 className="text-sm font-bold text-text-body mb-3">Comments</h3>
              {commentLoading ? (
                <div className="space-y-3">
                  {[1, 2].map(i => (
                    <div key={i} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full skeleton" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-24 skeleton" />
                        <div className="h-3 w-full skeleton" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : comments.length === 0 ? (
                <p className="text-sm text-text-muted">No comments yet. Be the first to respond!</p>
              ) : (
                <div className="space-y-4">
                  {comments.map(comment => (
                    <div key={comment.id} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-text-on-dark shrink-0" style={{ background: 'var(--gold)' }}>{comment.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[12px] font-semibold text-text-body">{comment.user}</span>
                          <span className="text-[10px] text-text-muted">{formatTime(comment.time)}</span>
                        </div>
                        <p className="text-[13px] text-text-muted mt-0.5 whitespace-pre-wrap">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {user ? (
                <form onSubmit={handleCreateComment} className="mt-4 flex gap-2">
                  <input
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 h-11 px-4 bg-bg-white border border-border text-text-body text-sm focus:outline-none focus:border-gold"
                    required
                  />
                  <button type="submit" disabled={commentSubmitting}
                    className="btn-primary h-11 px-4 disabled:opacity-50">
                    {commentSubmitting ? '...' : 'Reply'}
                  </button>
                </form>
              ) : (
                <p className="text-sm text-text-muted mt-4">Sign in to leave a comment.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="w-full max-w-full overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        <div className="flex gap-2 w-max">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all active:scale-95 ${
                activeCategory === cat ? 'text-text-on-dark bg-gold shadow-md shadow-gold/20' : 'bg-bg-secondary text-text-muted border border-border hover:text-text-body'
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="paper-card p-5">
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
        <div className="paper-card p-8 text-center">
          <IconSearch className="w-12 h-12 mx-auto mb-3 text-text-muted" />
          <p className="text-text-muted font-medium">No posts in this category yet</p>
          <p className="text-text-muted text-sm mt-1">Be the first to start a discussion!</p>
        </div>
      ) : (
        filtered.map(post => (
          <div key={post.id} className="paper-card p-5 hover:shadow-lg transition-all hover:border-gold/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-text-on-dark" style={{ background: 'var(--gold)' }}>{post.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold text-text-body truncate">{post.user}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-gold border border-gold/20 bg-gold/10">{post.level}</span>
                </div>
                <span className="text-[11px] text-text-muted">{formatTime(post.time)}</span>
              </div>
            </div>

            <div className="mb-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-gold/20 text-gold bg-gold/10">{post.category}</span>
            </div>

            <h3 className="text-[14px] font-bold text-text-body mb-2 cursor-pointer hover:text-gold transition" onClick={() => openPost(post)}>{post.title}</h3>
            <p className="text-[13px] text-text-muted line-clamp-2 cursor-pointer" onClick={() => openPost(post)}>{post.content}</p>

            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/50">
              <button onClick={() => handleUpvote(post.id)}
                className={`flex items-center gap-1 text-[12px] transition active:scale-90 ${
                  upvotedIds.has(post.id) ? 'text-gold' : 'text-text-muted hover:text-gold'
                }`}>
                <IconArrowUp className="w-4 h-4 text-current" /><span>{post.upvotes}</span>
              </button>
              <button onClick={() => openPost(post)} className="flex items-center gap-1 text-[12px] text-text-muted hover:text-gold transition active:scale-90">
                <IconMessageCircle className="w-3.5 h-3.5" /><span>{post.comments}</span>
              </button>
              {post.solved && <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full text-gold border border-gold/20 bg-gold/10"><IconCheck className="w-2.5 h-2.5" /> Solved</span>}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
