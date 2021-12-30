import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import ProjectDetails from './routes/ProjectDetails';
import UpdatePage from './routes/UpdatePage';
import UserFunding from './routes/UserFunding';
import { ProjectsProvider } from './context/ProjectsContext';
import './css/App.css';

function App() {
  return (
    <ProjectsProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path = '/' element={<Home />} />
            <Route path = '/projects/:id/update' element={<UpdatePage />} />
            <Route path = '/projects/:id' element={<ProjectDetails />} />
            <Route path = '/user/:id' element={UserFunding} />
          </Routes>
        </Router>
      </div>
    </ProjectsProvider>
  );
}

export default App;
