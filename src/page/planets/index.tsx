import { useGetPlanetsQuery } from '../../store/service/planet';
import './styles.scss';
import {Autocomplete, Box, Container, TextField} from '@mui/material';
import CardPlanet from '../../components/CardPlanet';
import { useAppSelector } from '../../hooks/hookRedux.ts';
import Loading from '../../components/Loading';
import { useState} from "react";
import {IResults} from "../../store/service/planet/interface.ts";

const PlanetsPage = () => {
    const [search,setSearch]=useState('');
    const { isLoading, error } = useGetPlanetsQuery();
  const { planets } = useAppSelector((state) => state.planets);
  if (isLoading) return <Loading />;
  if (error) return <div>Error occurred while fetching data!</div>;
    const filterPlanetsBySearch = (planets: IResults[]) => {
        return planets.filter((planet) => planet.name.toLowerCase().includes(search.toLowerCase()));
    };
    const filteredPlanets = filterPlanetsBySearch(planets);
  return (
    <Container maxWidth="lg">
        <Box mb={2}>
            <Autocomplete
                inputValue={search}
                onInputChange={(_,newInputValue) => {
                    setSearch(newInputValue);
                }}
                options={planets.map((planet) => planet.name)}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Controllable" />}
            />
        </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        gap={2}
      >
        {filteredPlanets.map((planet, i) => <CardPlanet planet={planet} key={i} />)}
      </Box>
    </Container>
  );
};
export default PlanetsPage;
