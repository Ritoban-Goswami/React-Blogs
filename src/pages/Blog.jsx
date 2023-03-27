import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import EmptyList from "../components/Common/EmptyList";
import { ref, remove } from "firebase/database";
import { db } from "../firebase-config";

const Blog = ({ blogs, user }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    if (id && blogs && Object.keys(blogs).length > 0) {
      let blog = Object.values(blogs).find((blogIndex) => blogIndex?.id == id);
      if (blog) {
        setBlog(blog);
      } else {
        console.log("Couldn't find blog!");
      }
    }
  }, [blogs]);

  const handleDelete = () => {
    deleteBlog();
  };

  const deleteBlog = () => {
    remove(ref(db, "/" + id));
  };

  return (
    <div>
      {blog ? (
        <div className="container px-4 mx-auto">
          <header className="text-center">
            <p className="text-sm font-semibold text-slate-400">
              Published {blog.createdAt}
            </p>
            <h1 className="font-bold text-3xl capitalize mt-8 mb-16">
              {blog.title}
            </h1>
          </header>
          <img
            className="w-4/6 mx-auto rounded-2xl"
            src={blog.cover}
            alt="cover"
          />
          <p className="p-4 mt-6">{blog.description}</p>
          {user && user.uid === blog.authorId && (
            <div className="w-1/3 mx-auto flex justify-evenly items-center my-4">
              <Link
                className="bg-transparent font-semibold hover:text-green-600 py-2 px-4 border-green-600 border-2 rounded"
                to={`/edit-blog/${id}`}
              >
                Edit Blog
              </Link>
              <Link
                className="bg-transparent font-semibold hover:text-red-600 py-2 px-4 border-red-500 border-2 rounded"
                onClick={handleDelete}
                to={"/"}
              >
                Delete Blog
              </Link>
            </div>
          )}
        </div>
      ) : (
        <EmptyList />
      )}
    </div>
  );
};

export default Blog;
