import React, { useState, useEffect } from 'react';

export default function Admin() {
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
  const [users, setUsers] = useState([]);

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from the server
  const fetchUsers = async () => {
    const response = await fetch('http://localhost:5173/api/admin/admin-dashboard'); 
    const data = await response.json();
    setUsers(data);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingUser ? `/api/admin/users/${editingUser._id}` : '/api/admin/users';    
    const method = editingUser ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      setNewUser({ username: '', email: '', password: '' });
      setEditingUser(null);
      fetchUsers(); // Refresh user 
    }
  };

  // Function to handle user deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
      fetchUsers(); 
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-center mb-6">Admin Dashboard</h1>

      {/* Add/Edit User Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">{editingUser ? 'Edit User' : 'Add New User'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter username"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter email"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {editingUser ? 'Update User' : 'Add User'}
          </button>
        </form>
      </div>

      {/* Registered Users Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Username</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td className="px-6 py-4 text-sm text-gray-900">{user.username}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <button
                    onClick={() => {
                      setEditingUser(user);
                      setNewUser({ username: user.username, email: user.email, password: '' });
                    }}
                    className="text-indigo-600 hover:text-indigo-800 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
