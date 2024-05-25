import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import blogsData from "../../db/BlogsData";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddBlog = () => {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [author, setAuthor] = useState(null);
  const [date, setDate] = useState(null);

  const [blogsDataArr, setBlogsDataArr] = blogsData();

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("blogsDataArr")) {
      setBlogsDataArr(JSON.parse(localStorage.getItem("blogsDataArr")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("blogsDataArr", JSON.stringify(blogsDataArr));
  }, [blogsDataArr]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContentChange = (html) => {
    setContent(html);
  };

  const addBlog = (event) => {
    event.preventDefault();
    try {
      const blogToAdd = {
        id: uuidv4(),
        image: image,
        category: category,
        title: title,
        content: content,
        avatar: avatar,
        author: author,
        date: date,
      };
      setBlogsDataArr((prevState) => {
        return [...prevState, blogToAdd];
      });
      const timer = setTimeout(() => {
        navigate("/");
      }, 0);
      return () => clearTimeout(timer);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={addBlog} className="p-1.5 py-2.5 max-w-xl mx-auto">
      <h5 className="font-bold text-lg">Add a Blog!</h5>
      <div className="rounded-lg p-2 mt-4 ring-1 ring-gray-200 min-h-[23rem]">
        <div className="rounded-lg w-full ring-1 ring-gray-200 flex flex-col gap-2 justify-center items-center h-[13.5rem]">
          {!image ? (
            <>
              <label
                htmlFor="img-picker"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <img
                  src="/assets/image.png"
                  className="w-14 transition-all cursor-pointer hover:scale-95 active:scale-90"
                  alt="Add Image"
                />
              </label>
              <input
                id="img-picker"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm hidden cursor-pointer"
              />
            </>
          ) : (
            <img
              src={image}
              alt="Image preview"
              className="w-full h-[13.5rem] rounded-lg"
            />
          )}
        </div>
        <div className="flex flex-col mt-3 gap-8 p-1.5">
          <div className="flex items-center gap-3">
            <label htmlFor="category">
              <img
                src="/assets/pen.png"
                className="w-4 transition-all hover:scale-[0.99] active:scale-[0.98]"
                alt="Edit"
              />
            </label>
            <input
              id="category"
              placeholder="Category"
              onChange={(e) => setCategory(e.target.value)}
              required
              className="px-2 text-sm py-2 transition-all active:scale-[0.99] rounded-lg bg-blue-50 text-center text-blue-500 font-semibold placeholder-blue-500 outline-0 border-0"
            />
          </div>
          <div>
            <label htmlFor="title" className="text-xs underline text-gray-600">
              Heading
            </label>
            <div className="flex gap-3 ring-1 ring-gray-200 p-1 mt-1 rounded-lg transition-all active:scale-[0.99]">
              <label htmlFor="title">
                <img src="/assets/pen.png" className="w-4 mt-1" alt="Edit" />
              </label>
              <textarea
                id="title"
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Add a Title"
                className="font-semibold min-h-[3rem] w-full text-lg items-center placeholder-black text-black outline-0 border-0"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="content"
              className="text-xs underline text-gray-600"
            >
              Content
            </label>
            <ReactQuill
              id="content"
              className="mt-1 rounded-lg"
              placeholder="Write something..."
              theme="snow"
              onChange={handleContentChange}
              value={content}
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ size: [] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  ["link", "image", "video"],
                  ["clean"],
                ],
                clipboard: {
                  matchVisual: false,
                },
              }}
              formats={[
                "header",
                "font",
                "size",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "list",
                "bullet",
                "indent",
                "link",
                "image",
                "video",
              ]}
            />
          </div>
          <div className="flex justify-between mt-10 flex-wrap sm:flex-nowrap gap-y-8 w-full items-center gap-5">
            <div className="flex items-center w-full gap-3">
              <div>
                {!avatar ? (
                  <>
                    <label
                      htmlFor="avatar-picker"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <img
                        src="/assets/image.png"
                        className="w-8 h-8 transition-all rounded-sm cursor-pointer hover:scale-[0.99] active:scale-[0.98]"
                        alt="Add Avatar"
                      />
                    </label>
                    <input
                      id="avatar-picker"
                      type="file"
                      accept="image/*"
                      required
                      onChange={handleAvatarChange}
                      className="text-xs hidden cursor-pointer"
                    />
                  </>
                ) : (
                  <img
                    src={avatar}
                    alt="Avatar preview"
                    className="w-8 h-8 rounded-lg"
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="text-xs underline text-gray-600"
                  htmlFor="author"
                >
                  Author
                </label>
                <input
                  placeholder="Enter Author's Name"
                  id="author"
                  required
                  onChange={(e) => setAuthor(e.target.value)}
                  className="text-sm pt-1 transition-all active:scale-[0.99] font-medium border-0 outline-0 text-gray-400"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-xs underline text-gray-600"
                htmlFor="date-picker"
              >
                Date
              </label>
              <input
                placeholder="Select Date"
                id="date-picker"
                onChange={(e) => setDate(e.target.value)}
                type="date"
                required
                className="text-sm rounded-lg pt-1 transition-all active:scale-[0.99] font-medium border-0 outline-0 text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap text-sm justify-end items-center gap-4 my-6">
        <button
          type="submit"
          className="p-2.5 px-5 rounded-xl transition-all hover:scale-[0.98] active:scale-[0.96] text-white font-medium bg-blue-500"
        >
          Save
        </button>
        <button
          onClick={() => {
            setImage(null);
            setAvatar(null);
          }}
          type="reset"
          className="py-2.5 px-5 bg-[#f31260] hover:scale-[0.98] active:scale-[0.96] transition-all text-white font-medium rounded-xl"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
