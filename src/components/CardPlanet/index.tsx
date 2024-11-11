import { Box, Card, CardContent, Typography } from '@mui/material';
import { IResults } from '../../store/service/planet/interface.ts';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React from 'react';
import { useAppDispatch } from '../../hooks/hookRedux.ts';
import { changeFavorite } from '../../store/slice/planets';
import { useRouter } from '../../hooks/useRouter.ts';
interface Props {
  planet: IResults;
}

const CardPlanet = ({ planet }: Props) => {
  const navigate = useRouter();
  const dispatch = useAppDispatch();

  const {
    name,
    terrain,
    population,
    orbital_period,
    climate,
    gravity,
    favorite,
    id,
  } = planet;

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    navigate.push(`/details`, `/${id}`);
  };
  const toggleFavorite = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(changeFavorite({ name, favorite: !favorite }));
  };
  return (
    <Box
      width={{ xs: '100%', sm: '48%', md: '30%' }}
      sx={{ cursor: 'pointer', position: 'relative' }}
      onClick={(e) => handleCardClick(e)}
    >
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Planet: {name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Population:
            <span style={{ color: 'darkblue', fontWeight: 'bold' }}>
              {population ?? '-'} ml
            </span>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Terrain: {terrain}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Orbital period: {orbital_period}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Climate: {climate}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Gravity: {gravity}
          </Typography>
        </CardContent>
        <Box
          onClick={(e) => toggleFavorite(e)}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            cursor: 'pointer',
          }}
        >
          {favorite ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon color="error" />
          )}
        </Box>
      </Card>
    </Box>
  );
};
export default CardPlanet;
