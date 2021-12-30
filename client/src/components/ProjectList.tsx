import React, { useState, useEffect, useContext } from 'react';
import ProjectData from '../apis/ProjectData';
import { ProjectsContext } from "../context/ProjectsContext";
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Alert, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ProjectList = () => {

  useEffect(() => {
    try {
      const response = ProjectData.get('/')
      console.log(response);
    } catch (err) {
      return setError('Unable to find projects');
    }
  },[])

  const { projects, setProjects } = useContext(ProjectsContext);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const updateProject = async (projectId) => router.push(`/projects/${projectId}/update`);

  const deleteProject = async (projectId) => {
    // reset error and message
    setError('');
    setMessage('');
    try {
      await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });
      return router.push(router.asPath);
    } catch (err) {
      return setError('Unable to delete');
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'name', headerName: 'project name', flex: 1.8, minWidth: 80,
    },
    {
      field: 'location', headerName: 'Location', flex: 1.8, minWidth: 80,
    },
    {
      field: 'project', headerName: 'Project', flex: 1, minWidth: 50,
    },
    {
      field: 'user', headerName: 'User', flex: 1, minWidth: 50,
    },
    {
      field: 'Edit',
      width: 80,
      renderCell: (cellValues) => (
        <IconButton aria-label="update" color="primary"
        onClick={() => {
          updateProject(cellValues.row.id);
        }}>
        <EditIcon />
      </IconButton>
      ),
    },
    {
      field: 'Delete',
      width: 80,
      renderCell: (cellValues) => (
        <IconButton aria-label="delete" color="secondary"
          onClick={() => {
            deleteProject(cellValues.row.id);
          }}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const rows = projects;

  return (
    <>
      <Box sx={{ mb: 3 }}>
        {error ? (<Alert severity="error">{error}</Alert>) : null}
        {message ? (<Alert severity="success">{message}</Alert>) : null}
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[10]}
        autoPageSize
        sx={{ height: 400, width: '100%', backgroundColor: 'white' }}
      />
    </>
  );
}

export default ProjectList;