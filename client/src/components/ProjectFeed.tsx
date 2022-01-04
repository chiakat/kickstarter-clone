import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
  AppBar, Button, Card, CardActions, CardContent, CardMedia,
  Grid, Stack, Box, Toolbar, Typography, Container, Link,
} from '@mui/material';
import CameraIcon from '@mui/icons-material/PhotoCamera';
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
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
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
            <Search searchInput={searchInput} setSearchInput={setSearchInput} />
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {filteredProjects.map((project) => (
            <Grid item key={project.id} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    // 16:9
                    pt: '56.25%',
                  }}
                  image={project.img_url}
                  alt={project.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {project.title}
                  </Typography>
                  <Typography>
                    {project.tagline}
                  </Typography>
                  <Typography variant="body1" textAlign="left" color="text.secondary">
                    Goal:
                    {' '}
                    $
                    {project.funding_goal}
                  </Typography>
                  <Typography variant="body1" textAlign="left">
                    Amount Raised:
                    {' '}
                    $
                    {project.funding_received}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => navigate(`/projects/${project.id}`)} sx={{ m: 2 }} variant="contained">Fund Me!</Button>
                  <Typography variant="body2" component="div" color="text.secondary">
                    Funding closes
                    {' '}
                    {moment(project.deadline, 'YYYYMMDD').fromNow()}
                  </Typography>
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
