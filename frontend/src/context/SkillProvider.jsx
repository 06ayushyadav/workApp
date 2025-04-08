import React, { useState } from 'react'
import SkillsContext from './SkillContext'

function SkillsProvider({ children }) {

    const [skills, setSkills] = useState([])

    const addSkill = (skill) => {
        setSkills((prevSkill) => [...prevSkill, skill])
    }

    return (
        <div>
            <SkillsContext.Provider value={{ skills,addSkill }} >
                {children}
            </SkillsContext.Provider>

        </div>
    )
}

export default SkillsProvider

