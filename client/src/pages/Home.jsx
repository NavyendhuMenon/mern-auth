import React from 'react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-blue-800 text-white py-6 text-center">
        <h1 className="text-3xl font-semibold">Welcome to the Home Page</h1>
      </header>
      
      {/* Main Content */}
      <section className="flex-1 px-4 py-8 text-center">
        <p className="text-lg mb-6">This is the home page of your website. You can customize it to fit your needs!</p>
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-4 text-center">
        <p>&copy; 2025 Your Company</p>
      </footer>
    </div>
  );
}
