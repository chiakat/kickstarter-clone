import React, { useState, FC } from 'react';

interface ProjectInterface {
  id: number;
  title: string;
  tagline: string;
  description: string;
  fundingGoal: number;
  fundingReceived: number;
  deadline: string;
  user: number;
}

// interface ProjectsInterface extends Array<ProjectInterface>{}

type selectedProject = ProjectInterface | null;
type projects = ProjectInterface[] | never[];

// type setSelectedProject =  React.Dispatch<React.SetStateAction<selectedProject>>;

interface ProjectsContextInterface {
  projects: ProjectInterface[] | never[],
  setProjects: React.Dispatch<React.SetStateAction<projects>>,
  addProjects?: () => void,
  selectedProject: ProjectInterface | null,
  setSelectedProject: React.Dispatch<React.SetStateAction<selectedProject>>,
}

const defaultState = {
  projects: [],
  selectedProject: null,
  setSelectedProject: () => null,
  setProjects: () => null,
};



// type ProjectsContextType = {
//   projects: ProjectInterface | never[],
//   setProjects?: (id: number) => void,
//   addProjects?: (id: number) => void,
//   selectedProject: selectedProject,
//   setSelectedProject: setSelectedProject,
// }

export const ProjectsContext = React.createContext<ProjectsContextInterface>(defaultState);

export const ProjectsProvider: FC = ({children}) => {
  const [projects, setProjects] = useState<projects | never[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectInterface | null>(null);

  // const addProjects = (project: ProjectInterface) => {
  //   setProjects([...projects, project]);
  // };
  return (
    <ProjectsContext.Provider
      value={{
        projects,
        setProjects,
        // addProjects,
        selectedProject,
        setSelectedProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

