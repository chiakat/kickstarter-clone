import React from 'react';
import { Button, Typography } from '@mui/material';
import ProjectTable from '../components/ProjectTable';
import Nav from '../components/Nav';


function ManageProjects() {
  return (
    <div>
      <Nav />
      <Typography variant="h4" gutterBottom sx={{ my: 5 }}>Manage Projects</Typography>
      <Button variant="contained" href="/projects/create" sx={{ alignSelf: 'left', mb: 3, color: 'white' }}>
        Create New Project
      </Button>
      <ProjectTable />
    </div>
  );
}

export default ManageProjects;
