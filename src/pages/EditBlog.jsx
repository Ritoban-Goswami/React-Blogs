import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogForm from "../components/Common/BlogForm";
import EmptyList from "../components/Common/EmptyList";
import { ref, set, child, push, update } from "firebase/database";
import { db } from "../firebase-config";

const EditBlog = ({ blogs }) => {
  const [blogsLength, setBlogsLength] = useState();
  const [blogsId, setBlogsId] = useState([]);
  const [formInputNew, setFormInputNew] = useState({});
  const [formInputEdit, setFormInputEdit] = useState({});

  const { id } = useParams();

  const handleChangeNew = (e) => {
    const input = e.target.name;
    const value = e.target.value;
    setFormInputNew((values) => ({ ...values, [input]: value })); //TODO: learn about this syntax
  };
  const handleChangeEdit = (e) => {
    const input = e.target.name;
    const value = e.target.value;
    setFormInputEdit((values) => ({ ...values, [input]: value })); //TODO: learn about this syntax
  };

  const handlSubmitNew = (e) => {
    e.preventDefault();
    writeBlogData();
  };
  const handlSubmitEdit = (e) => {
    e.preventDefault();
    console.log(formInputEdit);
    updateBlogData();
  };

  function writeBlogData() {
    set(ref(db, "/" + blogsLength), {
      authorAvatar: "/assets/images/author.jpg",
      authorName: "John Doe",
      category: formInputNew.blogCategory,
      cover: "https://picsum.photos/400/300",
      createdAt: "June 03, 2021",
      description: formInputNew.blogDesc,
      id: blogsLength + 1,
      subCategory: ["frontend", "ui/ux", "design"],
      title: formInputNew.blogTitle,
    });
  }

  function updateBlogData() {
    const blogData = {
      authorAvatar: "/assets/images/author.jpg",
      authorName: "John Doe",
      category: formInputEdit.blogCategory,
      cover: "https://picsum.photos/400/300",
      createdAt: "June 03, 2021",
      description: formInputEdit.blogDesc,
      id: id,
      subCategory: ["frontend", "ui/ux", "design"],
      title: formInputEdit.blogTitle,
    };
    return update(ref(db, "/" + (id - 1)), blogData);
  }

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      setBlogsLength(blogs.length);
      const blogsId = blogs.map((blog) => blog.id.toString());
      setBlogsId(blogsId);
      console.log(blogsLength);
    }
  }, [blogs]);

  useEffect(() => {
    if (blogsId.includes(id)) {
      // set the form inputs to the values of the selected blog
      setFormInputEdit({
        blogTitle: blogs[id - 1].title,
        blogDesc: blogs[id - 1].description,
        blogCategory: blogs[id - 1].category,
      });
    }
  }, [blogsId, id]);

  if (id === "new") {
    return (
      <div>
        <BlogForm
          heading={"Add Your New Blog"}
          handleChange={handleChangeNew}
          handlSubmit={handlSubmitNew}
          formInput={formInputNew}
        />
      </div>
    );
  } else if (blogsId.includes(id)) {
    return (
      <div>
        <BlogForm
          heading={"Edit Your Blog"}
          handleChange={handleChangeEdit}
          handlSubmit={handlSubmitEdit}
          formInput={formInputEdit}
        />
      </div>
    );
  } else {
    return <EmptyList />;
  }
};

export default EditBlog;
