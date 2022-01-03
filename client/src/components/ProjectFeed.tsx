import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
        <Grid container spacing={2} sx={{ width: '100%' }}>
          <Grid
            item
            sx={{ flexGrow: 1 }}
          >
            <Box
              component="img"
              src={project.img_url}
              alt={project.title}
              height={200}
              sx={{
                px: 1, py: 1,
              }}
            />
          </Grid>
          <Grid item sm container direction="column" spacing={2} sx={{ flexGrow: 3 }}>
            <Grid item sm>
              <Typography gutterBottom variant="h6" component="div">
                {project.title}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {project.tagline}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                $
                {project.funding_goal}
              </Typography>
              <Typography variant="body2">
                $
                {project.funding_received}
              </Typography>
              <Typography variant="subtitle1" component="div">
                {project.deadline}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Button onClick={() => navigate(`/projects/${project.id}`)}>Fund Me!</Button>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );
}

export default ProjectFeed;
