import React, { useState,useEffect } from 'react'
import CommentContext from '../context/CommentContext'

function CommentProvider({children}) {
    
    const [comments, setComments] = useState(() => {
        return JSON.parse(localStorage.getItem("comments")) || [];
    });

    const addCom = (comment) => {
        setComments((prevComments) => {
            const updatedComments = [...prevComments, comment];
            localStorage.setItem("comments", JSON.stringify(updatedComments)); // Save immediately
            return updatedComments;
        });
    };

    return (
        <div>
            <CommentContext.Provider value={{comments, addCom}}>
                {children}

            </CommentContext.Provider>
        </div>
    )
}

export default CommentProvider
