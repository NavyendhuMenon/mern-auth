import React, { useState } from 'react'
import { data } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


export default function SignUp() {

  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)

  const navigate = useNavigate()


  const handleChange =(e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})

  }
  
  const handleSubmit = async (e)=>{

    e.preventDefault()
    try{

      setLoading(true)

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(formData), 
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Server error');
      }
  
       setSuccessMessage('Sign-up successful! You can now sign in.');

       setTimeout(() => {
         navigate('/signin');
       }, 2000);
 
       setError(null);
       setLoading(false);

    }catch(error){

      setLoading(false)

      setError("Failed to reach the server. Please check your connection or try again later.");

    }
    

  }
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your username" 
            onChange={handleChange}
               
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email" 
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your password" 
            onChange={handleChange}
          />
        </div>

        <button disabled={loading}
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {loading? 'Loading....' : 'Sign Up'}
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Have an account?{' '}
            <a href="/signin" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Sign In
            </a>
          </p>
        </div>
      </form>
      {successMessage && (
          <p className="text-green-600 text-center mt-4">{successMessage}</p> // Success message
        )}
      <p className='text-red-700 mt-5'>{error && "Something went wrong"}</p>
    </div>
  </div>
  )
}
