import React, { createContext, useState, FC } from 'react';

interface ProjectInterface {
  id: number;
  title: string;
  tagline: string;
  description: string;
  funding: number;
  deadline: string;
  user_id: number;
}

interface ProjectsInterface extends Array<ProjectInterface>{}

interface ProjectsContextInterface {
  projects: ProjectsInterface,
  // setProjects: FC,
  // addProjects: FC,
  // selectedProject: ProjectInterface,
  // setSelectedProject: FC,
}

const defaultState = {projects: []};

export const ProjectsContext = React.createContext<ProjectsContextInterface>(defaultState);

export const ProjectsProvider: FC = ({children}) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  // const addProjects = (project: ProjectInterface) => {
  //   setProjects([...projects, project]);
  // };
  return (
    <ProjectsContext.Provider
      value={{
        projects,
        //setProjects,
        // addProjects,
        //selectedProject,
       // setSelectedProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

