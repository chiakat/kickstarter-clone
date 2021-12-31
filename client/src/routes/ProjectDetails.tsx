import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectsContext } from '../context/ProjectsContext';
import ProjectFinder from '../apis/ProjectData';
import Header from '../components/Header';
// import Contributors from '../components/Contributors';
// import Funding from "../components/Funding";
import AddFunding from '../components/AddFunding';

function ProjectDetails() {
  const { id } = useParams();
  const { selectedProject, setSelectedProject } = useContext(
    ProjectsContext,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProjectFinder.get(`/${id}`);
        console.log(response);

        setSelectedProject(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id, setSelectedProject]);

  if (selectedProject === null) {
    return (
      <h2>
        Loading
      </h2>
    );
  }
  return (
    <>
    <Header />
    <div>
      <h1>
        {selectedProject.title}
      </h1>
      <h5>
        {selectedProject.tagline}
      </h5>
      <img src="http://placeimg.com/640/480/any" />
      <div>
        {selectedProject.description}
      </div>
      <div>
        $
        {selectedProject.funding_goal}
      </div>
      <div>
        $
        {selectedProject.funding_received}
      </div>
      <div>
        {selectedProject.deadline}
      </div>
      <div className="text-center">
        {/* <Funding funding={selectedProject.Project.total_funding} />
            <span className="text-warning ml-1">
              {selectedProject.Project.count
                ? `(${selectedProject.Project.count})`
                : "(0)"}
            </span> */}
      </div>
      {/* <div className="mt-3">
            <Contributors contributors={selectedProject.contributors} />
          </div> */}
      <AddFunding />
    </div>
    </>
  );
}

export default ProjectDetails;
