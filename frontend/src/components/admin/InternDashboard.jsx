import React, {  useState } from 'react'

function InternDashboard() {

    const [interns, setInterns] = useState({
        title: "", description: "", jobrole: "", salary: "", jobtype: "", skills: '', link: "", organization: "",
        location: "",
        lastdate: "",
        vlink: "",
    })

    const handleChange = (event) => {
        setInterns({ ...interns, [event.target.name]: event.target.value })
    }

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
          formData.append("interntitle", interns.title);
          formData.append("interndescription", interns.description);
          formData.append("internrole", interns.jobrole);
          formData.append("internsalary", interns.salary);
          formData.append("interntype", interns.jobtype);
          formData.append("internskill", interns.skills);
          formData.append("internorganization", interns.organization);
          formData.append("internlocation", interns.location);
          formData.append("internform", interns.link);
          formData.append("internlastdate", interns.lastdate);
          formData.append("internvideo", interns.vlink);
    
          const res = await fetch("http://localhost:3000/api/upload-internship", {
            method: "POST",
            body: formData,
            credentials: "include",
          });
    
          if (res.ok) {
            alert("Internship posted successfully!");
            setInterns({
                title: "", description: "", jobrole: "", salary: "", jobtype: "", skills: '', link: "", organization: "",
                location: "",
                lastdate: "",
                vlink: "",
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

                <h1 className='text-3xl font-bold text-center text-blue-600 mb-6'>Enter Internship Details</h1>

                <form action="" className='space-y-5'
                    onSubmit={onSubmit}
                >

                    <div className='flex items-center border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
                    <label className='font-semibold text-xl ' htmlFor='title'>Internship Title : </label>
                        <input className='w-2/3 mx-2 outline-none text-lg placeholder-gray-500'
                            onChange={handleChange}
                            type="text"
                            name="title"
                            id="title"
                            value={interns.title}
                            placeholder='enter internship title'
                        />


                    </div>

                    <div className='flex  border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
                          <label className='font-semibold text-xl ' htmlFor='description'>Intership Description : </label>

                        <textarea
                            className='w-2/3 mx-2 outline-none text-lg placeholder-gray-500  '
                            onChange={handleChange}
                            type='text'
                            name='description'
                            id='description'
                            value={interns.description}
                            placeholder='enter internship description'
                        >
                        </textarea>
                    </div>

                    <div className='flex items-center border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
                    <label className='font-semibold text-xl ' htmlFor='jobrole'>Internship Role : </label>

                        <input
                            className='w-2/3 mx-2 outline-none text-lg placeholder-gray-500  '
                            onChange={handleChange}
                            type='text'
                            name='jobrole'
                            id='jobrole'
                            value={interns.jobrole}
                            placeholder='enter intern role'
                        />
                    </div>

                    <div className='flex items-center border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
                    
                        <label className='font-semibold text-xl ' htmlFor='salary'>Stippend : </label>
                        <input
                            className='w-2/3 mx-2 outline-none text-lg placeholder-gray-500  '
                            onChange={handleChange}
                            type='text'
                            name='salary'
                            id='salary'
                            value={interns.salary}
                            placeholder='enter internship stippend'
                        />
                    </div>

                    <div className='flex items-center border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
                    <label className='font-semibold text-xl ' htmlFor='jobtype'>Internship Type : </label>

                        <input
                            className='w-2/3 mx-2 outline-none text-lg placeholder-gray-500  '
                            onChange={handleChange}
                            type='text'
                            name='jobtype'
                            id='jobtype'
                            value={interns.jobtype}
                            placeholder='enter internship type full time / part time '
                        />
                    </div>

                    <div className='flex items-center border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
                    <label className='font-semibold text-xl ' htmlFor='skills'>Required Skills : </label>

                        <input
                            className='w-2/3 mx-2 outline-none text-lg placeholder-gray-500  '
                            onChange={handleChange}
                            type='text'
                            name='skills'
                            id='skills'
                            value={interns.skills}
                            placeholder='enter  required skills'
                        />
                    </div>

                    <div className='flex items-center border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
                    <label className='font-semibold text-xl ' htmlFor='link'>Form Link : </label>

                        <input
                            className='w-1/2 mx-2 outline-none text-lg placeholder-gray-500  '
                            onChange={handleChange}
                            type='text'
                            name='link'
                            id='link'
                            value={interns.link}
                            placeholder='enter internship form link'
                        />
                    </div>

                    <div className='flex items-center border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
                    <label className='font-semibold text-xl ' htmlFor='organization'>Organization Name: </label>

                        <input
                            className='w-1/2 mx-2 outline-none text-lg placeholder-gray-500  '
                            onChange={handleChange}
                            type='text'
                            name='organization'
                            id='organization'
                            value={interns.organization}
                            placeholder='enter organization name'
                        />
                    </div>

                    <div className='flex items-center border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
                    <label className='font-semibold text-xl ' htmlFor='location'>Internship Location : </label>

                        <input
                            className='w-1/2 mx-2 outline-none text-lg placeholder-gray-500  '
                            onChange={handleChange}
                            type='text'
                            name='location'
                            id='location'
                            value={interns.location}
                            placeholder='enter internship location'
                        />
                    </div>

                    <div className='flex items-center border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
                    <label className='font-semibold text-xl ' htmlFor='lastdate'>Last date of Apply : </label>

                        <input
                            className='w-1/2 mx-2 outline-none text-lg placeholder-gray-500  '
                            onChange={handleChange}
                            type='text'
                            name='lastdate'
                            id='lastdate'
                            value={interns.lastdate}
                            placeholder='enter last date of apply'
                        />
                    </div>

                    <div className='flex items-center border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
                    <label className='font-semibold text-xl ' htmlFor='vlink'>Video for Form Filling: </label>

                        <input
                            className='w-1/2 mx-2 outline-none text-lg placeholder-gray-500  '
                            onChange={handleChange}
                            type='text'
                            name='vlink'
                            id='vlink'
                            value={interns.vlink}
                            placeholder='enter video link for form filling'
                        />
                    </div>


                    

                    <input className={`w-full bg-blue-600 border-2 text-white text-xl font-semibold py-2 rounded-md     cursor-pointer hover:font-bold hover:cursor-pointer hover:text-blue-600 hover:bg-white hover:border-2 hover:border-blue-600 `}
                        // disabled={submit}
                        type="submit"
                        value="Submit"
                    />

                </form>
            </div>
        </div>
    )
}

export default InternDashboard





