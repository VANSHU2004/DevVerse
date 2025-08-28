import React, { useState } from 'react'
import axios from '../config/axios';
import {X} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateProject = ({onCreateProject , setProjects}) => {

    const [projectName, setprojectName] = useState('')
    const navigate = useNavigate();
    

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to create a new project
        
        console.log({ projectName });
        axios.post('/projects/create', { name: projectName })
        .then((response) =>{
            console.log('Project created successfully:', response.data);
            // Optionally, you can reset the form or update the UI after project creation
            // For example, you might want to redirect to the new project page or show a success message
            onCreateProject();
            setProjects(prev => [...prev, response.data]); // Update the projects state with the new project
            navigate('/home'); // Redirect to the home page or any other page after project creation
            setprojectName(''); // Reset the project name input after submission
        } )
        .catch((error) => {
            console.error('Error creating project:', error);
        });        

    };

    const onClose = () => {
            onCreateProject();
    }
  return (
    <div >
        <div className='absolute border border-foreground bg-background top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 rounded-lg shadow-lg w-96 z-10'>
            <button 
            onClick={onClose} 
            className='absolute top-2 right-2 text-foreground hover:text-primary cursor-pointer'
            aria-label='Close modal'
            >
                <X/>
            </button>
            <h2 className='text-2xl font-bold mb-4'>New Project</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-sm font-medium mb-2'>Project Name</label>
                    <input 
                    onChange={(e) => setprojectName(e.target.value)}
                    type='text' 
                    className='border border-gray-300 p-2 rounded w-full' 
                    required
                    value={projectName} />
                </div>
                <button className='py-2 px-4 cosmic-button'>
                    Create Project
                </button>
            </form>
        </div>
    </div>
  )
}

export default CreateProject
