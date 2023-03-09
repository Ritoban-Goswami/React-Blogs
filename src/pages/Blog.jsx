import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import EmptyList from "../components/Common/EmptyList";
import Chip from "../components/Common/Chip";
import "./BlogStyles.css";
import { ref, remove } from "firebase/database";
import { db } from "../firebase-config";

const Blog = ({ blogs }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      let blog = blogs.find((blogIndex) => blogIndex.id == id);
      if (blog) {
        setBlog(blog);
      }
    }
  }, [blogs, id]);

  const handleDelete = () => {
    deleteBlog();
    console.log("clicked");
  };

  const deleteBlog = () => {
    remove(ref(db, "/" + (id - 1)));
  };

  return (
    <div>
      <Link className="blog-goBack" to={"/"}>
        <span>&#8592; Go Back</span>
      </Link>
      {blog ? (
        <div className="blog-wrap">
          <header>
            <p className="blog-date">Published {blog.createdAt}</p>
            <h1>{blog.title}</h1>
            {blog.subCategory && (
              <div className="blog-subCategory">
                {blog.subCategory.map((category, index) => (
                  <div key={index}>
                    <Chip label={category} />
                  </div>
                ))}
              </div>
            )}
          </header>
          <img src={blog.cover} alt="cover" />
          <p className="blog-desc">{blog.description}</p>
          <Link to={`/edit-blog/${id}`}>Edit Blog</Link>
          <Link onClick={handleDelete} to={"/"}>
            Delete Blog
          </Link>
        </div>
      ) : (
        <EmptyList />
      )}
    </div>
  );
};

export default Blog;
