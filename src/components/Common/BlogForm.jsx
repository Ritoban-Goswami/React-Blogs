import React from "react";

const BlogForm = ({ heading, handleChange, formInput, handlSubmit }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="text-center font-bold text-3xl my-4">{heading}</h1>
      <form onSubmit={handlSubmit} className="border rounded px-8 pt-6 pb-8">
        <div className="mb-8">
          <label
            htmlFor="blogTitle"
            className="block text-gray-700 text-lg font-semibold mb-3"
          >
            Title
          </label>
          <input
            type="text"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-green-600"
            value={formInput.blogTitle || ""}
            onChange={handleChange}
            name="blogTitle"
            id="blogTitle"
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="blogDesc"
            className="block text-gray-700 text-lg font-semibold mb-3"
          >
            Description
          </label>
          <textarea
            className="appearance-none border rounded w-full resize-none py-2 px-3 text-gray-700 focus:outline-green-600"
            rows={6}
            value={formInput.blogDesc || ""}
            onChange={handleChange}
            name="blogDesc"
            id="blogDesc"
          />
        </div>
        <div className="mb-10">
          <label
            htmlFor="blogCategory"
            className="block text-gray-700 text-lg font-semibold mb-3"
          >
            Category
          </label>
          <input
            type="text"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-green-600"
            value={formInput.blogCategory || ""}
            onChange={handleChange}
            name="blogCategory"
            id="blogCategory"
          />
        </div>
        <div className="flex items-center justify-center">
          <button className="w-1/4 bg-transparent font-semibold hover:text-green-600 py-2 px-4 border-green-600 border-2 rounded">
            Go
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
