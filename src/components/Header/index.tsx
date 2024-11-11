import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { useRouter } from '../../hooks/useRouter.ts';

const Header = () => {
  const navigate = useRouter();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate.push('/');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <AppBar position="relative">
      <Toolbar>
        <Button color="inherit" onClick={() => navigate.back()}>
          Back
        </Button>{' '}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Planet Explorer
        </Typography>
        <Button color="inherit" onClick={() => navigate.push('/planets')}>
          Planets
        </Button>
        <Button color="inherit" onClick={() => navigate.push('/favorites')}>
          Favorites
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Sign out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
