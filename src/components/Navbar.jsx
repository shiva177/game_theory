import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">NEXUS Booking App</h1>
        <div>
          <a href="#" className="text-gray-300 hover:text-white mx-4">Dashboard</a>
          <a href="#" className="text-gray-300 hover:text-white mx-4">Schedule</a>
          <a href="#" className="text-gray-300 hover:text-white mx-4">Customers</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
