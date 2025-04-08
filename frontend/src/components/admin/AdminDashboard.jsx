import React from 'react'
import './AdminDashboard.css';

import JobDashboard from './JobDashboard'
import InternDashboard from './InternDashboard'
import AdminCourse from './AdminCourse'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader';

function AdminDashboard() {
  const [active, setActive] = useState(null)
  const [toggle, setToggle] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [lod,setLod]=useState(null)
  const navigate = useNavigate();

  const handleClick = () => {
    setToggle(!toggle)
  }

  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, d * 500)
    })
  }

  const handleLogout = async () => {
    await delay(3)
    
    try {
      await axios.get("http://localhost:3000/api/logout", {
        withCredentials: true
      });
      localStorage.removeItem("token");
      // setIsAuthenticated(false);      
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed, try again!");
    }
  };


  return (
    <>

      <div className="admin-dashboard">
        <aside className="sidebar">
          <button onClick={handleClick}>{toggle ? <h2 className='bg-blue-500 font-bold rounded-md px-3 py-1'>Menu</h2> : 'Menu ⇶'}
          </button>
          {toggle && (
            <ul>

              <li className='hover:cursor-pointer ' onClick={() => setActive("job")}>Job Post</li>
              <li className='hover:cursor-pointer ' onClick={() => setActive("intern")}>Internship Post</li>
              <li className='hover:cursor-pointer ' onClick={() => setActive("skills")}>Course Post </li>
             
              <li><button className="bg-red-600 text-white px-3 py-1 rounded-md"
              onClick={handleLogout} >
                Log Out
                </button></li>

            </ul>
          )}

        </aside>

        <main className="main-content w-full h-full">
          <header className="header">
            <h1>Admin Dashboard</h1>
          </header>
          {active === "job" && <JobDashboard />}
          {active === "intern" && <InternDashboard />}
          {active === "skills" && <AdminCourse />}

        </main>
      </div>

    </>
  )
}

export default AdminDashboard  
