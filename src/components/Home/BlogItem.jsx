import React from "react";
import Chip from "../Common/Chip";
import "./BlogItemStyles.css";
import { Link } from "react-router-dom";

const BlogItem = ({
  blog: {
    id,
    description,
    title,
    createdAt,
    authorName,
    authorAvatar,
    category,
    cover,
  },
}) => {
  return (
    <div className="blogItem-wrap">
      <img className="blogItem-cover" src={cover} alt="cover" />
      <Chip label={category}></Chip>
      <h3>{title}</h3>
      <p className="blogItem-desc">{description}</p>
      <footer>
        <div className="blogItem-author">
          <img src={authorAvatar} alt="avatar" />
          <div>
            <h6>{authorName}</h6>
            <p>{createdAt}</p>
          </div>
        </div>
        <Link className="blogItem-link" to={`/blog/${id}`}>
          &#8594;
        </Link>
      </footer>
    </div>
  );
};

export default BlogItem;
