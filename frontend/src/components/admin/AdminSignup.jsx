import React from 'react'
import { FaUser, FaLock, FaBuilding } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useForm } from "react-hook-form"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import axios from "axios";


function SignUp() {
  const [eye, setEye] = React.useState(false);

  const navigate = useNavigate();
  const loginClick = () => {
    navigate('/employerlogin')
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm()

  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, d * 500)
    })
  }

  const onSubmit = async (data) => {
    await delay(2);
    const res = await axios.post("http://localhost:3000/api/signup", {
      username: data.username,
      email: data.email,
      organization: data.organization,
      password: data.password
    }, {
      withCredentials: true
    });

    console.log(res)
    navigate('/employerlogin')
    reset();

  }

  return (

    <div className='flex justify-center items-center bg-gradient-to-r from-blue-300 to-blue-500 min-h-screen p-4 relative'>

      {isSubmitting && (
        <div className="absolute inset-0 bg-white bg-opacity-5 flex items-center justify-center z-10">
          <Loader />
        </div>
      )}

      <div className={`w-full max-w-md bg-white shadow-xl rounded-2xl p-8 relative ${isSubmitting ? " blur-sm backdrop-brightness-50 pointer-events-none" : ""}`}>
        <h1 className='text-3xl font-bold text-center text-blue-600 mb-6'>Employer Sign Up</h1>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>


          <div className='flex items-center border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
            <FaUser className='text-blue-600 w-6 h-6 mr-2' />
            <input
              className='w-full outline-none text-lg placeholder-gray-500'
              type="text"
              name="username"
              id="username"
              placeholder='Enter your Username'
              {...register("username", { required: true, minLength: { value: 4, message: "Minimum Length is 4" }, maxLength: { value: 20, message: "Maximum Length is 20" } })}
            />
          </div>
          {errors.username && <div>{errors.username.message} </div>}

          <div className='flex items-center border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
            <MdEmail className='text-blue-600 w-6 h-6 mr-2' />
            <input
              className='w-full outline-none text-lg placeholder-gray-500'
              type="text"
              name="email"
              id="email"
              placeholder='Enter your Email Id'
              {...register("email", { required: true })}
            />
          </div>

          <div className='flex items-center border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
            <FaBuilding className='text-blue-600 w-6 h-6 mr-2' />
            <input
              className='w-full outline-none text-lg placeholder-gray-500'
              type="text"
              name="organization"
              id="organization"
              placeholder='Enter your Organization name'
              {...register("organization", { required: "Organization Name is Required" })}
            />
          </div>
          {errors.organization && <div>{errors.organization.message} </div>}

          <div className='flex items-center border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
            <FaLock className='text-blue-600 w-6 h-6 mr-2' />
            <input
              className='w-full outline-none text-lg placeholder-gray-500'
              type={eye ?"text ":"password"}
              name="password"
              id="password"
              placeholder='Set your Password'
              {...register("password", { required: true, pattern: { minLength: { value: 6, message: "Minimum Length is 6" }, maxLength: { value: 20, message: "Maximum Length is 20" } } })}
            />

            <button onClick={()=>setEye(!eye)}>
              {eye ? <FaRegEye className='text-blue-600 w-6 h-6' /> : <FaRegEyeSlash className='text-blue-600 w-6 h-6' />}
            </button>

          </div>
          {errors.password && <div>{errors.password.message} </div>}

          <div>
            <input
              className={`w-full bg-blue-600 border-2 text-white text-xl font-semibold py-2 rounded-md cursor-pointer
          hover:font-bold hover:text-blue-600 hover:bg-white hover:border-2 hover:border-blue-600`}
              disabled={isSubmitting}
              type="submit"
              value="Sign Up"
            />
          </div>
        </form>

        <p className="text-lg mt-4 flex justify-center items-center">
          If you have already an Account 
          <button onClick={loginClick} className="text-blue-600 underline-offset-auto mx-2 font-bold"> LogIn</button>
        </p>
      </div>
    </div>

  )
}

export default SignUp;

