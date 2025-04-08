import React, { useState } from 'react'
import JobContext from './JobContext'

function JobProvider({ children }) {

    const [jobs, setJobs] = useState([])

    const addJob = (job) => {
        setJobs((prevJobs) => [...prevJobs, job])
    }

    return (
        <div>
            <JobContext.Provider value={{ jobs, addJob }} >
                {children}
            </JobContext.Provider>

        </div>
    )
}

export default JobProvider

