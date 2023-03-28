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
import { v4 as uuid } from "uuid";

const EditBlog = ({ blogs, user }) => {
  const [blogsId, setBlogsId] = useState([]);
  const [formInputNew, setFormInputNew] = useState({});
  const [formInputEdit, setFormInputEdit] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleChangeNew = (e) => {
    const input = e.target.name;
    const value = input == "blogImage" ? e.target.files[0] : e.target.value;
    setFormInputNew((values) => ({ ...values, [input]: value }));
  };
  const handleChangeEdit = (e) => {
    const input = e.target.name;
    const value = input == "blogImage" ? e.target.files[0] : e.target.value;
    setFormInputEdit((values) => ({ ...values, [input]: value }));
  };

  const handlSubmitNew = async (e) => {
    const blogId = uuid();
    e.preventDefault();
    setSubmitting(true);
    const cover = formInputNew.blogImage
      ? await uploadBlogImage(formInputNew.blogImage)
      : "https://picsum.photos/600/450";

    const newBlog = {
      authorAvatar: user.photoURL ? user.photoURL : "/assets/images/author.jpg",
      authorName: user.displayName,
      authorId: user.uid,
      category: formInputNew.blogCategory,
      cover: cover,
      createdAt: new Date(),
      description: formInputNew.blogDesc,
      id: blogId,
      title: formInputNew.blogTitle,
    };

    try {
      await set(ref_database(db, "/" + blogId), newBlog);
      navigate(`/blog/${blogId}`);
    } catch (err) {
      console.log(err);
    }
  };

  async function uploadBlogImage(image) {
    const storageRef = ref_storage(storage, `/${user.uid}/${image.name}`);
    const snapshot = await uploadBytes(storageRef, image);
    console.log("Uploaded a blob or file!", snapshot);
    const url = await getDownloadURL(storageRef);
    return url ? url : "https://picsum.photos/600/450";
  }

  const handlSubmitEdit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const cover = formInputEdit.blogImage
      ? await uploadBlogImage(formInputEdit.blogImage)
      : "https://picsum.photos/600/450";

    const editedBlog = {
      category: formInputEdit.blogCategory,
      cover: cover,
      createdAt: new Date(),
      description: formInputEdit.blogDesc,
      id: id,
      subCategory: null,
      title: formInputEdit.blogTitle,
    };

    try {
      await update(ref_database(db, "/" + id), editedBlog);
      navigate(`/blog/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (blogs && Object.keys(blogs).length > 0) {
      const blogsId = Object.values(blogs).map((blog) => blog.id.toString());
      setBlogsId(blogsId);
    }
  }, [blogs]);

  useEffect(() => {
    if (blogsId.includes(id)) {
      setFormInputEdit({
        blogTitle: blogs[id].title,
        blogDesc: blogs[id].description,
        blogCategory: blogs[id].category,
      });
    }
  }, [blogsId, id]);

  return (
    <div>
      {id === "new" ? (
        <BlogForm
          heading={"Add Your New Blog"}
          handleChange={handleChangeNew}
          handlSubmit={handlSubmitNew}
          formInput={formInputNew}
          submitting={submitting}
        />
      ) : blogsId.includes(id) ? (
        <BlogForm
          heading={"Edit Your Blog"}
          handleChange={handleChangeEdit}
          handlSubmit={handlSubmitEdit}
          formInput={formInputEdit}
          submitting={submitting}
        />
      ) : (
        <EmptyList />
      )}
    </div>
  );
};

export default EditBlog;
