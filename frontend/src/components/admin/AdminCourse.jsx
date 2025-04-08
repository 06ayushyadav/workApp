import React, {  useState } from 'react'

function AdminCourse() {

  const [skill, setSkill] = useState({
    title: "", description: "",  video: ""
  })

  const handleChange = (event) => {
    setSkill({ ...skill, [event.target.name]: event.target.value });
  };
  

  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, d * 500)
    })
  }

  
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await delay(2);

      const formData = new FormData();
      formData.append("skilltitle", skill.title);
      formData.append("skilldescription", skill.description);
      formData.append("skillvideo", skill.video);
    
      const res = await fetch("http://localhost:3000/api/upload-skill", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (res.ok) {
        alert("Course posted successfully!");
        setSkill({
          title: "",
          description: "",
          video:""
        });
      } else {
        const errorData = await res.json();
        alert("Error: " + errorData.error || "Unknown error");
      }
    } catch (error) {
      alert("Error posting job: " + error.message);
    }
  };

  return (

    <div className='flex justify-center items-center bg-gradient-to-r from-blue-300 to-blue-500 min-h-screen p-4'>

      <div className='w-full max-w-5xl bg-white shadow-xl rounded-2xl p-8'>

        <h1 className='text-3xl font-bold text-center text-blue-600 mb-6'>Post Courses</h1>

        <form action="" className='space-y-5'
          onSubmit={onSubmit}
        >

          <div className='flex items-center border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
          <label className='font-semibold text-xl ' htmlFor='title'>Course Name : </label>
            <input className='w-1/2 mx-2 outline-none text-lg placeholder-gray-500'
              onChange={handleChange}
              type="text"
              name="title"
              id="title"
              value={skill.title}
              placeholder='enter course name'
            />
          </div>

          <div className='flex  border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
          <label className='font-semibold text-xl ' htmlFor='description'>Description : </label>
            <textarea
              className='w-2/3 mx-2 outline-none text-lg placeholder-gray-500  '
              onChange={handleChange}
              type='text'
              name='description'
              id='description'
              value={skill.description}
              placeholder='enter course description'
            >
            </textarea>
          </div>

          <div className='flex  border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
          <label className='font-semibold text-xl ' htmlFor='video'>Full Video of Course : </label>
            <input
              className='w-2/3 mx-2 outline-none text-lg placeholder-gray-500  '
              onChange={handleChange}
              type='text'
              name='video'
              id='video'
              value={skill.video}
              placeholder='enter course video link'
            />           
            
          </div>


          <input className={`w-full bg-blue-600 border-2 text-white text-xl font-semibold py-2 rounded-md     cursor-pointer hover:font-bold hover:cursor-pointer hover:text-blue-600 hover:bg-white hover:border-2 hover:border-blue-600 `}
            type="submit"
            value="Submit"
          />

        </form>
      </div>
    </div>
  )
}

export default AdminCourse
