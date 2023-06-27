import React from "react";
import EmptyList from "../components/Common/EmptyList";
import BlogList from "../components/Home/BlogList";

const Home = ({ blogs }) => {
  const sortedBlogsValue = Object.values(blogs).sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
  const sortedDataObj = sortedBlogsValue.reduce(
    (obj, item) => ({ ...obj, [item.id]: item }),
    {}
  );

  const dataObj = { ...sortedDataObj };
  return (
    <>
      {!Object.keys(dataObj) ? (
        <EmptyList />
      ) : (
        <BlogList blogs={dataObj}></BlogList>
      )}
    </>
  );
};

export default Home;
