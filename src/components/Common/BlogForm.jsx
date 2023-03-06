import React from "react";

const BlogForm = ({ heading, handleChange, formInput, handlSubmit }) => {
  return (
    <div>
      <h1>{heading}</h1>
      <form onSubmit={handlSubmit}>
        <label htmlFor="blogTitle" className="">
          Title
        </label>
        <input
          type="text"
          className=""
          value={formInput.blogTitle || ""}
          onChange={handleChange}
          name="blogTitle"
          id="blogTitle"
        />
        <label htmlFor="blogDesc" className="">
          Description
        </label>
        <input
          type="text"
          className=""
          value={formInput.blogDesc || ""}
          onChange={handleChange}
          name="blogDesc"
          id="blogDesc"
        />
        <label htmlFor="blogCategory" className="">
          Category
        </label>
        <input
          type="text"
          className=""
          value={formInput.blogCategory || ""}
          onChange={handleChange}
          name="blogCategory"
          id="blogCategory"
        />
        <button>Go</button>
      </form>
    </div>
  );
};

export default BlogForm;
