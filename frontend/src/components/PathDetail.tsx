import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PathService, CommentService } from '../api';
import LoadingSpinner from './common/LoadingSpinner';
import { handleAPIError } from '../utils/error';
import { AxiosError } from 'axios';

interface Path {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category: string;
  totalSteps: number;
}

interface Comment {
  id: string;
  content: string;
  rating: number;
  user: {
    name: string;
  };
}

export const PathDetail: React.FC = () => {
  const { pathId } = useParams<{ pathId: string }>();
  const [path, setPath] = useState<Path | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!pathId) return;  // Early return if pathId is undefined
      
      try {
        setLoading(true);
        const [pathData, commentsData] = await Promise.all([
          PathService.getPathById(pathId),
          CommentService.getPathComments(pathId)
        ]);
        setPath(pathData);
        setComments(commentsData);
      } catch (err) {
        if (err instanceof AxiosError) {
          const apiError = handleAPIError(err);
          setError(apiError.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pathId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;
  if (!path) return <div>Path not found</div>;

  return (
    <div className="path-detail">
      <h1>{path.title}</h1>
      <p className="description">{path.description}</p>
      <div className="meta">
        <span className="difficulty">{path.difficulty}</span>
        <span className="category">{path.category}</span>
        <span className="steps">Steps: {path.totalSteps}</span>
      </div>
      
      <section className="comments">
        <h2>Comments ({comments.length})</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="rating">Rating: {comment.rating}/5</div>
            <p>{comment.content}</p>
            <div className="user">- {comment.user.name}</div>
          </div>
        ))}
      </section>
    </div>
  );
}; 