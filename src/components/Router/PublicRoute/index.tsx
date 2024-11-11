import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/firebaseConfig.ts';
import Loading from '../../Loading';
import { Box } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const [user, loading] = useAuthState(auth);
  if (loading) return <Loading />;

  return !user ? (
    <Box display="flex" flexDirection="column" gap={3}>
      <Outlet />
    </Box>
  ) : (
    <Navigate to="/planets" />
  );
};

export default PublicRoute;
