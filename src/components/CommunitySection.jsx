import { useState } from 'react';

const samplePosts = [
  { id: 1, user: 'Maria K.', level: 'A2', avatar: 'M', title: 'Difference between "war" and "war gewesen"?', category: 'Grammar', content: 'I\'m confused about when to use Präteritum vs Perfekt in spoken German. Can someone explain the key differences?', upvotes: 24, comments: 8, time: '2h ago', solved: false },
  { id: 2, user: 'Tom L.', level: 'A1', avatar: 'T', title: 'Best way to memorize noun genders?', category: 'Vocabulary', content: 'I keep forgetting if it\'s der, die, or das. Any tips for remembering noun genders?', upvotes: 18, comments: 12, time: '5h ago', solved: true },
  { id: 3, user: 'Sophie M.', level: 'A2', avatar: 'S', title: 'Pronunciation of "ch" sound', category: 'Pronunciation', content: 'The "ch" in "ich" vs "Bach" is so confusing. Can someone explain the difference?', upvotes: 31, comments: 15, time: '1d ago', solved: false },
  { id: 4, user: 'Ahmed R.', level: 'A1', avatar: 'A', title: 'How to introduce yourself in German', category: 'General', content: 'I\'m just starting and want to know the basic phrases for introducing myself.', upvotes: 12, comments: 6, time: '3h ago', solved: true },
  { id: 5, user: 'Lisa W.', level: 'A2', avatar: 'L', title: 'German Christmas traditions explained', category: 'Culture', content: 'Can someone explain the Advent calendar tradition and why Germans put shoes outside on Dec 5th?', upvotes: 28, comments: 11, time: '6h ago', solved: false },
  { id: 6, user: 'James P.', level: 'A1', avatar: 'J', title: 'When to use "du" vs "Sie"?', category: 'Grammar', content: 'I understand the basic rule but when exactly should I switch from formal to informal?', upvotes: 35, comments: 20, time: '4h ago', solved: true },
  { id: 7, user: 'Yuki T.', level: 'A2', avatar: 'Y', title: 'Tips for German listening comprehension', category: 'Pronunciation', content: 'I can read German well but struggle with understanding spoken German. Any tips?', upvotes: 22, comments: 9, time: '12h ago', solved: false },
  { id: 8, user: 'Carlos M.', level: 'A1', avatar: 'C', title: 'Best resources for learning German numbers', category: 'Vocabulary', content: 'Numbers above 20 are tricky. How do you remember the German number system?', upvotes: 15, comments: 7, time: '8h ago', solved: true },
];

const categories = ['All', 'Grammar', 'Vocabulary', 'Pronunciation', 'Culture', 'General'];

export default function CommunitySection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [posts] = useState(samplePosts);

  const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory);

  return (
    <div className="fade-in space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>💬 Community</h2>
        <button className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg" style={{ background: 'linear-gradient(135deg, #B8860B, #D4A843)' }}>+</button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat ? 'text-white bg-[#B8860B] shadow-md shadow-[#B8860B]/20' : 'bg-[#1A2744] text-slate-400 border border-slate-700/50'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {filtered.map(post => (
        <div key={post.id} className="glass-card p-5 hover:shadow-lg transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #B8860B, #D4A843)' }}>{post.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-semibold text-slate-200">{post.user}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFF8E1] text-[#B8860B]">{post.level}</span>
              </div>
              <span className="text-[11px] text-slate-500">{post.time}</span>
            </div>
          </div>

          <div className="mb-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">{post.category}</span>
          </div>

          <h3 className="text-[14px] font-bold text-slate-200 mb-2">{post.title}</h3>
          <p className="text-[13px] text-slate-400 line-clamp-2">{post.content}</p>

          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-700/50">
            <button className="flex items-center gap-1 text-[12px] text-slate-400 hover:text-[#B8860B] transition">
              <span>▲</span><span>{post.upvotes}</span>
            </button>
            <button className="flex items-center gap-1 text-[12px] text-slate-400 hover:text-[#2D8B7A] transition">
              <span>💬</span><span>{post.comments}</span>
            </button>
            {post.solved && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#4CAF50]/10 text-[#4CAF50] border border-[#4CAF50]/20">✓ Solved</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
