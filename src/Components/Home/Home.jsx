import Blog from "../Blog/Blog";
import styles from "./Home.module.css";
import blogsData from "../../db/BlogsData";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [blogsDataArr, setBlogsDataArr] = blogsData();

  useEffect(() => {
    if (localStorage.getItem("blogsDataArr")) {
      setBlogsDataArr(JSON.parse(localStorage.getItem("blogsDataArr")));
    }
  }, []);

  return (
    <div className="py-2 p-2 sm:p-2.5">
      <h1 className="font-bold text-gray-800 text-lg mb-5">Latest Post</h1>
      <section className="grid place-items-center items-stretch grid-cols-1 gap-6 lg:grid-cols-4">
        {blogsDataArr.map((blog) => {
          return (
            <Blog
              key={blog.id}
              image={blog.image}
              category={blog.category}
              title={blog.title}
              avatar={blog.avatar}
              author={blog.author}
              date={blog.date}
              id={blog.id}
            />
          );
        })}
        <div className="rounded-lg min-h-[23rem] flex justify-center items-center p-2 ring-1 ring-gray-200 w-[20rem] max-w-xs">
          <img
            onClick={() => navigate("/add-blog")}
            src="/assets/add.png"
            alt="Add"
            className="w-20 transition-all cursor-pointer hover:scale-95 active:scale-90"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
