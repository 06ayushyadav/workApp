import React from 'react';

function About() {
  return (
    <div className="bg-white min-h-screen p-6 md:p-10 text-gray-800">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          About Us
        </h1>
        
        <p className="mb-4">
          Welcome to <span className="font-semibold">Work Finder</span> — your one-stop platform for finding jobs, internships, and free courses.
        </p>
        
        <p className="mb-4">
          Our goal is to help students and freshers get started with their careers by connecting them with the right opportunities.
        </p>

        <p className="mb-4">
          We also offer a dedicated employer dashboard where companies can post jobs and find suitable candidates.
        </p>

        <p>
          📧 Contact us: <a href="mailto:ayushyadavrj82@gmail.com" className="text-blue-600 underline">ayushyadavrj82@gmail.com</a>
        </p>
      </div>
    </div>
  );
}

export default About;
