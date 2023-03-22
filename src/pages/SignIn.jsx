import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlSubmit = async (e) => {
    e.preventDefault();

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return (
    <div>
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-center font-bold text-3xl my-4">
          Sign In To Your BlogsScape Account Now!
        </h1>
        <form onSubmit={handlSubmit} className="border rounded px-8 pt-6 pb-8">
          <div className="mb-8">
            <label
              htmlFor="blogTitle"
              className="block text-gray-700 text-lg font-semibold mb-3"
            >
              Email Address
            </label>
            <input
              type="email"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-green-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-10">
            <label
              htmlFor="blogDesc"
              className="block text-gray-700 text-lg font-semibold mb-3"
            >
              Password
            </label>
            <input
              type="password"
              className="appearance-none border rounded w-full resize-none py-2 px-3 text-gray-700 focus:outline-green-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-8 text-sm font-bold">
            Don't Have An Account?{" "}
            <Link
              className="text-green-600 hover:text-green-700"
              to={"/sign-up"}
            >
              Sign Up here!
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <button className="w-1/4 bg-transparent font-semibold hover:text-green-600 py-2 px-4 border-green-600 border-2 rounded">
              Go
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;