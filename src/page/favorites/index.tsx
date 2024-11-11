import { useAppSelector } from '../../hooks/hookRedux.ts';
import { Box, Container } from '@mui/material';
import CardPlanet from '../../components/CardPlanet';

const FavoritesPage = () => {
  const { favorites } = useAppSelector((state) => state.planets);
  if (!favorites.length) return <div>Not have favorites</div>;
  return (
    <Container maxWidth="lg">
      <Box display="flex" flexWrap="wrap" alignItems="center" gap={2}>
        {favorites?.map((planet, i) => <CardPlanet planet={planet} key={i} />)}
      </Box>
    </Container>
  );
};
export default FavoritesPage;
