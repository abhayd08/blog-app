import Home from "./Components/Home/Home";
import { Route, Routes } from "react-router-dom";
import AddBlog from "../src/Components/AddBlog/AddBlog";
import ShowBlogInDetail from "./Components/ShowBlogInDetail/ShowBlogInDetail";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route path="add-blog" element={<AddBlog />}></Route>
      <Route path="/blog/:id" element={<ShowBlogInDetail />}></Route>
    </Routes>
  );
};

export default App;
