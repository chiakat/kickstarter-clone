import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { GlobalStyles, CssBaseline } from '@mui/material';
import Home from './routes/Home';
import ProjectDetails from './routes/ProjectDetails';
import ManageProjects from './routes/ManageProjects';
import UpdatePage from './routes/UpdatePage';
import { ProjectsProvider } from './context/ProjectsContext';
import './css/App.css';
import CreateProject from './routes/CreateProject';
import theme from './theme/theme';

function App() {
  return (
    <ProjectsProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/create" element={<CreateProject />} />
              <Route path="/projects/manage" element={<ManageProjects />} />
              <Route path="/projects/:id/update" element={<UpdatePage />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
            </Routes>
          </Router>
        </div>
      </ThemeProvider>
    </ProjectsProvider>
  );
}

export default App;
