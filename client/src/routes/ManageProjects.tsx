import React from 'react';
import { Button } from '@mui/material';
import ProjectTable from '../components/ProjectTable';
import Nav from '../components/Nav';


function ManageProjects() {
  return (
    <div>
      <Nav />
      <h1>Manage Projects</h1>
      <Button variant="contained" href="/projects/create" sx={{ mb: 3 }}>
        Create New Project
      </Button>
      <ProjectTable />
    </div>
  );
}

export default ManageProjects;
