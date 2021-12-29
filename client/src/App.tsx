import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './routes/Home';
import ProjectDetails from './routes/ProjectDetails';
import UpdateProject from './routes/UpdateProject';
import UserFunding from './routes/UserFunding';
import { ProjectsContextProvider } from './context/ProjectsContext';
import './css/App.css';

function App() {
  return (
    <ProjectsContextProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path = '/' component={Home} />
            <Route exact path = '/projects/:id/update' component={UpdateProject} />
            <Route exact path = '/projects/:id' component={ProjectDetails} />
            <Route exact path = '/user/:id' component={UserFunding} />
          </Switch>
        </Router>
      </div>
    </ProjectsContextProvider>
  );
}

export default App;
