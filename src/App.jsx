import React, { useEffect, useState } from "react";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { db } from "./firebase-config";
import { onValue, ref, set } from "firebase/database";

function App() {
  const [blogs, setBlogs] = useState({});

  function readBlogData(blogId) {
    const blogRef = ref(db, "/");
    onValue(blogRef, (snapshot) => {
      const data = snapshot.val();
      setBlogs(data);
    });
  }

  useEffect(() => {
    readBlogData();
  }, []);
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home blogs={blogs} />} />
        <Route path="blog/:id" element={<Blog blogs={blogs} />} />
      </Routes>
    </div>
  );
}

export default App;
