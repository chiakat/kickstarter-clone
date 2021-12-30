import React, { useState, useContext } from 'react';
import {
  Button, Box, Grid, TextField, Alert,
} from '@mui/material';
import { ProjectsContext } from '../context/ProjectsContext';

export default function ProjectForm() {
  const { selectedProject, setSelectedProject } = useContext(ProjectsContext);
  const project = selectedProject;
  const action = project ? 'Updated' : 'Added';
  const [title, setTitle] = useState(project ? project.title : '');
  const [tagline, setTagline] = useState(project ? project.tagline : '');
  const [description, setDescription] = useState(project ? project.description : '');
  const [fundingGoal, setFundingGoal] = useState(project ? project.tagline : '');
  const [deadline, setDeadline] = useState(project ? project.deadline : '');
  const [user, setUser] = useState(project ? project.user : '');

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // reset error and message
    setError('');
    setMessage('');
    // fields check
    if (!title || !tagline) return setError('All fields are required');

    let response;
    if (action === 'Added') {
      response = await fetch('/api/projects', {
        method: 'POST',
        body: JSON.stringify({
          title, tagline, description, fundingGoal, deadline, user,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else if (project === null) {
      return setError('No project selected.');
    } else {
      response = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title, tagline, description, fundingGoal, deadline, user,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const result = await response.json();
    const data = action === 'Added' ? result[0] : result;

    if (data) {
      // reset form for added project
      if (action === 'Added') {
        setTitle('');
        setTagline('');
        setDescription('');
        setFundingGoal('');
        setDeadline('');
        setUser('');
      }
      return setMessage(`Success! ${action} ${data.title}`);
    }
    return setError('Unable to process request. Please try again.');
  };

  return (
    <Box
      sx={{
        marginTop: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ mb: 3 }}>
        {error ? (<Alert severity="error">{error}</Alert>) : null}
        {message ? (<Alert severity="success">{message}</Alert>) : null}
      </Box>
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              title="projecttitle"
              required
              fullWidth
              id="title"
              label="project title"
              type="text"
              value={title}
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="tagline"
              label="project tagline"
              title="tagline"
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="description"
              label="description"
              title="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="deadline"
              label="deadline"
              title="deadline"
              type="text"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              title="funding goal"
              label="fundingGoal"
              id="fundingGoal"
              type="number"
              value={fundingGoal}
              onChange={(e) => setFundingGoal(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              title="user"
              label="User ID"
              id="user"
              type="number"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button
              type="submit"
                // variant="contained"
              sx={{ my: 3, mr: 2 }}
              href="/projects/view"
            >
              View All projects
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ my: 3 }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
