import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './page/login';
import Details from './page/details';
import PlanetsPage from './page/planets';
import FavoritesPage from './page/favorites';
import PrivateRoute from './components/Router/PrivateRoute';
import PublicRoute from './components/Router/PublicRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/planets" element={<PlanetsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/details/:planetId" element={<Details />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
