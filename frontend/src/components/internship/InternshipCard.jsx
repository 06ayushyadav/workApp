
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const Card = ({ id, title, skills, salary, org, onDelete }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/delete-internship/${id}`, {
                method: "DELETE",
                credentials: "include",

            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to delete intern.");
            }

            console.log("Internship deleted successfully!");
            onDelete(id); // ✅ Remove from UI after successful deletion
        } catch (error) {
            alert("You are not authorized to delete this internship")
            console.error("Error deleting intern:", error.message);
        }
    };

    return (
        <div className='w-80 h-auto rounded-lg border border-blue-600 mt-5 shadow-xl'>

            <div className='flex justify-start items-center mt-4 mx-3 text-lg'>
                <h2 className="text-xl font-semibold">Internship Title :<span  className="text-gray-800">{title} </span> </h2>
            </div>
            <div className='flex justify-start items-center mt-2 mx-3 text-lg'>
                <h3 className="text-lg font-medium">Internship Skills : <span  className="text-gray-800">{skills} </span> </h3>
            </div>
            <div className='flex justify-start items-center mt-2 mx-3 text-lg'>
                <h3 className="text-lg font-medium">Internship Salary : <span  className="text-gray-800">{salary} </span> </h3>
            </div>
            <div className='flex justify-start items-center mt-2 mx-3 text-lg'>
                <h3 className="text-lg font-medium">Organization : <span  className="text-gray-800">{org} </span> </h3>
            </div>

            <div className='flex justify-center items-center gap-10 mt-5'>
                <Link
                    className='bg-blue-500 rounded-lg px-2 py-1 font-semibold text-white text-base mb-2 hover:text-blue-500 hover:bg-white hover:border-blue-600 border-2'
                    to={`/internship/${id}`}>View Details</Link>


                <button className="mb-3" onClick={handleDelete}>
                <MdDelete className="w-10 h-8 text-blue-600 hover:text-red-600" title="Delete Skill" />
                </button>
            </div>
        </div>
    );
};

function InternshipCard() {

    const [interns, setInterns] = useState([]);

    useEffect(() => {
        fetchIntern();
    }, []);

    const fetchIntern = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/upload-internship", {
                method: "GET",
                credentials: "include",
            });

            const data = await response.json();
            console.log("API Response:", data); // 👀 Check here

            if (data.success && Array.isArray(data.interns)) {
                setInterns(data.interns);
            } else {
                console.error("Failed to fetch interns or interns is not an array");
                setInterns([]);
            }
        } catch (error) {
            console.error("Error fetching interns:", error);
            setInterns([]); 
        }
    };


    const handleDeleteJob = (internId) => {
        setInterns(prevIntern => prevIntern.filter(intern => intern._id !== internId));
    };

    return (
        <div className='flex flex-wrap gap-12 justify-center'>
            {interns.length > 0 ? (
                interns.map((intern) => (
                    <Card key={intern._id} id={intern._id} title={intern.interntitle} skills={intern.internskill} salary={intern.internsalary} org={intern.internorganization} onDelete={handleDeleteJob} />
                ))
            ) : (
                <p className="text-gray-500">No interns added yet</p>
            )}

        </div>
    );
}

export default InternshipCard;



