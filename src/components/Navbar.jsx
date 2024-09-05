import React from 'react';
import logo from '../assets/logo.png'
const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-white shadow-md p-4 text-gray-950">
      <div className="flex items-center space-x-4">
      <img src={logo} alt="Wallet Logo" className="h-14 w-28" />
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-1 rounded border border-gray-300"
        />
      </div>
      <ul className="flex space-x-4 font-medium ">
        <li>Overview</li>
        <li className="text-blue-500">Finance</li>
        <li>Calendar</li>
        <li>Events</li>
      </ul>
    </nav>
  );
};

export default Navbar;
