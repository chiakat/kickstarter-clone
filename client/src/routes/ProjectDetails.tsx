import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import {
  Grid, Box, Typography, Container, Paper,
} from '@mui/material';
import { ProjectsContext } from '../context/ProjectsContext';
import ProjectFinder from '../apis/ProjectData';
import AddFunding from '../components/AddFunding';
import Nav from '../components/Nav';

function ProjectDetails() {
  const { id } = useParams();
  const { selectedProject, setSelectedProject } = useContext(
    ProjectsContext,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProjectFinder.get(`/${id}`);
        setSelectedProject(response.data);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    };

    fetchData();
  }, [id, setSelectedProject]);

  if (selectedProject === null) {
    return (
      <h2>
        Loading
      </h2>
    );
  }
  return (
    <>
      <Nav />
      <Container>
        <Typography gutterBottom variant="h4" component="h1" sx={{ mt: 5 }}>
          {selectedProject.title}
        </Typography>
        <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: 'light' }}>
          {selectedProject.tagline}
        </Typography>
        <Grid container lg>
          <Grid container item lg sx={{ m: 3 }}>
            <Box
              component="img"
              sx={{
                height: 400,
                width: 700,
                mb: 3,
              }}
              src={selectedProject.img_url}
              alt={selectedProject.title}
            />
            <Typography gutterBottom variant="body1" component="div" textAlign="left">
              {selectedProject.details}
            </Typography>
          </Grid>
          <Grid
            container
            item
            sm
            sx={{
              flexDirection: 'column', borderTop: 5, borderColor: 'primary.dark', m: 3,
            }}
          >
            <Paper elevation={3} sx={{ my: 3, p: 3 }}>
              <Typography variant="h3" textAlign="left" color="primary.main" sx={{ m: 1 }}>
                $
                {selectedProject.funding_received.toLocaleString('en-US')}
              </Typography>
              <Typography variant="body1" textAlign="left" sx={{ ml: 1 }}>
                {'of  '}
                $
                {selectedProject.funding_goal.toLocaleString('en-US')}
                {' raised!'}
              </Typography>
              <Typography variant="body2" component="div" color="text.secondary" textAlign="left" sx={{ mx: 1, my: 2 }}>
                Funding closes
                {' '}
                {moment(selectedProject.deadline, 'YYYYMMDD').fromNow()}
              </Typography>
              <AddFunding />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ProjectDetails;
