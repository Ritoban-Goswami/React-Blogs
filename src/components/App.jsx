import Blog from "../pages/Blog";
import Home from "../pages/Home";
import { Route, Routes } from "react-router-dom";
import Layout from "../pages/Layout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<Blog />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
