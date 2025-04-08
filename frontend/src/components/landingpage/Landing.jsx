
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

function Landing() {
    const [textIndex, setTextIndex] = useState(0);
    const textArray = [
        "Matching Jobs...",
        "Connecting with Companies...",
        "Your Dream Job Awaits!",
        "Your Dream Internship Awaits!",
        "Free Courses are available, Learn new skills...",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='bg-gray-50 h-fit py-20 px-5 md:px-10 lg:px-20 text-center'>
            {/* Top section */}
            <div className='flex flex-col md:flex-row justify-between items-center gap-10'>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className='flex flex-col text-center md:text-left'
                >
                    <h1 className='text-blue-600 text-4xl md:text-6xl font-bold drop-shadow-lg'>Find</h1>
                    <h1 className='text-blue-600 text-4xl md:text-6xl font-bold drop-shadow-lg'>Your First Job Here!</h1>

                    <motion.p
                        key={textIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className='text-red-600 md:text-2xl mt-5 font-semibold italic'
                    >
                        {textArray[textIndex]}
                    </motion.p>


                    <div className='mt-6 flex flex-col sm:flex-row gap-4'>
                        <NavLink to="/job">
                            <button className='bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-300'>
                                Explore Jobs
                            </button>
                        </NavLink>
                        <NavLink to="/internship">
                            <button className='bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-all duration-300'>
                                Find Internships
                            </button>
                        </NavLink>
                    </div>
                </motion.div>

                <div >
                    <div className='relative w-96 h-96 overflow-hidden rounded-full shadow-2xl'>
                        <img className='w-full h-full' src="\homepic.png"
                            alt="Job Search" />
                    </div>
                </div>



            </div>

            <div className='mt-20'>
                <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-6'>Why Choose Work Finder?</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300'>
                        <h3 className='text-lg font-semibold mb-2 text-blue-600'>Verified Listings</h3>
                        <p className='text-gray-600'>All job and internship posts are screened to avoid spam and fraud.</p>
                    </div>
                    <div className='bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300'>
                        <h3 className='text-lg font-semibold mb-2 text-green-600'>Free Learning</h3>
                        <p className='text-gray-600'>Access free courses and resources to upskill and boost your career.</p>
                    </div>
                    <div className='bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300'>
                        <h3 className='text-lg font-semibold mb-2 text-purple-600'>One-Click Apply</h3>
                        <p className='text-gray-600'>Apply for jobs and internships with a single click from your dashboard.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;

