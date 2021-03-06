import React, { useContext } from 'react';
import {
  BrowserRouter,
  Routes as RouteSwitch,
  Route,
  useLocation,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Commands from './pages/commands';
import Embeds from './pages/Embeds';
import Home from './pages/home';

export default function Routes() {
  return (
    <RouteSwitch>
      <Route path="/" element={<Home />} />
      <Route path="/commands" element={<Commands />} />
      <Route path="/embeds" element={<Embeds />} />
      <Route path="/" element={<Home />} />
      <Route path="/" element={<Home />} />
    </RouteSwitch>
  );
}
