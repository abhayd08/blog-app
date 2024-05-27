import { useNavigate } from "react-router-dom";

const Blog = ({ image, category, title, avatar, author, date, id }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${id}`)}
      className="rounded-lg cursor-pointer p-2 pb-3 hover:ring-blue-500 hover:ring-1 transition-all active:scale-[0.99] sm:p-2.5 sm:pb-4 ring-1 ring-gray-200 w-[20rem] max-w-xs"
    >
      <img
        src={image}
        className="rounded-lg w-auto mx-auto h-[13.5rem]"
        alt="Post Thumbnail"
      />
      <div className="flex flex-col mt-3 gap-4 p-1">
        <div>
          <h6 className="p-2 text-xs inline-flex max-w-[60%] rounded-lg bg-blue-50 text-center text-blue-500 font-semibold">
            {category}
          </h6>
        </div>
        <h3 className="font-semibold leading-6 text-lg line-clamp-3">
          {title}
        </h3>
        <div className="inline-flex items-center gap-10 gap-y-6 flex-wrap">
          <div className="inline-flex items-center gap-2">
            <img src={avatar} className="rounded-full w-7 h-7" alt={author} />
            <h6 className="text-xs font-medium text-gray-400">{author}</h6>
          </div>
          <span className="text-xs font-medium text-gray-400 opacity-90">
            {new Date(date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Blog;
