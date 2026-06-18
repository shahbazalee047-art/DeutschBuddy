import { IconGraduation, IconMedal, IconFlag, IconCheck } from './Icons';

export default function Certificate({ level, userName, show, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm p-4">
      <div className="rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden scale-in" style={{ background: '#20202A' }}>
        <div className="bg-gradient-to-r from-lime-500 via-cyan-500 to-lime-400 p-8 text-center">
          <IconGraduation className="w-14 h-14 mx-auto mb-3 text-zinc-900" />
          <h2 className="text-2xl font-bold text-zinc-900">Zertifikat</h2>
          <p className="text-zinc-800/80 text-sm mt-1">Certificate of Completion</p>
        </div>

        <div className="p-8 text-center">
          <p className="text-zinc-500 text-sm mb-2">This certifies that</p>
          <h3 className="text-2xl font-bold text-zinc-100 mb-4">{userName || 'Learner'}</h3>
          <p className="text-zinc-500 text-sm mb-1">has successfully completed the</p>
          <h4 className="text-xl font-bold text-cyan-400 mb-4">
            DeutschBuddy {level} Course
          </h4>
          <p className="text-zinc-500 text-xs mb-6">
            {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="text-center">
              <IconMedal className="w-7 h-7 mx-auto text-lime-400" />
              <div className="text-xs text-zinc-500 mt-1">Certified</div>
            </div>
            <div className="w-px h-10 bg-zinc-700" />
            <div className="text-center">
              <IconFlag className="w-7 h-7 mx-auto text-lime-400" />
              <div className="text-xs text-zinc-500 mt-1">DeutschBuddy</div>
            </div>
            <div className="w-px h-10 bg-zinc-700" />
            <div className="text-center">
              <IconCheck className="w-7 h-7 mx-auto text-cyan-400" />
              <div className="text-xs text-zinc-500 mt-1">Verified</div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <button onClick={onClose} className="px-6 py-2.5 btn-primary text-sm active:scale-95">
              Continue Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}