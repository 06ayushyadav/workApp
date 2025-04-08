

import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; 

function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    const handleEmployerClick = () => {
        if (isAuthenticated) {
            navigate('/employerdashboard');
        } else {
            navigate('/employerlogin');
        }
        setIsMobileMenuOpen(false); // close on click
    };

    const handleNavClick = () => {
        setIsMobileMenuOpen(false); // close when any link clicked
    };

    return (
        <div className='bg-blue-200 p-4'>
            <div className='flex justify-between items-center max-w-6xl mx-auto px-4'>

                {/* Logo */}
                {/* <h1 class="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-widest drop-shadow-lg">
  Work<span class="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.75)]"> Finder</span>
</h1> */}

<h1 class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 tracking-wider">
  Work Finder
</h1>


                <div className='hidden lg:flex gap-8 items-center'>
                    <NavLink to="/" onClick={handleNavClick} className={({ isActive }) => isActive ? "active-link  bg-blue-600 text-white  px-2 rounded-md font-semibold  " : "hover:underline hover:font-semibold"}>Home</NavLink>


                    <NavLink to="/job" onClick={handleNavClick} className={({ isActive }) => isActive ? "active-link  bg-blue-600 text-white  px-2 rounded-md font-semibold  " : "hover:underline hover:font-semibold"}
                    > Job</NavLink>


                    <NavLink to="/internship" onClick={handleNavClick} className={({ isActive }) => isActive ? "active-link  bg-blue-600 text-white  px-2 rounded-md font-semibold  " : "hover:underline hover:font-semibold"}>Internship</NavLink>
                    <NavLink to="/skills" onClick={handleNavClick} className={({ isActive }) => isActive ? "active-link  bg-blue-600 text-white  px-2 rounded-md font-semibold  " : "hover:underline hover:font-semibold"}>Free Courses</NavLink>

                    <button onClick={handleEmployerClick} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        {isAuthenticated ? "Employer Dashboard" : "Employer Login"}
                    </button>
                </div>

                <div className='lg:hidden'>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>


            <div
                className={`fixed top-0 left-0 h-full w-64 bg-blue-100 shadow-lg z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 ease-in-out lg:hidden`}
            >
                <div className='p-5 flex flex-col gap-6 font-semibold text-xl text-blue-900'>
                    <button className='self-end' onClick={() => setIsMobileMenuOpen(false)}>
                        <X size={24} />
                    </button>

                    <NavLink to="/" onClick={handleNavClick} className="hover:underline">Home</NavLink>
                    <NavLink to="/job" onClick={handleNavClick} className="hover:underline">Job</NavLink>
                    <NavLink to="/internship" onClick={handleNavClick} className="hover:underline">Internship</NavLink>
                    <NavLink to="/skills" onClick={handleNavClick} className="hover:underline">Free Courses</NavLink>

                    <button onClick={handleEmployerClick} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        {isAuthenticated ? "Employer Dashboard" : "Employer Login"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;




