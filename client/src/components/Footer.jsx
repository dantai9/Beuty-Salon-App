import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer glass-panel">
    <div className="footer-brand">
      <h3>GlowUp</h3>
      <p>Elevating beauty experiences with effortless online bookings.</p>
    </div>
    <div className="footer-links">
      <a href="mailto:hello@glowup.com">Contact</a>
      <a href="https://instagram.com" target="_blank" rel="noreferrer">
        Instagram
      </a>
      <a href="https://www.behance.net" target="_blank" rel="noreferrer">
        Behance
      </a>
    </div>
    <p className="footer-copy">© {new Date().getFullYear()} GlowUp. All rights reserved.</p>
  </footer>
);

export default Footer;
