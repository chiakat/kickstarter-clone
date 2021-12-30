import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import {
  IconButton, Alert, Box, Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ProjectsContext } from '../context/ProjectsContext';
import ProjectData from '../apis/ProjectData';

interface Row {
  id: number;
  title: string;
  tagline: string;
  description: string;
  fundingGoal: number;
  fundingReceived: number;
  deadline: string;
  user: number;
}

interface CellValues {
  row: Row
}

function ProjectList() {
  const navigate = useNavigate();
  const {
    projects, setProjects, selectedProject, setSelectedProject,
  } = useContext(ProjectsContext);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getProjectData = async () => {
      try {
        const response = await ProjectData.get('/');
        setProjects(response.data);
        return null;
      } catch (err) {
        return setError('Unable to find projects');
      }
    };
    getProjectData();
  }, [setProjects]);

  const updateProject = (projectId: number) => {
    navigate(`/projects/${projectId}/update`);
  };

  const deleteProject = async (projectId: number) => {
    // reset error and message
    setError('');
    setMessage('');
    setShowDeleteAlert(false);
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

  const handleDelete = (project: Row) => {
    setSelectedProject(project);
    setShowDeleteAlert(true);
  };

  const deleteAlert = selectedProject
    ? (
      <Alert
        severity="error"
        action={(
          <>
            <Button onClick={() => setShowDeleteAlert(false)}>
              NO
            </Button>
            <Button onClick={() => deleteProject(selectedProject.id)}>
              YES
            </Button>
          </>
          )}
      >
        {`Are you sure you want to delete Project ${selectedProject.id}: ${selectedProject.title}?`}
      </Alert>
    )
    : null;

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
            handleDelete(cellValues.row);
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
        {showDeleteAlert ? deleteAlert : null}
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
