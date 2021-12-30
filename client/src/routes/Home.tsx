import React from 'react';
import Header from '../components/Header';
import AddProject from '../components/AddProject';
import ProjectList from '../components/ProjectList';

function Home() {
  return (
    <div>
      <Header />
      <AddProject />
      <ProjectList />
    </div>
  );
}

export default Home;
