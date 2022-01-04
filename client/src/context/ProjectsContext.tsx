import React, { useState, FC } from 'react';
import PropTypes from 'prop-types';

interface ProjectInterface {
  id: number;
  title: string;
  tagline: string;
  details: string;
  funding_goal: number;
  funding_received: number;
  deadline: string;
  img_url?: string;
  user_id: number;
}

// interface ProjectsInterface extends Array<ProjectInterface>{}

type SelectedProjectType = ProjectInterface | null;
type ProjectsType = ProjectInterface[] | never[];

// type setSelectedProject =  React.Dispatch<React.SetStateAction<selectedProject>>;

interface ProjectsContextInterface {
  projects: ProjectInterface[] | never[],
  setProjects: React.Dispatch<React.SetStateAction<ProjectsType>>,
  addProjects?: () => void,
  selectedProject: ProjectInterface | null,
  setSelectedProject: React.Dispatch<React.SetStateAction<SelectedProjectType>>,
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

// eslint-disable-next-line react/function-component-definition
export const ProjectsProvider: FC = ({ children }) => {
  const [projects, setProjects] = useState<ProjectsType | never[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectInterface | null>(null);

  // const addProjects = (project: ProjectInterface) => {
  //   setProjects([...projects, project]);
  // };

  return (
    <ProjectsContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
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

ProjectsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
