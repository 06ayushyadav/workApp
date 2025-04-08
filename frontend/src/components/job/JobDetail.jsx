import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function JobDetail() {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/upload-job/${id}`);
                const data = await response.json();
                if (data.success) {
                    setJob(data.job);
                } else {
                    console.error("Failed to fetch job");
                }
            } catch (error) {
                console.error("Error fetching job:", error);
            }
        };

        fetchJob();
    }, [id]);

    if (!job) {
        return <p className="text-center mt-10 text-gray-600">Loading job details...</p>;
    }

    const convertToEmbedURL = (url) => {
        if (!url) return "";

        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w\-]{11})/;
        const match = url.match(regex);

        if (match && match[1]) {
            return `https://www.youtube.com/embed/${match[1]}`;
        }

        return "";
    };

    return (
        <div className="flex flex-col items-center justify-center mt-10">
            <h1 className="text-4xl font-bold mb-5">Job Details</h1>
            <div className="border p-5 mb-5 w-2/3 bg-white rounded-lg shadow-md space-y-3">
                <h2 ><strong className="text-xl  " >Job Title :  </strong> <span className="mt-2 text-gray-950 text-lg font-semibold" >{job.jobtitle}</span> </h2>
                <p><strong className="text-lg  " > Job Skills : </strong> <span className="mt-2 text-gray-900 text-xl">{job.jobskill}</span></p>
                <p><strong className="text-lg  " >Job Salary : </strong> <span className="mt-2 text-gray-900 text-xl">{job.jobsalary}</span></p>
                <p><strong className="text-lg  " >Job Role : </strong> <span className="mt-2 text-gray-900 text-xl">{job.jobrole}</span></p>
                <p><strong className="text-lg  " >Job Type : </strong> <span className="mt-2 text-gray-900 text-xl">{job.jobtype}</span></p>
                <p><strong className="text-lg  " >Organization Name :</strong> <span className="mt-2 text-gray-900 text-xl">{job.joborganization}</span></p>
                <p><strong className="text-lg  " >Job Location :</strong> <span className="mt-2 text-gray-900 text-xl">{job.joblocation}</span></p>
                <p><strong className="text-lg  " >Last Date to Apply :</strong> <span className="mt-2 text-gray-900 text-xl">{job.joblastdate}</span></p>

                <p><strong className="text-lg  ">Job Description : </strong> <span className="mt-2 text-gray-900 text-xl">{job.jobdescription}</span></p>
                <p><strong className="text-lg  " > Fill Form : </strong><a href={job.jobform} target="_blank" rel="noreferrer" className="text-blue-500 underline text-xl ">Apply Now</a></p>
                <p>
                    <strong className="text-lg">Video link for Form Filling:</strong>
                    <div className="mt-2">
                        <iframe
                            className="w-full max-w-2xl h-80 rounded-lg shadow-md"
                            src={convertToEmbedURL(job.jobvideo)}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        >video</iframe>
                    </div>
                </p>



            </div>
        </div>
    );
}

export default JobDetail;