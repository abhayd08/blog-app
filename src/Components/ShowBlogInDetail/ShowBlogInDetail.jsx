import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import blogsData from "../../db/BlogsData";

const ShowBlogInDetail = () => {
  const [blogsDataArr, setBlogsDataArr] = blogsData();
  const { id } = useParams();
  const [blogToShow, setBlogToShow] = useState(null);
  const [loadingContentSrc, setLoadingContentSrc] = useState(
    "/assets/loading.png"
  );

  useEffect(() => {
    setLoadingContentSrc("/assets/loading.png");
    if (localStorage.getItem("blogsDataArr")) {
      setBlogsDataArr(JSON.parse(localStorage.getItem("blogsDataArr")));
    }
    const timer = setTimeout(() => {
      setLoadingContentSrc(null);
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const blog = blogsDataArr.find((blogData) => blogData.id === id);
    setBlogToShow(blog);
  }, [blogsDataArr]);

  if (loadingContentSrc) {
    return (
      <div className="flex h-[100vh] w-full justify-center items-center">
        <img src={loadingContentSrc} className="w-14" alt="Loading..." />
      </div>
    );
  } else {
    return (
      <div className="py-5 px-2.5 mx-auto max-w-4xl">
        <h1 className="text-3xl font-medium text-black">{blogToShow?.title}</h1>
        <div className="inline-flex justify-between mt-5 flex-wrap items-center gap-8">
          <div className="inline-flex items-center gap-1.5">
            <img
              src={blogToShow?.avatar}
              className="rounded-full w-7 h-7"
              alt={blogToShow?.author}
            />
            <h6 className="text-xs font-medium">{blogToShow?.author}</h6>
          </div>
          <span className="text-xs font-medium">
            {new Date(blogToShow?.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
        <img
          src={blogToShow?.image}
          className="rounded-xl mt-6 h-auto min-w-[300px] max-h-none"
          alt="Post Thumbnail"
        />
        <div
          className="mt-7"
          dangerouslySetInnerHTML={{ __html: blogToShow?.content }}
        ></div>
      </div>
    );
  }
};

export default ShowBlogInDetail;
