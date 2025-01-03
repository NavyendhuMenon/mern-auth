import React from 'react'

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-green-800 text-white py-6 text-center">
        <h1 className="text-3xl font-semibold">About Us</h1>
      </header>

      {/* Main Content */}
      <section className="flex-1 px-4 py-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
        <p className="text-lg mb-6">
          We are a team of passionate individuals committed to making a difference.
          Our goal is to create products that provide value and improve lives.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg">
          Our mission is to deliver high-quality solutions that inspire innovation
          and foster a culture of creativity, collaboration, and excellence.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-4 text-center">
        <p>&copy; 2025 Your Company</p>
      </footer>
    </div>
  );
}