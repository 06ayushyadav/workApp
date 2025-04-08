import React from 'react'
import SkillsCard from './SkillsCard'

function Skills() {
    return (
        <div>
            <div>

                <span className="flex justify-center items-center text-5xl md:text-7xl mt-5 font-extrabold text-blue-600 tracking-widest drop-shadow-[4px_2px_10px_rgba(0,0,255,0.5)]">
                    Courses 
                </span>


                <div className="relative overflow-hidden whitespace-nowrap bg-gray-100 p-1 mt-5">
                    <div className="animate-marquee inline-block text-red-600 text-2xl font-bold">
                        Latest Free Courses are here ! &nbsp; 🔥 &nbsp; Learn Now ! &nbsp; 🚀 &nbsp;
                    </div>
                </div>

                <SkillsCard/>

               

            </div>
        </div>
    )
}

export default Skills



