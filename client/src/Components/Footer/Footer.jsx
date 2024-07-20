import React from 'react';
import { Container, Grid, Typography, Link, Divider } from '@mui/material';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="sticky-footer">
      <Container>
        <div className="footer-content">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">Created by:</Typography>
              <Typography variant="body2">
                Emanuel Davidov - <Link href="mailto:Davidova@example.com" color="inherit">Davidova@example.com</Link>
              </Typography>
              <Typography variant="body2">
                Jane Smith - <Link href="mailto:jane.smith@example.com" color="inherit">jane.smith@example.com</Link>
              </Typography>
            </Grid>
          </Grid>
        </div>
        <Divider />
      </Container>
    </footer>
  );
}

export default Footer;
