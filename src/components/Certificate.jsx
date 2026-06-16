export default function Certificate({ level, userName, show, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden scale-in">
        <div className="bg-gradient-to-r from-[#2c3e6b] via-[#4a6fa5] to-[#d4a843] p-8 text-center text-white">
          <div className="text-6xl mb-3">🎓</div>
          <h2 className="text-2xl font-bold">Zertifikat</h2>
          <p className="text-white/80 text-sm mt-1">Certificate of Completion</p>
        </div>

        <div className="p-8 text-center">
          <p className="text-gray-500 text-sm mb-2">This certifies that</p>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">{userName || 'Learner'}</h3>
          <p className="text-gray-500 text-sm mb-1">has successfully completed the</p>
          <h4 className="text-xl font-bold text-[#2c3e6b] mb-4">
            DeutschBuddy {level} Course
          </h4>
          <p className="text-gray-400 text-xs mb-6">
            {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#d4a843]">🏅</div>
              <div className="text-xs text-gray-500 mt-1">Certified</div>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-center">
              <div className="text-2xl font-bold text-[#d4a843]">🇩🇪</div>
              <div className="text-xs text-gray-500 mt-1">DeutschBuddy</div>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-center">
              <div className="text-2xl font-bold text-[#d4a843]">✓</div>
              <div className="text-xs text-gray-500 mt-1">Verified</div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={onClose}
              className="px-6 py-2.5 btn-primary text-sm"
            >
              Continue Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
