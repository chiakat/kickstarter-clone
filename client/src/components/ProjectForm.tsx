import React, { useState, useContext } from 'react';
import {
  Button, Box, Grid, TextField, Alert, InputAdornment,
} from '@mui/material';
import { ProjectsContext } from '../context/ProjectsContext';
import ProjectData from '../apis/ProjectData';

export default function ProjectForm() {
  const { selectedProject } = useContext(ProjectsContext);
  const project = selectedProject;
  const action = project ? 'Updated' : 'Added';
  const [title, setTitle] = useState(project ? project.title : '');
  const [tagline, setTagline] = useState(project ? project.tagline : '');
  const [description, setDescription] = useState(project ? project.description : '');
  const [fundingGoal, setFundingGoal] = useState(project ? project.funding_goal : '');
  const [deadline, setDeadline] = useState(project ? project.deadline : '');
  const [user, setUser] = useState(project ? project.user_id : '');

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
      response = await ProjectData.post('/', {
        title,
        tagline,
        description,
        funding_goal: fundingGoal,
        deadline,
        user,
      });
    } else if (project === null) {
      return setError('No project selected.');
    } else {
      response = await ProjectData.put(`/${project.id}`, {
        data: {
          title, tagline, description, fundingGoal, deadline, user,
        },
      });
    }

    const data = action === 'Added' ? response.data[0] : response.data;

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
              label="Title"
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
              label="Tagline"
              title="tagline"
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              fullWidth
              id="description"
              label="Description"
              title="description"
              rows={5}
              maxRows={20}
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
              label="Deadline"
              title="Deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              title="funding goal"
              label="Funding Goal"
              id="fundingGoal"
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
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
              sx={{ my: 3, mr: 2 }}
              href="/projects/manage"
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
