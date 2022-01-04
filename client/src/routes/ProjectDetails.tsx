import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { ProjectsContext } from '../context/ProjectsContext';
import ProjectFinder from '../apis/ProjectData';
// import Contributors from '../components/Contributors';
// import Funding from "../components/Funding";
import AddFunding from '../components/AddFunding';
import Nav from '../components/Nav';


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
      <Nav />
      <div>
        <h1>
          {selectedProject.title}
        </h1>
        <h5>
          {selectedProject.tagline}
        </h5>
        <img src={selectedProject.img_url} alt={selectedProject.title} />
        <div>
          {selectedProject.details}
        </div>
        <div>
          Goal:
          {' '}
          $
          {selectedProject.funding_goal}
        </div>
        <div>
          Amount Raised:
          {' '}
          $
          {selectedProject.funding_received}
        </div>
        <div>
          Funding closes
          {' '}
          {moment(selectedProject.deadline, 'YYYYMMDD').fromNow()}
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
