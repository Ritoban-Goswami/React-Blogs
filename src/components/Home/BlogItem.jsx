import React from "react";
import Chip from "../Common/Chip";
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
  createdAt = new Date(createdAt);
  return (
    <div className="flex flex-col">
      <img
        className="w-full h-72 object-cover rounded-2xl mb-2"
        src={cover}
        alt="cover"
      />
      <Chip label={category}></Chip>
      <h3 className="mb-4 mt-2 font-bold text-[1.4rem]">{title}</h3>
      <p className="truncate text-sm pr-3 text-slate-500">{description}</p>
      <footer className="flex items-center mt-4 justify-between">
        <div className="flex items-center">
          <img
            className="mr-2 w-12 h-12 object-cover rounded-full"
            src={authorAvatar}
            alt="avatar"
          />
          <div>
            <h6 className="font-bold text-lg">{authorName}</h6>
            <p className="text-xs font-semibold text-slate-400">
              {createdAt.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <Link className=" hover:text-green-600" to={`/blog/${id}`}>
          &#8594;
        </Link>
      </footer>
    </div>
  );
};

export default BlogItem;
