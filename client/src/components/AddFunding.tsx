import React, { useState, useContext } from 'react';
import {
  Button, Box, Grid, TextField, Alert, InputAdornment,
} from '@mui/material';
import { ProjectsContext } from '../context/ProjectsContext';
import ProjectData from '../apis/ProjectData';

export default function AddFunding() {
  const { selectedProject } = useContext(ProjectsContext);
  const project = selectedProject;
  const [funding, setFunding] = useState('');

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // reset error and message
    setError('');
    setMessage('');
    // fields check
    if (parseInt(funding, 10) <= 0) return setError('Please enter an amount');

    let response;
    if (project) {
      const {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        title, tagline, details, funding_goal, funding_received, deadline, user_id,
      } = project;

      const newFunding = funding + funding_received;
      response = await ProjectData.put(`/${project.id}`, {
        data: {
          title, tagline, details, funding_goal, newFunding, deadline, user_id,
        },
      });
    }

    if (project && response) {
      // reset form for added project
      return setMessage(`Success! You've contributed ${funding} to ${project.title}. Thank you!`);
    }
    return setError('Unable to process request. Please try again.');
  };

  return (
    <Grid container justifyContent="flex-start">
      <Grid
        container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mx: 1,
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
                required
                fullWidth
                title="funding"
                label="Funding"
                id="funding"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                value={funding}
                onChange={(e) => setFunding(e.target.value)}
                sx={{ flexGrow: 1 }}
              />
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, ml: 2, flexGrow: 1 }}
            >
              Fund Project
            </Button>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
