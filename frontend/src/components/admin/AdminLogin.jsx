
import React from 'react';
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import axios from 'axios';

function Login({ setAuth }) {
    const navigate = useNavigate();
    const [eye, setEye] = React.useState(false);

    const signupClick = () => {
        navigate('/employersignup');
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm({ mode: "onChange" });

    const delay = (d) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, d * 500)
        })
    }


    const handleLogin = async (data) => {
        await delay(3)
        try {
            const res = await axios.post("http://localhost:3000/api/login", data, {
                withCredentials: true
            });

            console.log("Server Response:", JSON.stringify(res.data, null, 2));

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                console.log("✅ Token Saved in Local Storage:", localStorage.getItem("token"));

                setAuth(true);
                // alert("Login successful!");
                navigate('/employerdashboard');
            } else {
                alert("Invalid credentials, please try again!");
            }

        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please check your credentials and try again.");
        }
        reset();
    };


    return (
        <div className='flex justify-center items-center bg-gradient-to-r from-blue-300 to-blue-500 min-h-screen p-4 relative'>
            {isSubmitting && (
                <div className="absolute inset-0 bg-white bg-opacity-5 flex items-center justify-center z-10">
                    <Loader />
                </div>
            )}

            <div className={`w-full max-w-md bg-white shadow-xl rounded-2xl p-8 ${isSubmitting ? " blur-sm backdrop-brightness-50 pointer-events-none" : ""}`}>

                <h1 className='text-3xl font-bold text-center text-blue-600 mb-6'>Employer Log IN</h1>

                <form className='space-y-5' onSubmit={handleSubmit(handleLogin)}>
                    <div className='flex items-center border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
                        <MdEmail className='text-blue-600 w-6 h-6 mr-2' />
                        <input
                            className='w-full outline-none text-lg placeholder-gray-500'
                            type="email"
                            placeholder='Enter your Email Id'
                            {...register("email", { required: true })}
                        />
                    </div>

                    <div className='flex items-center border-2 border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-600'>
                        <FaLock className='text-blue-600 w-6 h-6 mr-2' />
                        <input
                            className='w-full outline-none text-lg placeholder-gray-500'
                            type={eye ? "text" : "password"}


                            placeholder='Enter your Password'
                            {...register("password", { required: true, minLength: 6, maxLength: 20 })}
                        />

                        <button onClick={()=>setEye(!eye)}>
                            {eye ? <FaRegEye className='text-blue-600 w-6 h-6' /> : <FaRegEyeSlash className='text-blue-600 w-6 h-6' />}
                        </button>

                    </div>
                    {errors.password && <div>{errors.password.message} </div>}


                    <input
                        className="w-full bg-blue-600 text-white text-xl font-semibold py-2 rounded-md cursor-pointer hover:bg-white hover:border-blue-600 hover:border-2 hover:text-blue-600"
                        disabled={isSubmitting}
                        type="submit"
                        value="Log In"
                    />
                </form>

                <p className="text-lg mt-4 flex justify-center">
                    If you don’t have an Account
                    <button onClick={signupClick} className="text-blue-600 mx-2 font-bold"> SignUp</button>
                </p>
            </div>
        </div>
    );
}

export default Login;








