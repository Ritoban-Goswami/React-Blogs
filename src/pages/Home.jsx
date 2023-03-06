import React from "react";
import EmptyList from "../components/Common/EmptyList";
import BlogList from "../components/Home/BlogList";
import Header from "../components/Home/Header";
import SearchBar from "../components/Home/SearchBar";
import { Link } from "react-router-dom";

const Home = ({ blogs }) => {
  // const [searchKey, setSearchKey] = useState("");

  // const handleSearchSubmit = (e) => {
  //   handleSearchResults();
  //   e.preventDefault();
  // };

  // const handleSearchResults = () => {
  //   const allBlogs = blogList;
  //   const filteredBlogs = allBlogs.filter((blog) =>
  //     blog.category.toLowerCase().includes(searchKey.toLowerCase().trim())
  //   );
  //   setBlogs(filteredBlogs);
  // };

  // const handleClearSearch = () => {
  //   setBlogs(blogList);
  //   setSearchKey("");
  // };

  return (
    <div>
      <Header></Header>
      <Link to={"/edit-blog/new"}>Add a new Blog</Link>
      <SearchBar
      // value={searchKey}
      // clearSearch={handleClearSearch}
      // formSubmit={handleSearchSubmit}
      // handleSearchKey={(e) => setSearchKey(e.target.value)}
      ></SearchBar>
      {!blogs.length ? <EmptyList /> : <BlogList blogs={blogs}></BlogList>}
    </div>
  );
};

export default Home;
