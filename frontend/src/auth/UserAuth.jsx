import React, { useEffect, useState } from 'react'
import { useUser } from '../context/user.context';
import { useNavigate } from 'react-router-dom';


const UserAuth = ({children}) => {

    const {user} = useUser();
    const navigate = useNavigate();


    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    

    

    useEffect(() => {

        if(user){
        setLoading(false);
        }

        if(!token){
            // Redirect to login
            navigate('/login');
        }

        if(!user){
            // Redirect to login
            navigate('/login');
        }
         
      
    }, [])

    if(loading) return <div>Loading...</div>;
    

  return (
    <>
      {children}
    </>
  )
}

export default UserAuth;
