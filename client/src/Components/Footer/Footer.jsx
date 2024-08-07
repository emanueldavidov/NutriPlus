import React from 'react';
import { Container, Grid, Typography, Link, Divider } from '@mui/material';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full text-white py-2 text-sm">
      <div className="text-center py-2">
        <div className="space-y-2">
          <p className="text-base">Created by:</p>
          <p>
            Emanuel Davidov -{' '}
            <a href="mailto:Davidova@example.com" className="text-white hover:text-red-600">Davidova@example.com</a>
          </p>
          <p>
            Jane Smith -{' '}
            <a href="mailto:jane.smith@example.com" className="text-white hover:text-red-600">jane.smith@example.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
