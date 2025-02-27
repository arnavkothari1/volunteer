import { useNavigate, useParams, useLocation } from 'react-router-dom';

export function useRouter() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  return {
    push: (path: string) => navigate(path),
    query: params,
    pathname: location.pathname
  };
} 