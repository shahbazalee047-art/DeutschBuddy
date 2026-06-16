import Flashcards from './Flashcards';
import Quiz from './Quiz';
import FillBlank from './FillBlank';
import Matching from './Matching';
import Scramble from './Scramble';
import Speaking from './Speaking';
import Writing from './Writing';
import Review from './Review';
import Roleplay from './Roleplay';
import Grammar from './Grammar';
import Vocabulary from './Vocabulary';
import Fun from './Fun';
import ListeningTask from './ListeningTask';
import QuickWin from './QuickWin';

export default function TaskRenderer({ task, onComplete }) {
  const props = { content: task.content, onComplete };

  switch (task.type) {
    case 'vocabulary': return <Vocabulary {...props} />;
    case 'grammar': return <Grammar {...props} />;
    case 'quiz': return <Quiz {...props} />;
    case 'flashcards': return <Flashcards {...props} />;
    case 'matching': return <Matching {...props} />;
    case 'fillblank': return <FillBlank {...props} />;
    case 'scramble': return <Scramble {...props} />;
    case 'speaking': return <Speaking {...props} />;
    case 'writing': return <Writing {...props} />;
    case 'review': return <Review {...props} />;
    case 'roleplay': return <Roleplay {...props} />;
    case 'fun': return <Fun {...props} />;
    case 'listening': return <ListeningTask {...props} />;
    case 'quickwin': return <QuickWin onComplete={onComplete} />;
    default:
      return (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🚧</div>
          <p className="text-slate-500">Content coming soon!</p>
          <button onClick={onComplete} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-500 transition shadow-lg shadow-blue-500/20">
            Skip & Complete
          </button>
        </div>
      );
  }
}
