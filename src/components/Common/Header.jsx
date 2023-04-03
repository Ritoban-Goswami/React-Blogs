import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import {
  FaPowerOff,
  FaUserPlus,
  FaUserAlt,
  FaSignInAlt,
  FaRegSun,
  FaRegMoon,
} from "react-icons/fa";

const Header = ({ user, isDarkEnabled, handleTheme }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleProfileModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <header className="home-header flex justify-between items-center mb-16">
      <Link to={"/"} className="flex items-center">
        <img
          className="w-1/6"
          src="/blogscape-low-resolution-logo-color-on-transparent-background.png"
          alt="BlogScape"
        />
      </Link>
      <ul className="font-bold flex items-center justify-end w-2/5">
        {user && (
          <li className="ml-3">
            <Link
              className="text-neutral-800 dark:text-neutral-100 hover:text-green-600"
              to={"/edit-blog/new"}
            >
              Add Blog
            </Link>
          </li>
        )}
        <li
          className="ml-3 relative cursor-pointer"
          onClick={toggleProfileModal}
        >
          {user ? (
            <img
              src={user.photoURL ? user.photoURL : "/assets/images/author.jpg"}
              alt="User Avatar"
              className="w-12 h-12 object-cover rounded-full"
            />
          ) : (
            <div className="flex items-center justify-center w-12 h-12 border-2 dark:border-neutral-800 dark:bg-neutral-500 border-neutral-300 bg-neutral-300 rounded-full">
              <FaUserAlt className="text-3xl" />
            </div>
          )}
          {isModalOpen && (
            <div
              className="absolute right-0 top-14 w-40 py-2 px-3 shadow bg-neutral-200 dark:bg-neutral-900 rounded flex flex-col"
              id="profieModal"
            >
              {isDarkEnabled ? (
                <Link
                  className="flex items-center text-neutral-800 dark:text-neutral-200 hover:text-green-600 text-sm"
                  onClick={handleTheme}
                >
                  <FaRegSun />
                  <span className="ml-2">Light Mode</span>
                </Link>
              ) : (
                <Link
                  className="flex items-center text-neutral-800 dark:text-neutral-200 hover:text-green-600 text-sm"
                  onClick={handleTheme}
                >
                  <FaRegMoon />
                  <span className="ml-2">Dark Mode</span>
                </Link>
              )}
              {user ? (
                <>
                  <Link
                    className="flex items-center text-neutral-800 dark:text-neutral-200 hover:text-red-400 text-sm mt-2"
                    onClick={handleLogout}
                  >
                    <FaPowerOff />
                    <span className="ml-2">Log Out</span>
                  </Link>
                  <Link
                    className="flex items-center text-neutral-800 dark:text-neutral-200 hover:text-green-600 text-sm mt-2"
                    to={"/sign-up"}
                  >
                    <FaUserPlus />
                    <span className="ml-2">Sign Up</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    className="flex items-center text-neutral-800 dark:text-neutral-200 hover:text-green-600 text-sm mt-2"
                    to={"/sign-in"}
                  >
                    <FaSignInAlt />
                    <span className="ml-2">Sign In</span>
                  </Link>
                </>
              )}
            </div>
          )}
        </li>
      </ul>
    </header>
  );
};

export default Header;
