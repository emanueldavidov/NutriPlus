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
                Emanuel, Raz, Yossi, Shai, Itay
              </Typography>
              <Typography variant="body2">
                NutriPlus Team - <Link href="mailto:@example.com" color="inherit">Support@NutriPlus.com</Link>
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
