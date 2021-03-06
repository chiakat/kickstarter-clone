import React, { useState, useContext } from 'react';
import {
  Button, Box, Grid, TextField, Alert, InputAdornment, Link, Paper, Container,
} from '@mui/material';
import { ProjectsContext } from '../context/ProjectsContext';
import ProjectData from '../apis/ProjectData';

export default function ProjectForm() {
  const { selectedProject } = useContext(ProjectsContext);
  const project = selectedProject;
  const action = project ? 'Updated' : 'Added';
  const [title, setTitle] = useState(project ? project.title : '');
  const [tagline, setTagline] = useState(project ? project.tagline : '');
  const [details, setDetails] = useState(project ? project.details : '');
  const [fundingGoal, setFundingGoal] = useState(project ? project.funding_goal : '');
  const fundingReceived = project ? project.funding_received : 0;
  const [deadline, setDeadline] = useState(project ? project.deadline : '');
  const [image, setImage] = useState(project ? project.img_url : '');
  const [user, setUser] = useState(project ? project.user_id : '');
  const projectLink = project ? `/projects/${project.id}` : '/projects/manage';

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

    try {
      if (action === 'Added') {
        response = await ProjectData.post('/', {
          title,
          tagline,
          details,
          funding_goal: fundingGoal,
          deadline,
          image,
          user,
        });
      } else if (project === null) {
        return setError('No project selected.');
      } else {
        response = await ProjectData.put(`/${project.id}`, {
          title, tagline, details, fundingGoal, fundingReceived, deadline, image, user,
        });
      }

      const data = action === 'Added' ? response.data[0] : response.data;

      if (data && action === 'Added') {
        setTitle('');
        setTagline('');
        setDetails('');
        setFundingGoal('');
        setDeadline('');
        setImage('');
        setUser('');
      }
      return setMessage(`Success! Project ${action}. See it `);
    } catch {
      return setError('Unable to process request. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="md" sx={{ my: 4 }}>
      <Paper elevation={3}>
        <Grid container justifyContent="center">
          <Grid
            container
            sx={{
              my: 4,
              mx: 6,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ mb: 3 }}>
              {error ? (<Alert severity="error">{error}</Alert>) : null}
              {message ? (
                <Alert severity="success">
                  {message}
                  <Link href={projectLink}> here</Link>
                </Alert>
              ) : null}
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
                    inputProps={{
                      maxLength: 80,
                    }}
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
                    inputProps={{
                      maxLength: 100,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    multiline
                    fullWidth
                    id="details"
                    label="Details"
                    title="details"
                    rows={5}
                    maxRows={20}
                    type="text"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    inputProps={{
                      maxLength: 5000,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
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
                    fullWidth
                    id="image"
                    label="Image URL"
                    title="Image URL"
                    type="string"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    inputProps={{
                      maxLength: 2048,
                    }}
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
                    View All Projects
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
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
