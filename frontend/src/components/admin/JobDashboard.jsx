
import React, { useState } from 'react';

function AdminDashboard() {
  const [job, setJob] = useState({
    title: "",
    description: "",
    jobrole: "",
    salary: "",
    jobtype: "",
    skills: "",
    organization: "",
    location: "",
    link: "",
    lastdate: "",
    vlink: "",
  });

  const handleChange = (event) => {
    setJob({ ...job, [event.target.name]: event.target.value });
  };

  const delay = (d) => {
    return new Promise((resolve) => {
      setTimeout(resolve, d * 500);
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await delay(2);

      const formData = new FormData();
      formData.append("jobtitle", job.title);
      formData.append("jobdescription", job.description);
      formData.append("jobrole", job.jobrole);
      formData.append("jobsalary", job.salary);
      formData.append("jobtype", job.jobtype);
      formData.append("jobskill", job.skills);
      formData.append("joborganization", job.organization);
      formData.append("joblocation", job.location);
      formData.append("jobform", job.link);
      formData.append("joblastdate", job.lastdate);
      formData.append("jobvideo", job.vlink);

      const res = await fetch("http://localhost:3000/api/upload-job", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (res.ok) {
        alert("Job posted successfully!");
        setJob({
          title: "",
          description: "",
          jobrole: "",
          salary: "",
          jobtype: "",
          skills: "",
          link: "",
          organization: "",
          location: "",
          lastdate: "",
          vlink: "",
        });
      } else {
        const errorData = await res.json();
        alert("Error: " + errorData.error || "Unknown error");
      }
    } catch (error) {
      alert("Error posting job: " + error.message);
    }
  };


  return (
    <div className='flex justify-center items-center bg-gradient-to-r from-blue-300 to-blue-500 min-h-screen p-4'>
      <div className='w-full max-w-5xl bg-white shadow-xl rounded-2xl p-8'>
        <h1 className='text-3xl font-bold text-center text-blue-600 mb-6'>Enter Job Details</h1>

        <form className='space-y-5' onSubmit={handleSubmit}>
          <div className='flex items-center border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
            <label className='font-semibold text-xl ' htmlFor='title'>Job Title:</label>
            <input className='w-1/2 mx-2 outline-none text-lg placeholder-gray-500'
              onChange={handleChange}
              type="text"
              name="title"
              id="title"
              value={job.title}
              placeholder='Enter job title'
            />
          </div>

          <div className='flex border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
            <label className='font-semibold text-xl ' htmlFor='description'>Job Description:</label>
            <textarea className='w-2/3 mx-2 outline-none text-lg placeholder-gray-500'
              onChange={handleChange}
              name='description'
              id='description'
              value={job.description}
              placeholder='Enter job description'
            />
          </div>

          <div className='flex items-center border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
            <label className='font-semibold text-xl ' htmlFor='jobrole'>Job Role:</label>
            <input className='w-1/2 mx-2 outline-none text-lg placeholder-gray-500'
              onChange={handleChange}
              type='text'
              name='jobrole'
              id='jobrole'
              value={job.jobrole}
              placeholder='Enter job role'
            />
          </div>

          <div className='flex items-center border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
            <label className='font-semibold text-xl ' htmlFor='salary'>Job Salary:</label>
            <input className='w-1/2 mx-2 outline-none text-lg placeholder-gray-500'
              onChange={handleChange}
              type='text'
              name='salary'
              id='salary'
              value={job.salary}
              placeholder='Enter job salary'
            />
          </div>

          <div className='flex items-center border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
            <label className='font-semibold text-xl ' htmlFor='jobtype'>Job Type:</label>
            <input className='w-1/2 mx-2 outline-none text-lg placeholder-gray-500'
              onChange={handleChange}
              type='text'
              name='jobtype'
              id='jobtype'
              value={job.jobtype}
              placeholder='Enter job type (Full-time, Part-time, etc.)'
            />
          </div>

          <div className='flex items-center border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
            <label className='font-semibold text-xl ' htmlFor='skills'>Required Skills:</label>
            <input className='w-1/2 mx-2 outline-none text-lg placeholder-gray-500'
              onChange={handleChange}
              type='text'
              name='skills'
              id='skills'
              value={job.skills}
              placeholder='Enter required skills (comma-separated)'
            />
          </div>

          <div className='flex items-center border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
            <label className='font-semibold text-xl ' htmlFor='organization'>Organization Name: </label>
            <input className='w-1/2 mx-2 outline-none text-lg placeholder-gray-500'
              onChange={handleChange}
              type='text'
              name='organization'
              id='organization'
              value={job.organization}
              placeholder='Enter Name of Organization'
            />
          </div>

          <div className='flex items-center border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
            <label className='font-semibold text-xl ' htmlFor='location'>Job Location:</label>
            <input className='w-1/2 mx-2 outline-none text-lg placeholder-gray-500'
              onChange={handleChange}
              type='text'
              name='location'
              id='location'
              value={job.location}
              placeholder='Enter location of job'
            />
          </div>

          <div className='flex items-center border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
            <label className='font-semibold text-xl ' htmlFor='link'>Apply Link:</label>
            <input className='w-1/2 mx-2 outline-none text-lg placeholder-gray-500'
              onChange={handleChange}
              type='text'
              name='link'
              id='link'
              value={job.link}
              placeholder='Enter application form link'
            />
          </div>

          <div className='flex items-center border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
            <label className='font-semibold text-xl ' htmlFor='lastdate'>Last Date to Apply:</label>
            <input className='w-1/2 mx-2 outline-none text-lg placeholder-gray-500'
              onChange={handleChange}
              type='text'
              name='lastdate'
              id='lastdate'
              value={job.lastdate}
              placeholder='Enter last date for application (DD/MM/YYYY)'
            />
          </div>


          <div className='flex items-center border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
            <label className='font-semibold text-xl ' htmlFor='vlink'>Video link for Form Filling:</label>
            <input className='w-1/2 mx-2 outline-none text-lg placeholder-gray-500'
              onChange={handleChange}
              type='text'
              name='vlink'
              id='vlink'
              value={job.vlink}
              placeholder='Enter video link , how to fill the form'
            />
          </div>



          <input className='w-full bg-blue-600 text-white text-xl font-semibold py-2 rounded-md cursor-pointer hover:text-blue-600 hover:bg-white hover:border-2 hover:border-blue-600'
            type="submit"
            value="Submit"
          />
        </form>

      </div>
    </div>
  );
}

export default AdminDashboard;






