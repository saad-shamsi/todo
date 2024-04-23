"use client";
import { withAuthenticator } from "@aws-amplify/ui-react";
import React from "react";

const Navbar = ({ signOut, user }) => {
  return (
    <nav className="px-7 w-full py-5 bg-yellow-300 text-black">
      <div className="flex justify-between items-center">
        <div className=" text-black font-bold text-3xl">TODO-Amplify</div>
        <ul className="flex flex-wrap gap-x-10  items-center">
          <button onClick={signOut} className="bg-blue-400 rounded-lg p-3">
            Sign out
          </button>
          <li>home</li>
          <li>about</li>
          <li>contact</li>
          <li>todos</li>
        </ul>
      </div>
    </nav>
  );
};

export default withAuthenticator(Navbar);
