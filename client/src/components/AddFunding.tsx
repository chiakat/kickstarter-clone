import React, { useState, useContext } from 'react';
import {
  Button, Box, Grid, TextField, Alert, InputAdornment,
} from '@mui/material';
import axios from 'axios';
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

    if (project) {
      const newFunding = parseInt(funding, 10) + project.funding_received;

      const stripeFunding = parseInt(funding, 10) * 100;

      axios.post('http://localhost:3001/create-checkout-session', {
        name: project.id,
        unit_amount: stripeFunding,
      })
        .then((res) => {
          console.log(res);
          window.location.href = res.data.url;
        })
        .then(() => ProjectData.patch(`/${project.id}/funding`, {
          newFunding,
        }))
        .then(() => {
          setMessage(`Success! You've contributed ${funding} to ${project.title}. Thank you!`);
          setFunding('');
        })
        .catch((err) => {
          console.log(err);
          return setError(`${err}. Please try again.`);
        });
    }
    return null;
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
