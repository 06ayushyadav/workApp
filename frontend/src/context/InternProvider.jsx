import React, { useState } from 'react'
import InternContext from './InternContext'

function InternProvider({children}) {
    const [interns, setInterns] = useState([]);

    const addIntern = (intern) => {
        setInterns((prevIntern) => [...prevIntern, intern])
    }

    return (
        <div>
            <InternContext.Provider value={{interns,addIntern}}>
                {children}

            </InternContext.Provider>
        </div>
    )
}

export default InternProvider
