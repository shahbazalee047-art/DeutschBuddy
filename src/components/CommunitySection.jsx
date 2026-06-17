import { useState } from 'react';

const samplePosts = [
  { id: 1, user: 'Maria K.', level: 'A2', avatar: 'M', title: 'Difference between "war" and "war gewesen"?', category: 'Grammar', content: 'I\'m confused about when to use Präteritum vs Perfekt in spoken German...', upvotes: 24, comments: 8, time: '2h ago', solved: false },
  { id: 2, user: 'Tom L.', level: 'A1', avatar: 'T', title: 'Best way to memorize noun genders?', category: 'Vocabulary', content: 'I keep forgetting if it\'s der, die, or das. Any tips?', upvotes: 18, comments: 12, time: '5h ago', solved: true },
  { id: 3, user: 'Sophie M.', level: 'A2', avatar: 'S', title: 'Pronunciation of "ch" sound', category: 'Pronunciation', content: 'The "ch" in "ich" vs "Bach" is so confusing. Can someone explain?', upvotes: 31, comments: 15, time: '1d ago', solved: false },
];

const categories = ['All', 'Grammar', 'Vocabulary', 'Pronunciation', 'Culture', 'General'];

export default function CommunitySection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [posts] = useState(samplePosts);

  const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory);

  return (
    <div className="fade-in space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>💬 Community</h2>
        <button className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg" style={{ background: 'linear-gradient(135deg, #B8860B, #D4A843)' }}>+</button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat ? 'text-white' : 'bg-[#F5F5F5] text-[#8A8A9A] border border-[#E8E0D4]'
            }`}
            style={activeCategory === cat ? { background: 'linear-gradient(135deg, #B8860B, #D4A843)' } : {}}>
            {cat}
          </button>
        ))}
      </div>

      {filtered.map(post => (
        <div key={post.id} className="paper-card p-4 hover:shadow-lg transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #B8860B, #D4A843)' }}>{post.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-semibold text-[#1A1A2E]">{post.user}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#FFF8E1', color: '#B8860B' }}>{post.level}</span>
              </div>
              <span className="text-[11px] text-[#8A8A9A]">{post.time}</span>
            </div>
          </div>

          <div className="mb-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E3F2FD] text-[#2196F3]">{post.category}</span>
          </div>

          <h3 className="text-[14px] font-bold text-[#1A1A2E] mb-2">{post.title}</h3>
          <p className="text-[13px] text-[#8A8A9A] line-clamp-2">{post.content}</p>

          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#E8E0D4]">
            <button className="flex items-center gap-1 text-[12px] text-[#8A8A9A] hover:text-[#B8860B] transition">
              <span>▲</span><span>{post.upvotes}</span>
            </button>
            <button className="flex items-center gap-1 text-[12px] text-[#8A8A9A] hover:text-[#2D8B7A] transition">
              <span>💬</span><span>{post.comments}</span>
            </button>
            {post.solved && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#E8F5E9', color: '#4CAF50' }}>✓ Solved</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
