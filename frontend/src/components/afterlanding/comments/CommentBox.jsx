import React, { useContext } from 'react'
import { useState } from 'react'
import CommentContext from '../../../context/CommentContext'

function CommentBox() {
    const { addCom } = useContext(CommentContext)
    const [comments, setComments] = useState({
        name: '',
        comment: ""
    })

    const handleChange = (e) => {
        setComments({ ...comments, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        
       
        addCom(comments)

        console.log(comments)

        setComments({
            name: '',
            comment: ''
        })
    }



    return (
        <div>
            <div className='flex '>

                <div className=' bg-white shadow-xl rounded-xl p-2'>

                    <h5 className='text-lg font-bold underline text-left text-blue-600 mb-2'>Comment</h5>

                    <form action="" className='space-y-4'
                        onSubmit={onSubmit}
                    >

                        <div className='flex items-center border-2 border-gray-300 rounded-md px-2 py-1 focus-within:border-blue-600'>
                            <label className='font-bold' htmlFor='name'>Name : </label>
                            <input className=' mx-2 outline-none text-lg placeholder-gray-500'
                                onChange={handleChange}
                                type="text"
                                name="name"
                                id="name"
                                value={comments.name}
                                placeholder='Enter your name'
                            />


                        </div>

                        <div className='flex border-2 border-gray-300 rounded-md px-2 py-1 focus-within:border-blue-600'>
                            <label className='font-bold' htmlFor='comment'>Comment : </label>
                            <textarea
                                className='min-h-24 mx-2 outline-none text-lg placeholder-gray-500  '
                                onChange={handleChange}
                                type='text'
                                name='comment'
                                id='comment'
                                value={comments.comment}
                                placeholder='Enter your comment'
                            >
                            </textarea>
                        </div>


                        <input className={` bg-blue-600 border-2 text-white px-2 py-1 rounded-md  cursor-pointer hover:font-bold hover:cursor-pointer hover:text-blue-600 hover:bg-white hover:border-1 hover:border-blue-600 `}
                            // disabled={submit}
                            type="submit"
                            value="Submit"
                        />

                    </form>
                </div>
            </div>

        </div>
    )
}

export default CommentBox
