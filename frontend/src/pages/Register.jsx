import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LogoImage from '../components/LogoImage'
import axios from '../config/axios'
import { useState } from 'react'
import {useUser} from '../context/user.context'


const Register = () => {
  // Register component
  // This component renders the registration page with a form for email and password input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {setUser} = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users/register", { email, password });
      // console.log(response.data);
      localStorage.setItem('token' , response.data.token);
      setUser(response.data.user);
      navigate("/login");  // Redirect to login on successful registration
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className='min-h-screen w-screen bg-background text-foreground overflow-x-hidden flex items-center justify-center'>
            
    
          {/* Login Card */}
          <div className="flex items-center justify-center shadow-lg md:border rounded-md">
            
    
            <div className="p-8 rounded-xl border md:border-none  md:w-1/2 w-[98%] max-w-md z-10">
              <h1 className="text-2xl sm:text-3xl font-bold text-center text-foreground">
                Welcome to <span className='text-primary'>Dev Verse</span>
              </h1>
              <p className="text-center text-sm text-foreground mb-4">
                Your Space to Code, Create, Collaborate
              </p>
              <h3 className="text-center text-2xl font-semibold text-foreground mb-4">Register</h3>
    
              <form 
              onSubmit={handleSubmit}
              className="space-y-4">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded border placeholder:text-gray-500"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded border  placeholder:text-gray-500"
                />
                <button
                  type="submit"
                  className="cosmic-button w-full"
                >
                  Register
                </button>
              </form>
    
              <p className="text-sm text-foreground mt-6 text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Login
                </Link>
              </p>
            </div>
    
            <div className="hidden md:block p-8 rounded-xl w-1/2 max-w-md z-10">
              <LogoImage />
            </div>
    
          </div>
          
        </div>
  )
}

export default Register
