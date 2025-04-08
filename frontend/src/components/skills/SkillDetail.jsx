// import React, { useContext } from 'react'
// import SkillsContext from '../../context/SkillContext'
// import { useParams } from 'react-router-dom'
// // import { h2, title } from 'framer-motion/client'


// function OpenNow() {

//     const {id}=useParams()
//     const { skills } = useContext(SkillsContext)

//     return (
//         <div className='w-full h-screen bg-slate-200 flex flex-col  items-center mt-10' >

//             <h2 className='mt-10'>Course Details and Tutorial Video</h2>
//             <div className="skills">
//                 {skills.map((skill, index) => (
//                     <div key={index} className='skill'  >
                        
//                         <div className='mt-10'>
//                         <h2>Course Name : {skill.title} </h2>
//                         <h3>About Course : {skill.description}</h3>

//                         </div>

//                         <div className='w-1/2 h-1/2 mt-10'  >
//                             <p>Full Tutorial Video :</p>
//                             <video className=' rounded-lg border-2 border-blue-600 ' src={skill.video} controls ></video>
                           
//                         </div>

                        

//                         {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/h9gxbeEm9-w?si=M5W9JwSWb2e5GIA7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen={true} ></iframe>  */}
//                     </div>

//                 ))}

//             </div>
//             {/* params:{id} */}
//         </div>
        
        

//     )
// }

// export default OpenNow


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SkillDetail() {
    const { id } = useParams();
    const [skill, setSkill] = useState(null);

    useEffect(() => {
        const fetchSkill = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/upload-skill/${id}`);
                const data = await response.json();
                if (data.success) {
                    setSkill(data.skill);
                } else {
                    console.error("Failed to fetch skill");
                }
            } catch (error) {
                console.error("Error fetching skill:", error);
            }
        };

        fetchSkill();
    }, [id]);

    if (!skill) {
        return <p className="text-center mt-10 text-gray-600">Loading skill details...</p>;
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
            <h1 className="text-4xl font-bold mb-5">Course Details</h1>
            <div className="border p-5 mb-5 w-2/3 bg-white rounded-lg shadow-md space-y-3">
                <h2 ><strong className="text-xl  " >Course Title :  </strong> <span className="mt-2 text-gray-950 text-lg font-semibold" >{skill.skilltitle}</span> </h2>
                <p><strong className="text-lg  " > Course Description : </strong> <span className="mt-2 text-gray-900 text-xl">{skill.skilldescription}</span></p>
                <p>
                        <strong className="text-lg">Full Video of Course :</strong>
                        <div className="mt-2">
                            <iframe
                                className="w-full max-w-2xl h-80 rounded-lg shadow-md"
                                src={convertToEmbedURL(skill.skillvideo)}
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

export default SkillDetail;



