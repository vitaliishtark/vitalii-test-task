import { Button } from '@mui/material';
import './styles.scss';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    const handleGoogle = async () => {
    const provider = await new GoogleAuthProvider();
    return signInWithPopup(auth, provider).then(()=>navigate('/planets')).catch((error)=>{
        console.log(error)})
  };
  return (
    <div className="container">
      <div className="content">
        <Button
          variant="contained"
          onClick={handleGoogle}
          sx={{
            backgroundColor: 'yellow',
            color: 'black',
            '&:hover': { backgroundColor: 'gold' },
          }}
        >
          Google
        </Button>
      </div>
    </div>
  );
};
export default LoginPage;
