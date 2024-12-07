import React from "react";
import Logout from "./Logout";

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  return (
    <nav className="bg-gray-900 p-4 shadow-md border-b-2 border-neutral-400">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-white text-2xl font-bold">
          NotesApp
        </a>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-8">
          <li>
            <a
              href="/"
              className="text-gray-300 hover:text-white transition-colors">
              Home
            </a>
          </li>
          <li>
            <a
              href="/todos/add"
              className="text-gray-300 hover:text-white transition-colors">
              Add Todo
            </a>
          </li>
          {/* Conditionally render Login/Signup or Logout */}
          {!isAuthenticated ? (
            <>
              <li>
                <a
                  href="/login"
                  className="text-gray-300 hover:text-white transition-colors">
                  Login
                </a>
              </li>
              <li>
                <a
                  href="/signup"
                  className="text-gray-300 hover:text-white transition-colors">
                  Signup
                </a>
              </li>
            </>
          ) : (
            <li>
              <Logout setIsAuthenticated={setIsAuthenticated} />
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-gray-300 focus:outline-none"
            onClick={() =>
              document.getElementById("mobile-menu").classList.toggle("hidden")
            }>
            {/* Icon for Mobile Menu */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Links */}
      <div
        id="mobile-menu"
        className="md:hidden bg-gray-800 px-4 py-2 hidden space-y-2">
        <a
          href="/todos/add"
          className="block text-gray-300 hover:text-white transition-colors">
          Add Todo
        </a>
        {!isAuthenticated ? (
          <>
            <a
              href="/login"
              className="block text-gray-300 hover:text-white transition-colors">
              Login
            </a>
            <a
              href="/signup"
              className="block text-gray-300 hover:text-white transition-colors">
              Signup
            </a>
          </>
        ) : (
          <Logout setIsAuthenticated={setIsAuthenticated} />
        )}
      </div>
    </nav>
  );
};

export default Header;
