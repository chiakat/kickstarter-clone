import React from 'react';
import { Button } from '@mui/material';
import Header from '../components/Header';
import ProjectTable from '../components/ProjectTable';

function ManageProjects() {
  return (
    <div>
      <Header />
      <h1>Manage Projects</h1>
      <Button variant="contained" href="/projects/create" sx={{ mb: 3 }}>
        Create New Project
      </Button>
      <ProjectTable />
    </div>
  );
}

export default ManageProjects;
