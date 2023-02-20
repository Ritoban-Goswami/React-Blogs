import React from "react";
import { useParams } from "react-router-dom";

const Blog = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Blog {id} Page</h1>
    </div>
  );
};

export default Blog;
