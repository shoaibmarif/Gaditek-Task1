import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 p-4">
      <ul className="flex justify-center gap-6 text-white">
        <li>
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/tasks" className="hover:text-gray-300">
            Tasks
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
