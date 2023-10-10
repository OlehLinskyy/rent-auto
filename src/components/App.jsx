import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './header/Header';
import Catalog from 'pages/catalog/Catalog';
import Home from 'pages/home/Home';
import Fafotites from 'pages/favorites/Favorites';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/favorites" element={<Fafotites />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};
