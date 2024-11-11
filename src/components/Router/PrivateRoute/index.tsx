import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/firebaseConfig.ts';
import Loading from '../../Loading';
import Header from '../../Header';
import { Box } from '@mui/material';

const PrivateRoute = () => {
  const [user, loading] = useAuthState(auth);
  if (loading) return <Loading />;

  return user ? (
    <Box display="flex" flexDirection="column" gap={3}>
      <Header />
      <Outlet />
    </Box>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
