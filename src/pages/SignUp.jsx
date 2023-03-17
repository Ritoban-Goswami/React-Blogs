import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [signInName, setSignInName] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [signInImage, setSignInImage] = useState({});

  const handleUpload = () => {
    if (!signInImage) {
      alert("Please choose a file first!");
    } else {
      const storageRef = ref(storage, `/1/${signInImage.name}`);

      uploadBytes(storageRef, signInImage).then((snapshot) => {
        alert("Uploaded a blob or file!");
        console.log(snapshot);
      });
    }
  };
  handleUpload();

  const handlSubmit = async (e) => {
    e.preventDefault();
    if (password === confPassword) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: signInName,
          })
            .then(() => {
              console.log(user);
              navigate("/");
            })
            .catch((error) => {
              alert(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(error.message);
          console.log(errorCode, errorMessage);
        });
    } else {
      alert("Passwords do not match");
    }
  };

  useEffect(() => {
    console.log(signInImage);
  }, [signInImage]);

  return (
    <div>
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-center font-bold text-3xl my-4">
          Sign Up To BlogsScape Now!
        </h1>
        <form
          // onSubmit={handlSubmit}
          className="border rounded px-8 pt-6 pb-8"
        >
          <div className="mb-8">
            <label
              htmlFor="signInName"
              className="block text-gray-700 text-lg font-semibold mb-3"
            >
              Name
            </label>
            <input
              type="text"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-green-600"
              value={signInName}
              onChange={(e) => setSignInName(e.target.value)}
              id="signInName"
              required
            />
          </div>
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
          <div className="mb-8">
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
          <div className="mb-8">
            <label
              htmlFor="blogCategory"
              className="block text-gray-700 text-lg font-semibold mb-3"
            >
              Confirm Password
            </label>
            <input
              type="password"
              className="appearance-none border rounded w-full resize-none py-2 px-3 text-gray-700 focus:outline-green-600"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
            />
          </div>
          <div className="mb-10">
            <label
              htmlFor="signInImage"
              className="block text-gray-700 text-lg font-semibold mb-3"
            >
              Profile Picture
            </label>
            <input
              type="file"
              className="appearance-none w-full py-2"
              onChange={(e) => setSignInImage(e.target.files[0])}
              id="signInImage"
              required
            />
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
