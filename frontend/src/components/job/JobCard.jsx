
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";


const Card = ({ id, title, skills,salary,org, onDelete }) => {
    const handleDelete = async () => { 
        try {
            const response = await fetch(`http://localhost:3000/api/delete/${id}`, {
                method: "DELETE",
                credentials: "include",
            
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to delete job.");
            }

            console.log("Job deleted successfully!");
            onDelete(id); 
        } catch (error) {
            alert("You are not authorized to delete this job")
            console.error("Error deleting job:", error.message);
        }
    };

    return (
        <div className='w-80 h-auto rounded-lg shadow-lg border border-blue-600 mt-5 '>
            

            <div className='flex justify-start items-center mt-4 mx-3 text-lg'>
                <h2 className="text-xl font-semibold">Job Title : <span className="text-gray-800">{title}</span></h2>
            </div>
            <div className='flex justify-start items-center mt-2 mx-3 text-lg'>
                <h3 className="text-lg font-medium">Job Skills :<span  className="text-gray-800"> {skills}</span> </h3>
            </div>
            <div className='flex justify-start items-center mt-2 mx-3 text-lg'>
                <h3 className="text-lg font-medium">Job Salary : <span className="text-gray-800">{salary}</span> </h3>
            </div>
            <div className='flex justify-start items-center mt-2 mx-3 text-lg'>
                <h3 className="text-lg font-medium">Organization : <span className="text-gray-800">{org}</span> </h3>
            </div>

            <div className='flex justify-center items-center gap-10 mt-5'>
                <Link
                    className='bg-blue-500 rounded-lg px-2 py-1 font-semibold text-white text-base mb-2 hover:text-blue-500 hover:bg-white hover:border-blue-600 border-2'
                    to={`/job/${id}`}>View Details</Link>

                
                <button className="mb-3" onClick={handleDelete}>
                <MdDelete className="w-10 h-8 text-blue-600 hover:text-red-600" title="Delete Skill" />
                </button>
            </div>
        </div>
    );
};

function JobCard() {
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/upload-job");
            const data = await response.json();
            if (data.success) {
                setJobs(data.jobs);
            } else {
                console.error("Failed to fetch jobs");
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    const handleDeleteJob = (jobId) => {
        setJobs(prevJobs => prevJobs.filter(job => job._id !== jobId));
    };

    return (
        <div className='flex flex-wrap gap-12 justify-center'>
            {jobs.length > 0 ? (
                jobs.map((job, index) => (
                    <Card key={index} id={job._id}  title={job.jobtitle} skills={job.jobskill} salary={job.jobsalary} org={job.joborganization}   onDelete={handleDeleteJob} />
                ))
            ) : (
                <p className="text-gray-500">No jobs added yet</p>
            )}
        </div>
    );
}

export default JobCard;


