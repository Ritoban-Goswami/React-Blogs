import React from "react";
import Loader from "./Loader";

const BlogForm = ({
  heading,
  handleChange,
  formInput,
  handlSubmit,
  submitting,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="text-neutral-800 dark:text-neutral-200 text-center font-bold text-3xl my-4">
        {heading}
      </h1>
      <form onSubmit={handlSubmit} className="border rounded px-8 pt-6 pb-8">
        <div className="mb-8">
          <label
            htmlFor="blogTitle"
            className="block text-neutral-800 dark:text-neutral-200 text-lg font-semibold mb-3"
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
            className="block text-neutral-800 dark:text-neutral-200 text-lg font-semibold mb-3"
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
        <div className="mb-8">
          <label
            htmlFor="blogImage"
            className="block text-neutral-800 dark:text-neutral-200 text-lg font-semibold mb-3"
          >
            Cover Photo
          </label>
          {formInput.blogCurrentCover && (
            <img
              src={formInput.blogCurrentCover}
              className="w-full h-72 opacity-75 object-cover rounded-2xl mb-2"
              alt="Blog Cover Photo"
            />
          )}
          <input
            type="file"
            className="w-full py-2 text-neutral-800 dark:text-neutral-400 block text-sm cursor-pointer focus:outline-none file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold file:text-neutral-700
            hover:file:bg-neutral-400"
            onChange={handleChange}
            name="blogImage"
            id="blogImage"
          />
        </div>
        <div className="mb-10">
          <label
            htmlFor="blogCategory"
            className="block text-neutral-800 dark:text-neutral-200 text-lg font-semibold mb-3"
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
          <button className="w-1/5 h-12 bg-transparent font-semibold text-neutral-800 dark:text-neutral-200 hover:text-green-600 py-1 px-2 border-green-600 border-2 rounded">
            {submitting ? <Loader /> : <>Go</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
