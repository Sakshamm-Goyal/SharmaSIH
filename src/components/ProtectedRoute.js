import { Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

function ProtectedRoute({ element }) {
  const { currentUser } = useAuth(); // Adjust according to your auth context

  return currentUser ? element : <Navigate to="/404" />;
}

export default ProtectedRoute;
