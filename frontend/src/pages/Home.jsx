import React, { useEffect, useState } from 'react'
import axios from '../config/axios'
import DefaultHomePage from '../components/DefaultHomePage';
import { Link, User } from 'lucide-react';
import CreateProject from '../components/CreateProject';
import { useNavigate } from 'react-router-dom';



const Home = () => {

  const [isButtonClicked, setisButtonClicked] = useState(false);
    // Function to handle project creation
    // This function can be modified to include actual project creation logic
    const onCreateProject = () => (
        setisButtonClicked(false)
    );

  const [projects, setProjects] = useState([]);
  // console.log('Projects:', projects);

  useEffect(() => {

    axios.get('projects/all' , {
      headers: {
        "Authorization": `bearer ${localStorage.getItem('token')}`
      }
    })
    .then((res) => {
      // console.log('Projects fetched successfully:', res.data);

      res.data.projects ? setProjects(res.data.projects) : setProjects([]);
      // You can handle the fetched projects here, e.g., store them in state or display
    })
    .catch((error) => {
      console.error('Error fetching projects:', error);
    });
  }, []);

  const navigate = useNavigate();


  return (
    projects.length===0 ? <DefaultHomePage setProjects={setProjects} setisButtonClicked={setisButtonClicked} isButtonClicked={isButtonClicked} onCreateProject={onCreateProject}  /> : 

    <div className='flex flex-col items-center justify-center h-screen w-screen bg-background text-foreground z-50'>
      <h1 className='text-3xl font-semibold text-primary mb-4'>Your Projects</h1>
      {projects.map((project , idx) => (        
        <div 
        key={idx} 
        className='flex items-center justify-between p-4 m-2 border border-foreground rounded-lg shadow-lg w-80 mb-4 cursor-pointer hover:bg-primary hover:text-background transition-colors duration-300'
        onClick={() => navigate('/project' , {state: {project}})}>
        <h2 className='text-xl'>{project.name}</h2>
        <p className='text-lg text-center'> <User className='inline-block'/> <small className='mr-1'>  Collaborators: </small> {project.users.length}  </p>
        </div>
      ))}

      <button
            onClick={() => setisButtonClicked(!isButtonClicked)}
            className={`py-2 px-4 cosmic-button flex items-center gap-2 mt-4`}
        >
            New Project
            <Link/>
        </button>

        {isButtonClicked && (
            <CreateProject onCreateProject={onCreateProject} setProjects={setProjects} />
        )}
    </div>
    
  
  )
}

export default Home
