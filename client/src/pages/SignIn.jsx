import React, { useState } from 'react'

import {useNavigate} from 'react-router-dom'

import {signInFailure, signInStart, signInSuccess} from '../redux/user/userSlice'

import {useDispatch, useSelector} from 'react-redux'


export default function SignIn() {
  const [formData, setFormData] = useState({})
  const {loading, error} = useSelector((state)=>state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // setError(null)
    // setLoading(true)

    dispatch(signInStart())

    try {
      const res = await fetch('/api/auth/signin', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Stringify the formData
      })

      if (!res.ok) {
        const errorData = await res.json();
        dispatch(signInFailure(errorData.message || 'Server error'));
        return;
      }

      const data = await res.json()

      

      if (data.success === false) {
        // setError("Invalid credentials. Please try again.") // Server-side validation error

        dispatch(signInFailure(data.message))
        return

      } else{

        dispatch(signInSuccess(data))
        navigate('/')

      }


    } catch (error) {
      // setLoading(false)
      // setError("Failed to reach the server. Please check your connection or try again later.")
      dispatch(signInFailure(error))
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
        <form onSubmit={handleSubmit}>
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

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading} // Disable the button during loading
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm">
              New here?{' '}
              <a href="/signup" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Sign Up
              </a>
            </p>
          </div>
        </form>

        {error && (
          <p className="text-red-700 mt-5">{error}</p>
        )}
      </div>
    </div>
  )
}
