import Blog from "../Blog/Blog";
import styles from "./Home.module.css";
import blogs from "../../db/blogs.json";

const Home = () => {
  return (
    <div className="py-2 p-2 sm:p-2.5">
      <h1 className="font-bold text-gray-800 text-lg mb-5">Latest Post</h1>
      <section className="grid place-items-center grid-cols-1 lg:grid-cols-4">
        {blogs.map((blog) => {
          return (
            <Blog
              image={blog.image}
              category={blog.category}
              title={blog.title}
              avatar={blog.avatar}
              author={blog.author}
              date={blog.date}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Home;
