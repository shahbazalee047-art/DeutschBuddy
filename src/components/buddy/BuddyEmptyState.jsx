import { memo } from 'react';
import BuddyAvatar from './BuddyAvatar';
import BuddySpeechBubble from './BuddySpeechBubble';

const BuddyEmptyState = memo(function BuddyEmptyState({
  title = 'Nothing here yet',
  message = 'Start your first lesson with Buddy.',
  actionLabel = 'Start Learning',
  onAction,
  buddyState = 'idle'
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-16 min-h-[50vh]">
      <div className="relative mb-4">
        <BuddyAvatar state={buddyState} size={120} />
        <div className="absolute -top-2 -right-4">
          <BuddySpeechBubble position="right" tone="encourage">
            {title}
          </BuddySpeechBubble>
        </div>
      </div>
      <h3 className="text-xl font-bold text-text-dark mb-2">{title}</h3>
      <p className="text-text-muted max-w-xs mb-6">{message}</p>
      {onAction && (
        <button onClick={onAction} className="db-btn db-btn-primary">
          {actionLabel}
        </button>
      )}
    </div>
  );
});

export default BuddyEmptyState;
