import React, { useState } from 'react';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: string;
  replies: Comment[];
}

interface DiscussionProps {
  pathId: string;
  stepId: string;
}

export const Discussion: React.FC<DiscussionProps> = ({ pathId, stepId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = async () => {
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pathId, stepId, content: newComment }),
    });

    if (response.ok) {
      const comment = await response.json();
      setComments(prevComments => [...prevComments, comment]);
      setNewComment('');
    }
  };

  return (
    <div className="discussion-section">
      <h3>Discussion</h3>
      <div className="comment-input">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts or ask a question..."
        />
        <button onClick={handleSubmitComment}>Post</button>
      </div>
      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <span>{comment.userName}</span>
              <span>{new Date(comment.timestamp).toLocaleDateString()}</span>
            </div>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}; 