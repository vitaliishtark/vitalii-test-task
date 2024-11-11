import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hookRedux.ts';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { updatePlanetName } from '../../store/slice/planets';

const DetailsPage = () => {
  const dispatch = useAppDispatch();

  const { planetId } = useParams();
  const [editedName, setEditedName] = useState('');
  const { planets } = useAppSelector((state) => state.planets);
  const planet = useMemo(() => {
    return planets?.find((p) => p.id === planetId);
  }, [planets, planetId]);

  if (!planet) {
    return <div>Planet not found</div>;
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(event.target.value);
  };

  const handleSave = () => {
    if (editedName !== planet.name) {
      dispatch(updatePlanetName({ oldName: planet.name, newName: editedName }));
    }
  };
  useEffect(() => {
    if (planet) {
      setEditedName(planet.name);
    }
  }, [planet]);
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      sx={{ padding: 2 }}
    >
      <Card sx={{ width: '100%' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Planet:{' '}
            <TextField
              value={editedName}
              onChange={handleNameChange}
              variant="outlined"
              size="small"
              sx={{ marginLeft: 1 }}
            />
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Population:
            <span style={{ color: 'darkblue', fontWeight: 'bold' }}>
              {planet.population ?? '-'} ml
            </span>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Terrain: {planet.terrain}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Orbital period: {planet.orbital_period}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Climate: {planet.climate}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Gravity: {planet.gravity}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ marginTop: 2 }}
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};
export default DetailsPage;
