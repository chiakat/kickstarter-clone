import React from 'react';
import ProjectForm from '../components/ProjectForm';
import Nav from '../components/Nav';


function CreateProject() {
  return (
    <div>
      <Nav />
      <h1>Create Project</h1>
      <ProjectForm />
    </div>
  );
}

export default CreateProject;
