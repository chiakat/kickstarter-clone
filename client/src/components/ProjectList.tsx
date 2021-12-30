import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Alert, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ProjectsContext } from '../context/ProjectsContext';
import ProjectData from '../apis/ProjectData';

interface Row {
  id: number;
}

interface CellValues {
  row: Row
}

function ProjectList() {
  const navigate = useNavigate();
  const { projects, setProjects } = useContext(ProjectsContext);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getProjectData = async () => {
      try {
        const response = await ProjectData.get('/');
        console.log(response.data);
        setProjects(response.data.data.projects);
        return null;
      } catch (err) {
        return setError('Unable to find projects');
      }
    };
    getProjectData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateProject = (projectId: number) => {
    navigate(`/projects/${projectId}/update`);
  };

  const deleteProject = async (projectId: number) => {
    // reset error and message
    setError('');
    setMessage('');
    try {
      await ProjectData.delete(`/${projectId}`);
      setProjects(
        projects.filter((project) => project.id !== projectId),
      );
      return null;
    } catch (err) {
      return setError('Unable to delete');
    }
  };

  // const selectProject = (projectId: number) => {
  //   navigate(`/projects/${projectId}`);
  // };

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'title', headerName: 'Project Title', flex: 1.8, minWidth: 80,
    },
    {
      field: 'tagline', headerName: 'Tagline', flex: 1.8, minWidth: 80,
    },
    {
      field: 'fundingGoal', headerName: 'Funding Goal', flex: 1, minWidth: 50,
    },
    {
      field: 'fundingReceived', headerName: 'Funding Received', flex: 1, minWidth: 50,
    },
    {
      field: 'deadline', headerName: 'Deadline', flex: 1, minWidth: 50,
    },
    {
      field: 'user', headerName: 'User', flex: 1, minWidth: 50,
    },
    {
      field: 'Edit',
      width: 80,
      renderCell: (cellValues: CellValues) => (
        <IconButton
          aria-label="update"
          color="primary"
          onClick={() => {
            updateProject(cellValues.row.id);
          }}
        >
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: 'Delete',
      width: 80,
      renderCell: (cellValues: CellValues) => (
        <IconButton
          aria-label="delete"
          color="secondary"
          onClick={() => {
            deleteProject(cellValues.row.id);
          }}
        >
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
