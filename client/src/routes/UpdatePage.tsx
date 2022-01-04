import React from 'react';
import { Typography } from '@mui/material';
import ProjectForm from '../components/ProjectForm';
import Nav from '../components/Nav';

function UpdatePage() {
  return (
    <>
      <Nav />
      <Typography variant="h4" gutterBottom sx={{ my: 5 }}>Update Projects</Typography>
      <ProjectForm />
    </>
  );
}

export default UpdatePage;
