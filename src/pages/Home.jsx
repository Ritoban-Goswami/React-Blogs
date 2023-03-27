import React from "react";
import EmptyList from "../components/Common/EmptyList";
import BlogList from "../components/Home/BlogList";

const Home = ({ blogs }) => {
  return (
    <>
      {!Object.keys(blogs) ? (
        <EmptyList />
      ) : (
        <BlogList blogs={blogs}></BlogList>
      )}
    </>
  );
};

export default Home;
