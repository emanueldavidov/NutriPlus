import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Link from '@mui/material/Link'; // Import Link component from MUI
import { Link as RouterLink } from 'react-router-dom'; // Import RouterLink from react-router-dom

function Media(props) {
  const { loading = false, data } = props;

  return (
    <Grid container spacing={2}> {/* Added spacing={2} for grid spacing */}
      {(loading ? Array.from(new Array(3)) : data).map((item, index) => (
        <Grid item key={index} xs={6} sx={{ display: "flex", justifyContent: "center" }}>
          <Card
            sx={{
              width: '250px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease-in-out', // Add transition for hover effect
              '&:hover': {
                transform: 'scale(1.05)', // Scale card on hover
              },
            }}
          >
            {item ? (
              <Link
                component={RouterLink} // Use RouterLink from react-router-dom
                to={item.link} // Navigate to item.link
                color="primary"
                underline="hover"
                sx={{ textDecoration: 'none' }} // Ensure no underline on hover
              >
                <CardMedia
                  component="img"
                  alt={item.title}
                  src={item.src}
                  sx={{
                    width: '100%',
                    height: 150,
                    objectFit: 'cover',
                    borderRadius: '8px',
                    transition: 'transform 0.3s ease-in-out', // Add transition for hover effect
                    '&:hover': {
                      transform: 'scale(1.05)', // Scale image on hover
                    },
                  }}
                />
              </Link>
            ) : (
              <Skeleton variant="rectangular" width={'100%'} height={150} sx={{ borderRadius: '8px' }} />
            )}
            <CardContent>
              <Typography sx={{ fontWeight: 'bold' }}>
                {item ? item.title : <Skeleton variant="text" width={'80%'} />}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired, // Ensure link is required in data shape
    })
  ),
};

function CustomMedia({ data }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 800 }}>
        <Media loading={data ? false : true} data={data || []} />
      </Box>
    </Box>
  );
}

CustomMedia.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ),
};

export default CustomMedia;
