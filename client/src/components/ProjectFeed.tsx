import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
  Button, Card, CardActions, CardContent, CardMedia,
  Grid, Stack, Box, Typography, Container,
} from '@mui/material';
import { ProjectsContext } from '../context/ProjectsContext';
import ProjectData from '../apis/ProjectData';
import Search from './Search';

function ProjectFeed() {
  const navigate = useNavigate();

  const {
    projects, setProjects,
  } = useContext(
    ProjectsContext,
  );
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    const getProjectData = async () => {
      try {
        const response = await ProjectData.get('/');
        setProjects(response.data);
        return null;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        return null;
      }
    };
    getProjectData();
  }, [setProjects]);

  const filteredProjects = projects.filter((project) => {
    const { title } = project;
    const matchSearch = title.toLowerCase().includes(searchInput.toLowerCase());

    return (searchInput ? matchSearch : true);
  });

  if (projects === null) {
    return (
      <h2>
        Loading...
      </h2>
    );
  }

  return (
    <main>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h1"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Kickstarter
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Help fund the next big thing!
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Search setSearchInput={setSearchInput} />
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={4}>
          {filteredProjects.map((project) => (
            <Grid item key={project.id} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: 200,
                  }}
                  image={project.img_url}
                  alt={project.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {project.title}
                  </Typography>
                  <Typography>
                    {project.tagline}
                  </Typography>
                  <Box sx={{ borderTop: 3, borderColor: 'primary.dark', my: 3 }} />
                  <Typography variant="body1" textAlign="left" color="primary.main" gutterBottom>
                    Goal:
                    {' '}
                    $
                    {project.funding_goal.toLocaleString('en-US')}
                  </Typography>
                  <Typography variant="body1" textAlign="left">
                    Amount Raised:
                    {' '}
                    $
                    {project.funding_received.toLocaleString('en-US')}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                  <Typography variant="body2" component="div" color="text.secondary" sx={{ m: 1 }}>
                    Funding closes
                    {' '}
                    {moment(project.deadline, 'YYYYMMDD').fromNow()}
                  </Typography>
                  <Button onClick={() => navigate(`/projects/${project.id}`)} sx={{ m: 1, color: 'white', backgroundColor: 'primary.main' }} variant="contained">Fund</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}

export default ProjectFeed;
