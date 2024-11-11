import { useNavigate } from 'react-router-dom';
const routes = [
  '/',
  '/planets',
  '/favorites',
  '/details',
  '/details/:planetId',
] as const;

export type RouterType = (typeof routes)[number];

export const useRouter = () => {
  const navigate = useNavigate();
  const push = (path: RouterType, dinamicRoute?: string) => {
    navigate(`${path}${dinamicRoute ?? ''}`);
  };
  const back = () => {
    navigate(-1);
  };

  return {
    push,
    back,
  };
};
