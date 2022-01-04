import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
  Box, Typography, Grid, Button,
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
    <Grid container alignItems="center" justifyContent="center" justifyItems="center" sx={{ m: 3, p: 3 }} >
      <Search searchInput={searchInput} setSearchInput={setSearchInput} />
      <Grid
        container
        item
        sx={{
          p: 2, margin: 'auto', maxWidth: 1000, justifyContent: 'center',
        }}
      >
        {filteredProjects.map((project) => (
          <Grid
            container
            spacing={2}
            sx={{
              mx: 1,
              my: 3,
              borderTop: 1,
              borderColor: 'primary.main',
              flexGrow: 2,
            }}
          >
            <Grid item sm>
              <Box
                component="img"
                src={project.img_url}
                alt={project.title}
                height={200}
                width={300}
              />
            </Grid>
            <Grid item container sm direction="column" spacing={2}>
              <Grid item>
                <Typography gutterBottom variant="h4" component="div" textAlign="left">
                  {project.title}
                </Typography>
                <Typography variant="subtitle1" textAlign="left" gutterBottom>
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

              </Grid>
            </Grid>
            <Grid item container direction="column" sx={{ minWidth: 100, maxWidth: 200, mx: 2 }}>
              <Typography variant="body2" component="div" color="text.secondary">
                Funding closes
                {' '}
                {moment(project.deadline, 'YYYYMMDD').fromNow()}
              </Typography>
              <Button onClick={() => navigate(`/projects/${project.id}`)} sx={{ m: 2, color: 'white' }} variant="contained">Fund!</Button>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default ProjectFeed;
