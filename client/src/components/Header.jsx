import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className="bg-slate-200 shadow-md">
    <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
      <Link to="/" className="font-bold text-2xl text-indigo-600 hover:text-indigo-700">
        Auth App
      </Link>

      <ul className="flex gap-6">
        <li>
          <Link to="/" className="text-sm text-gray-700 hover:text-indigo-600 font-medium">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="text-sm text-gray-700 hover:text-indigo-600 font-medium">
            About
          </Link>
        </li>
        <li>
          <Link to="/signin" className="text-sm text-gray-700 hover:text-indigo-600 font-medium">
            Sign In
          </Link>
        </li>
      </ul>
    </div>
  </div>
  )
}
