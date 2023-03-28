import React, { useEffect, useState } from "react";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import EditBlog from "./pages/EditBlog";
import { Route, Routes } from "react-router-dom";
import { db } from "./firebase-config";
import { onValue, ref, query, orderByChild } from "firebase/database";
import Header from "../src/components/Common/Header";
import EmptyList from "./components/Common/EmptyList";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/firebase-config";

function App() {
  const [blogs, setBlogs] = useState({});
  const [user, setUser] = useState(null);

  function readBlogData() {
    const blogRef = ref(db, "/");
    onValue(blogRef, (snapshot) => {
      const data = snapshot.val();
      setBlogs(data);
    });
  }

  useEffect(() => {
    readBlogData();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // console.log(user);
      } else {
        setUser(null);
        console.log("user is logged out");
      }
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Header user={user}></Header>
      <Routes>
        <Route path="/" element={<Home blogs={blogs} />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="blog/:id" element={<Blog blogs={blogs} user={user} />} />
        <Route
          path="edit-blog/:id"
          element={<EditBlog blogs={blogs} user={user} />}
        />
        <Route path="*" element={<EmptyList />} />
      </Routes>
    </div>
  );
}

export default App;
