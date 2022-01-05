import React, { useContext } from 'react';
import {
  Grid, Typography, Button, Container,
} from '@mui/material';
import Nav from '../components/Nav';
import { ProjectsContext } from '../context/ProjectsContext';

function FundingSuccess() {
  useContext(ProjectsContext);

  return (
    <>
      <Nav />
      <Container component="main" maxWidth="sm" sx={{ mb: 4, mt: 13 }}>
        <Grid container sx={{ flexDirection: 'column' }}>
          <Typography variant="h1" component="h1" align="center" gutterBottom>Success!</Typography>
          <Typography variant="h6" component="h2" align="center" gutterBottom>Thanks for your contribution</Typography>
          <Button
            variant="contained"
            href="/"
            sx={{
              width: 200, m: 6, color: 'white', alignSelf: 'center',
            }}
          >
            Explore more projects
          </Button>
        </Grid>
      </Container>
    </>
  );
}

export default FundingSuccess;
