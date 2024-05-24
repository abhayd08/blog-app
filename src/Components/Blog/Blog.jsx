const Blog = ({ image, category, title, avatar, author, date }) => {
  return (
    <div className="rounded-lg p-2 ring-1 ring-gray-200 max-w-xs">
      <img
        src={image}
        className="rounded-lg w-full h-[13.5rem]"
        alt="Post Thumbnail"
      />
      <div className="flex flex-col mt-3 gap-4 p-1.5">
        <div>
        <span className="px-2 text-xs py-2 rounded-lg bg-blue-50 text-center text-blue-500 font-semibold">
          {category}
        </span>
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className="flex justify-between w-full items-center gap-5">
          <div className="flex w-full items-center gap-1.5">
            <img src={avatar} className="rounded-full w-8 h-8" alt={author} />
            <h6 className="text-xs font-medium text-gray-400">{author}</h6>
          </div>
          <span className="text-xs font-medium text-end w-full text-gray-400">
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
