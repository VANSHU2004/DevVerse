import axios from '../config/axios';
import { Send, UserRound, UserRoundPlus, Users, X } from 'lucide-react';
import React, { createRef, useEffect, useState , useRef } from 'react'
import { useLocation } from 'react-router-dom';
import { initializeSocket , receiveMessage , sendMessage } from '../config/socket';
import { useUser } from '../context/user.context';
import MarkdownRenderer from '../components/MarkDownRenderer';


const Project = () => {
    const location = useLocation();
    const { project } = location.state || {};
    // You can use the project data to display project details
    // console.log('Project details:', project);
    const [isSidePanelOpen, setisSidePanelOpen] = useState(false);
    const [isModalOpen, setisModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState([]);
    const [users, setUsers] = useState([]);
    const [Project, setProject] = useState([project]);
    const [message, setMessage] = useState('');
    const { user } = useUser();
    const messageBox = useRef();
    // console.log(project)

    const [messages, setMessages] = useState([]);

    const handleUserClick = (userId) => {
        // Logic to handle user click, e.g., open user profile or add user
        setSelectedUserId(prev => {
            if (prev.includes(userId)) {
                return prev.filter(id => id !== userId); // Remove userId if already selected
            } else {
                return [...prev, userId]; // Add userId if not selected
            }
        });
    }

    const addCollaborators =  () => {  

        axios.put('/projects/add-user',{
            projectId: project._id,
            users: Array.from(selectedUserId)
        }).then(res => {
            console.log(res.data);
            setisModalOpen(false);
        }).catch(err => {
            console.error('Error adding collaborators:', err);
        })

        
        
    }

    function sendMessageToProject() {

        // console.log(user)

        if (message.trim()) {
            sendMessage('project-message', { 
                message: message.trim(),
                sender: user._id,
                senderEmail: user.email
            }),

            setMessages(prev => [...prev, {
                message: message.trim(),
                sender: user._id,
                senderEmail: user.email
            }]);
            setMessage('');

        }
    }

    useEffect(() => {


      // Fetch users from an API or other source
        initializeSocket(project._id);


        receiveMessage('project-message', data => {
            // console.log('New project message:',data);
            setMessages(prev => [...prev, data]);
            
        });

        axios.get(`projects/get-project/${project._id}`)
        .then(response => {
            const projectData = response.data.project;
            setProject(projectData);
            // console.log('Project Details:', Project);
        })
        .catch(error => {
            console.error('Error fetching project:', error);
        });

        axios.get('/users/all')
        .then((response) => {
            // console.log('Users fetched successfully:', response.data.users);
            setUsers(response.data.users);
        }).catch((error) => {
            console.error('Error fetching users:', error);
        });
    }, []);

  return (
    <main
    className='h-screen w-screen text-foreground'
    >
        <section
        className='left h-full md:w-[60%] md:ml-[20%] p-2 bg-background shadow-lg rounded-lg top-0 left-0 overflow-y-auto relative'
        >
            <header
            className='flex justify-between items-center h-[8%] py-2 px-4 w-[88%] text-foreground bg-background absolute z-51 top-0 left-0'            
            >
                <h2 className='text-lg font-semibold'>{project.name}</h2>
                <div className='flex gap-3'>
                    <button 
                    onClick={() => setisModalOpen(!isModalOpen)}
                    className='cosmic-button bg-background text-foreground rounded-full p-2 hover:card-hover flex flex-col items-center justify-center'
                    >
                        <UserRoundPlus className='h-4 w-4' />
                        <span className='text-xs'>Add User</span>
                    </button>
                    <button
                    onClick={() => setisSidePanelOpen(!isSidePanelOpen)} 
                    className='cosmic-button bg-background text-foreground rounded-full p-2 hover:card-hover'
                    >
                        <Users />
                    </button>

                </div>
                

            </header>

            <div className="conversation-area relative h-full">


                <div 
                ref={messageBox}
                className="message-box text-foreground h-[86%] absolute top-14 w-full z-52 rounded-lg overflow-y-auto scroll-bar flex flex-col gap-2 items-start">
                    {/* Messages will be appended here */}
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message max-w-[79%] flex flex-col items-start gap-0.5 border border-foreground p-2 rounded-lg bg-primary/80 w-fit ${msg.senderEmail === user.email ? 'ml-auto' : 'ml-0'}`}
                        >
                            <small className='opacity-65 text-xs'>{msg.senderEmail === user.email ? 'You' : msg.senderEmail}</small>
                            <h3 className={`text-sm text-start ${msg.senderEmail === "DevAI" ? 'w-full overflow-auto scroll-bar rounded p-2' : 'p-0'}`}>{msg.senderEmail === "DevAI" ? 

                                <MarkdownRenderer content={msg.message} />
                                : msg.message}</h3>



                        </div>
                        
                    ))}
                    
                </div>


                <div className="input-field flex items-start border border-foreground rounded-lg absolute bottom-0 md:left-1/4 md:w-1/2 w-full gap-2 bg-background z-55">
                    <input 
                    type="text" 
                    placeholder='Enter Your Message' 
                    className='w-full p-2 placeholder:text-gray-500'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    />
                    <button 
                    onClick={sendMessageToProject}
                    className='cosmic-button bg-background text-foreground rounded-lg p-[.45rem] hover:text-primary'>
                       <Send />
                    </button>
                </div>
            </div>

            <div className={`flex flex-col gap-2 side-panel w-full h-full bg-background absolute top-0 right-0 z-55 transition-all ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                <header className='flex justify-between p-2 px-3 bg-primary' >
                    <h2 className='text-lg font-semibold'>Users</h2>
                    <button 
                    onClick={() => setisSidePanelOpen(!isSidePanelOpen)} 
                    className='text-foreground hover:text-background cursor-pointer'
                    >
                        <X />
                    </button>            
                </header>

                <div className="users flex flex-col gap-2 mt-4 p-2 px-3 overflow-y-auto scroll-bar">
                    {Project.users && Project.users.map((user) => {

                        return (
                            <div 
                            key={user._id}                            
                            className="user flex items-center gap-5 p-2 border border-foreground rounded-lg hover:bg-primary hover:text-background transition-colors duration-300 cursor-pointer">
                                <img 
                                className='w-1/6 md:w-1/10 h-full rounded-full object-cover'
                                src="/userAvatar.png" 
                                alt="cant be displayed" />
                                <span className='text-sm font-semibold'>{user.email}</span>                       

                            </div>
                        )

                    })}
                </div>
            </div>

        </section>

        {isModalOpen && (
            <div className='fixed inset-0 bg-background bg-opacity-50 flex items-center justify-center z-60'>
                <div className='bg-background p-6 rounded-lg shadow-lg h-1/2 w-96 border border-foreground relative pb-[4rem]'>
                    <header className='flex justify-between items-center mb-4 text-foreground'>
                        <h2 className='text-lg font-semibold'>Add User</h2>
                        <button onClick={() => setisModalOpen(false)} className='hover:text-primary cursor-pointer'>
                            <X />
                        </button>
                    </header>

                    <div className='users-list flex flex-col gap-2 h-[88%] overflow-y-auto scroll-bar'>                        
                        
                        {users.map((user) => (
                            <div 
                            key={user._id} 
                            className={`flex items-center gap-3 p-2 border border-foreground rounded-lg hover:bg-primary hover:text-background transition-colors duration-300 cursor-pointer ${selectedUserId.indexOf(user._id) !== -1 ? 'bg-primary/60 text-background' : ''}`}
                            onClick={() => handleUserClick(user._id)}
                            >
                                <img 
                                className='w-1/6 h-full rounded-full object-cover'
                                src="/userAvatar.png" 
                                alt="cant be displayed" />
                                <span className='text-lg font-semibold'>{user.email}</span>
                            </div>
                        ))}
                        
                    </div>

                    <button 
                    onClick={addCollaborators}
                    className='cosmic-button bottom-1 left-1/2 transform -translate-x-1/2 absolute'>
                        Add Collaborators
                    </button>

                </div>
            </div>
        )}

        
    </main>
  )
}

export default Project
