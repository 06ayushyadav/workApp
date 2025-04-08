
import React from 'react';
import CommentBox from '../afterlanding/comments/CommentBox';
import { FaLinkedin, FaGithub } from 'react-icons/fa'; // 🔥 icons added
import { NavLink } from 'react-router-dom';

function Footer() {
    return (
        <div className='bg-gray-500'>
            <div className='min-h-80 bg-gray-500 py-10 text-white px-4'>
                <div className='flex flex-col md:flex-row justify-evenly items-start md:items-center gap-10 flex-wrap'>

                    
                    <div className='w-full md:w-[30%] text-black'>
                        <CommentBox />
                    </div>
                    <div className='w-full md:w-[30%] flex flex-col md:flex-row justify-between gap-9 font-semibold text-center md:text-left'>
                        <ul className="w-full">
                            <p className='text-xl mb-3'>Company Details</p>
                            <li className='hover:underline text-yellow-50'><NavLink to="/about">
                                                        <button className='hover:underline'>
                                                            About
                                                        </button>
                                                    </NavLink></li>
                            <li className='hover:underline text-yellow-50'><a href="#">Services</a></li>
                            {/* <li className='hover:underline text-yellow-50'><a href="#">Privacy Policy</a></li> */}
                        </ul>

                        <ul className="w-full">
                            <p className='text-xl mb-3'>Get In Touch</p>
                            <li className='text-yellow-50'>📧 :
                                <a className='hover:underline mx-2' href="mailto:ayushyadavrj82@gmail.com">ayushyadavrj82@gmail.com</a>
                            </li>
                            <li className='text-yellow-50'>📞 :
                                <a className='hover:underline mx-2' href="tel:985203156421">985203156421</a>
                            </li>
                            <li className='text-yellow-50'>Add:
                                <span className='hover:underline mx-1'>Mumbai, Maharashtra</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className='w-full md:w-[30%] mb-10 flex flex-col items-center'>
                        <ul>
                            <p className='text-xl mb-3'>Social Media</p>

                            <li className='text-yellow-50 flex items-center mb-2'>
                                <FaLinkedin className='mr-2 text-2xl' />
                                <a
                                    href="https://www.linkedin.com/in/ayush-yadav-84198626b"
                                    className='hover:underline'
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    LinkedIn
                                </a>
                            </li>

                            <li className='text-yellow-50 flex items-center mb-2'>
                                <FaGithub className='mr-2 text-2xl' />
                                <a
                                    href="https://github.com/06ayushyadav"
                                    className='hover:underline'
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    GitHub
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='flex items-center justify-center mt-10 text-white pb-5 text-sm md:text-lg text-center'>
                    &copy; Copyright 2024-2025 : All rights reserved
                </div>
            </div>
        </div>
    );
}

export default Footer;


