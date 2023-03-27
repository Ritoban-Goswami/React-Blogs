import React from "react";
import BlogItem from "./BlogItem";

const BlogList = ({ blogs }) => {
  return (
    <div className="grid grid-cols-3 gap-12">
      {Object.keys(blogs).map((key) => (
        <BlogItem blog={blogs[key]} key={key} />
      ))}
    </div>
  );
};

export default BlogList;
