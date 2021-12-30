import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProjectsContext } from "../context/ProjectsContext";
import ProjectFinder from "../apis/ProjectFinder";
// import Contributors from '../components/Contributors';
// import Funding from "../components/Funding";
import AddFunding from "../components/AddFunding";

const ProjectDetails = () => {
  const { id } = useParams();
  const { selectedProject, setSelectedProject } = useContext(
    ProjectsContext
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProjectFinder.get(`/${id}`);
        console.log(response);

        setSelectedProject(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {selectedProject && (
        <>
          <h1>
            {selectedProject.title}
          </h1>
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
        </>
      )}
    </div>
  );
};

export default ProjectDetails;