import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogForm from "../components/Common/BlogForm";
import EmptyList from "../components/Common/EmptyList";
import { set, update, ref as ref_database } from "firebase/database";
import {
  ref as ref_storage,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const EditBlog = ({ blogs, user }) => {
  const [blogsLength, setBlogsLength] = useState();
  const [blogsId, setBlogsId] = useState([]);
  const [formInputNew, setFormInputNew] = useState({});
  const [formInputEdit, setFormInputEdit] = useState({});
  const [blogImageURL, setblogImageURL] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const handleChangeNew = (e) => {
    const input = e.target.name;
    const value = input == "blogImage" ? e.target.files[0] : e.target.value;
    setFormInputNew((values) => ({ ...values, [input]: value })); //TODO: learn about this syntax
  };
  const handleChangeEdit = (e) => {
    const input = e.target.name;
    const value = input == "blogImage" ? e.target.files[0] : e.target.value;
    setFormInputEdit((values) => ({ ...values, [input]: value })); //TODO: learn about this syntax
  };

  const uploadBlogImage = (formInput) => {
    if (!formInput.blogImage) {
      return;
    } else {
      const storageRef = ref_storage(
        storage,
        `/${user.uid}/${formInput.blogImage.name}`
      );

      uploadBytes(storageRef, formInput.blogImage)
        .then((snapshot) => {
          console.log("Uploaded a blob or file!", snapshot);
          getBLogImageURL(storageRef);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getBLogImageURL = (storageRef) => {
    getDownloadURL(storageRef)
      .then((url) => {
        setblogImageURL(url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlSubmitNew = async (e) => {
    e.preventDefault();
    try {
      await uploadBlogImage(formInputNew);
      writeBlogData();
    } catch (error) {
      console.log(error.code, error.message);
    }
    navigate("/");
  };
  const handlSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      await uploadBlogImage(formInputEdit);
      updateBlogData();
    } catch (error) {
      console.log(error.code, error.message);
    }
    navigate("/");
  };

  function writeBlogData() {
    set(ref_database(db, "/" + blogsLength), {
      authorAvatar: user.photoURL ? user.photoURL : "/assets/images/author.jpg",
      authorName: user.displayName,
      authorId: user.uid,
      category: formInputNew.blogCategory,
      cover: blogImageURL ? blogImageURL : "https://picsum.photos/1200/900",
      createdAt: "June 03, 2021",
      description: formInputNew.blogDesc,
      id: blogsLength + 1,
      subCategory: ["frontend", "ui/ux", "design"],
      title: formInputNew.blogTitle,
    });
  }

  function updateBlogData() {
    const blogData = {
      category: formInputEdit.blogCategory,
      cover: blogImageURL ? blogImageURL : "https://picsum.photos/1200/900",
      createdAt: "June 03, 2021",
      description: formInputEdit.blogDesc,
      id: id,
      subCategory: ["frontend", "ui/ux", "design"],
      title: formInputEdit.blogTitle,
    };
    return update(ref_database(db, "/" + (id - 1)), blogData);
  }

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      setBlogsLength(blogs.length);
      const blogsId = blogs.map((blog) => blog.id.toString());
      setBlogsId(blogsId);
    }
  }, [blogs]);

  useEffect(() => {
    if (blogsId.includes(id)) {
      setFormInputEdit({
        blogTitle: blogs[id - 1].title,
        blogDesc: blogs[id - 1].description,
        blogCategory: blogs[id - 1].category,
      });
    }
  }, [blogsId, id]);

  useEffect(() => {
    console.log(blogImageURL);
  }, [blogImageURL]);

  return (
    <div>
      {id === "new" ? (
        <BlogForm
          heading={"Add Your New Blog"}
          handleChange={handleChangeNew}
          handlSubmit={handlSubmitNew}
          formInput={formInputNew}
        />
      ) : blogsId.includes(id) ? (
        <BlogForm
          heading={"Edit Your Blog"}
          handleChange={handleChangeEdit}
          handlSubmit={handlSubmitEdit}
          formInput={formInputEdit}
        />
      ) : (
        <EmptyList />
      )}
    </div>
  );
};

export default EditBlog;
