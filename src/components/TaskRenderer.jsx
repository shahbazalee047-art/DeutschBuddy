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
    default: return <div className="text-center py-12"><p className="text-cream-400 mb-4">Content coming soon!</p><button onClick={onComplete} className="btn-primary px-6">Mark Complete</button></div>;
  }
}
