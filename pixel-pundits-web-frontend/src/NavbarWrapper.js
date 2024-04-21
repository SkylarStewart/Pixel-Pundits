import React from 'react';
import { useLocation } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar';

export default function NavbarWrapper() {
  const location = useLocation();
  const showNav = !['/login', '/signup'].includes(location.pathname);

  return showNav ? <NavigationBar /> : null;
}