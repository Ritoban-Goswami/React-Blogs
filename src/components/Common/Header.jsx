import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="home-header flex justify-between items-center mb-16">
      <Link to={"/"} className="flex items-center">
        <img
          className="w-1/6"
          src="/blogscape-low-resolution-logo-color-on-transparent-background.png"
          alt="BlogScape"
        />
      </Link>

      <ul className="font-bold flex items-center justify-evenly w-2/6">
        <li>
          <Link className="hover:text-green-600" to={"/edit-blog/new"}>
            Add Blog
          </Link>
        </li>
        <li>
          <Link className="hover:text-green-600" to={"/"}>
            Sign In
          </Link>
        </li>
        <li>
          <Link className="hover:text-green-600" to={"/"}>
            Sign Up
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
