import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
  Box, Typography, Grid, Paper, Button,
} from '@mui/material';
import { ProjectsContext } from '../context/ProjectsContext';
import ProjectData from '../apis/ProjectData';

function ProjectFeed() {
  const navigate = useNavigate();

  const {
    projects, setProjects, selectedProject, setSelectedProject,
  } = useContext(
    ProjectsContext,
  );

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

  if (projects === null) {
    return (
      <h2>
        Loading...
      </h2>
    );
  }
  return (
    <Paper sx={{
      p: 2, margin: 'auto', maxWidth: 800, flexGrow: 1,
    }}
    >
      {projects.map((project) => (
        <Grid
          container
          spacing={2}
          sx={{
            mx: 1, my: 3, width: '100%', borderTop: 1, borderColor: 'primary.main',
          }}
        >
          <Grid item md>
            <Box
              component="img"
              src={project.img_url}
              alt={project.title}
              height={200}
              width={300}
            />
          </Grid>
          <Grid item container md direction="column" spacing={2}>
            <Grid item sm>
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
          <Grid item container direction="column" sx={{ width: 100, mx: 2 }}>
            <Typography variant="body2" component="div" color="text.secondary">
              Funding closes
              {' '}
              {moment(project.deadline, 'YYYYMMDD').fromNow()}
            </Typography>
            <Button onClick={() => navigate(`/projects/${project.id}`)} sx={{ m: 2 }} variant="contained">Fund Me!</Button>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );
}

export default ProjectFeed;
