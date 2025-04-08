
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";


const Card = ({ id, title, description, onDelete }) => {
    const handleDelete = async () => { 
        try {
            const response = await fetch(`http://localhost:3000/api/delete-skill/${id}`, {
                method: "DELETE",
                credentials: "include",
            
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to delete skills.");
            }

            console.log("Course deleted successfully!");
            onDelete(id); // ✅ Remove from UI after successful deletion
        } catch (error) {
            alert("You are not authorized to delete this course")
            console.error("Error deleting skills:", error.message);
        }
    };

    return (
        <div className='w-80 h-auto rounded-lg border border-blue-600 mt-5 shadow-xl'>
            
            <div className='flex justify-start items-center mt-4 mx-3 text-lg'>
                <h2 className="text-xl font-semibold">Course Title : <span  className="text-gray-800">{title} </span> </h2>
            </div>
            <div className='flex justify-start items-center mt-2 mx-3 text-lg  '>
                <h3 className="text-lg font-medium">Course Description : <p  className="text-gray-800  h-20 overflow-auto scrollbar-hide ">{description} </p> </h3>
            </div>
            
            
            <div className='flex justify-center items-center gap-10 mt-5'>
                <Link
                    className='bg-blue-500 rounded-md px-1 py-1 font-semibold text-white text-base mb-2 hover:text-blue-500 hover:bg-white hover:border-blue-600 border-2'
                    to={`/skills/${id}`}>View Details</Link>

                
                <button className="mb-2 " onClick={handleDelete}>
                    <MdDelete className="w-10 h-8 text-blue-600 hover:text-red-600" title="Delete Skill" />
                </button>
            </div>
        </div>
    );
};




function skillCard() {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        fetchSkill();
    }, []);

    const fetchSkill = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/upload-skill");
            const data = await response.json();
            if (data.success) {
                setSkills(data.skills);
            } else {
                console.error("Failed to fetch skills");
            }
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    };

    const handleDeleteSkill = (skillId) => {
        setSkills(prevSkill => prevSkill.filter(skill => skill._id !== skillId));
    };


    

    return (
        <div className='flex flex-wrap gap-12 justify-center'>
            {skills.length > 0 ? (
                skills.map((skill, index) => (
                    <Card key={index} id={skill._id}  title={skill.skilltitle} description={skill.skilldescription}  onDelete={handleDeleteSkill} />
                ))
            ) : (
                <p className="text-gray-500">No skills added yet</p>
            )}
        </div>
    );
}

export default skillCard;





