import Blog from "../Blog/Blog";
import blogsData from "../../db/BlogsData";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  const [blogsDataArr, setBlogsDataArr] = blogsData();

  useEffect(() => {
    if (localStorage.getItem("blogsDataArr")) {
      setBlogsDataArr(JSON.parse(localStorage.getItem("blogsDataArr")));
    }
  }, []);

  return (
    <div className="p-2 sm:p-2.5">
      <h1 className="font-extrabold text-gray-800 text-lg mb-4">Latest Post</h1>
      <section
        className={`grid items-stretch place-items-center gap-10 ${styles.blogsGrid}`}
      >
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
            alt="Add a Blog"
            className="w-20 transition-all cursor-pointer hover:scale-[0.98] active:scale-[0.96]"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
