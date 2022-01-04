import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
import {
  IconButton, Alert, Box, Button, Link, Container,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ProjectsContext } from '../context/ProjectsContext';
import ProjectData from '../apis/ProjectData';

interface Row {
  id: number;
  title: string;
  tagline: string;
  details: string;
  funding_goal: number;
  funding_received: number;
  deadline: string;
  img_url: string;
  user_id: number;
}

interface CellValues {
  row: Row
}

function ProjectTable() {
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

  const updateProject = (project: Row) => {
    setSelectedProject(project);
    navigate(`/projects/${project.id}/update`);
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

  const selectProject = (projectId: number) => {
    navigate(`/projects/${projectId}`);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'title',
      headerName: 'Project Title',
      flex: 1.8,
      minWidth: 80,
      renderCell: (cellValues: CellValues) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link
          component="button"
          underline="hover"
          aria-label="navigate to project page"
          onClick={() => {
            selectProject(cellValues.row.id);
          }}
        >
          {cellValues.row.title}
        </Link>
      ),
    },
    {
      field: 'tagline', headerName: 'Tagline', flex: 1.8, minWidth: 80,
    },
    {
      field: 'funding_goal',
      headerName: 'Funding Goal',
      flex: 1,
      minWidth: 50,
      renderCell: (cellValues: CellValues) => (`$${cellValues.row.funding_goal.toLocaleString('en-US')}`),
    },
    {
      field: 'funding_received',
      headerName: 'Funding Received',
      flex: 1,
      minWidth: 50,
      renderCell: (cellValues: CellValues) => (`$${cellValues.row.funding_received.toLocaleString('en-US')}`),
    },
    {
      field: 'deadline',
      headerName: 'Funding Deadline',
      flex: 1,
      minWidth: 50,
      renderCell: (cellValues: CellValues) => moment(cellValues.row.deadline, 'YYYYMMDD').format('L'),
    },
    {
      field: 'user_id', headerName: 'User', flex: 1, minWidth: 50,
    },
    {
      field: 'Edit',
      width: 80,
      renderCell: (cellValues: CellValues) => (
        <IconButton
          aria-label="update"
          color="primary"
          onClick={() => {
            updateProject(cellValues.row);
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
    <Container>
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
    </Container>
  );
}

export default ProjectTable;
