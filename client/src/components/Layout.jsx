import React from 'react';
import Navigation from './Navigation.jsx';
import Footer from './Footer.jsx';
import './Layout.css';

const Layout = ({ children }) => (
  <div className="app-shell">
    <Navigation />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
