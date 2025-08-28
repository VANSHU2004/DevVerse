import React, { useState } from 'react'
import {useUser} from '../context/user.context';
import {Link} from 'lucide-react'
import CreateProject from './CreateProject';

const DefaultHomePage = ({isButtonClicked , setisButtonClicked, onCreateProject , setProjects}) => {

    const {user} = useUser();
    

    return (
        <main className={`flex flex-col items-center justify-center h-screen bg-background text-foreground`}>
        <div>
            <span className='animate-fade-in text-4xl font-bold mb-4'>Welcome to the </span>
            <span className='animate-fade-in-delay-1 text-4xl font-bold mb-4 text-primary'> Dev Verse </span>
        </div>
        
        <p className='text-lg mb-6 mt-4'>Hello, {user ? user.email : 'Guest'}!</p>
        <button
            onClick={() => setisButtonClicked(!isButtonClicked)}
            className={`py-2 px-4 cosmic-button flex items-center gap-2`}
        >
            New Project
            <Link/>
        </button>

        {isButtonClicked && (
            <CreateProject onCreateProject={onCreateProject} setProjects={setProjects} />
        )}
        </main>
    )
    }

export default DefaultHomePage
