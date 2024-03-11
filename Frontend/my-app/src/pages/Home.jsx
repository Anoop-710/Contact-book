import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
      <h1 className="text-3xl font-bold mb-10 text-gray-400">
        Welcome to Contacts Book
      </h1>
      <div>
        <Link to="/register">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Register
          </button>
        </Link>
      </div>

      <div className="mt-4">
        <Link to="/login">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
