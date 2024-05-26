import { useState, useEffect, useRef } from "react";
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

  const quillRef = useRef(null);
  const inputRef = useRef(null);
  const avatarRef = useRef(null);
  const labelRef = useRef(null);

  const [blogsDataArr, setBlogsDataArr] = blogsData();

  const navigate = useNavigate();

  const handleImageChange = () => {
    const file = inputRef.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imgURL = reader.result;
        setImage(imgURL);
        const range = quillRef.current.getEditor().getSelection();
        quillRef.current
          .getEditor()
          .insertEmbed(range ? range.index : 0, "image", imgURL);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarChange = () => {
    const file = avatarRef.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imgURL = reader.result;
        setAvatar(imgURL);
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
        avatar: avatar ? avatar : "/assets/avatar.png",
        author: author,
        date: date,
      };
      setBlogsDataArr((prevState) => {
        return [blogToAdd, ...prevState];
      });
      const timer = setTimeout(() => {
        navigate("/");
      }, 0);
      return () => clearTimeout(timer);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const quill = quillRef.current.getEditor();

    const handleImageInsertion = () => {
      inputRef.current.click();
    };

    labelRef?.current?.addEventListener("click", handleImageInsertion);

    return () => {
      labelRef?.current?.removeEventListener("click", handleImageInsertion);
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem("blogsDataArr")) {
      setBlogsDataArr(JSON.parse(localStorage.getItem("blogsDataArr")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("blogsDataArr", JSON.stringify(blogsDataArr));
  }, [blogsDataArr]);

  return (
    <form onSubmit={addBlog} className="p-1.5 py-2.5 max-w-xl mx-auto">
      <h5 className="font-bold text-lg">Add a Blog!</h5>
      <div className="rounded-lg p-2 mt-4 ring-1 ring-gray-200 sm:p-2.5 min-h-[23rem]">
        <div className="rounded-lg w-full flex flex-col gap-2 justify-center items-center h-[13.5rem]">
          <label ref={labelRef} htmlFor="img-picker">
            {image ? (
              <img
                src={image}
                alt="Image preview"
                className="h-[13.5rem] cursor-pointer rounded-lg"
              />
            ) : (
              <img
                src="/assets/image.png"
                className="w-14 transition-all cursor-pointer hover:scale-[0.98] active:scale-[0.96]"
                alt="Add Image"
              />
            )}
          </label>
          <input
            ref={inputRef}
            type="file"
            required
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <ReactQuill
            ref={quillRef}
            theme="snow"
            className="hidden"
            modules={{ toolbar: false }}
          />
        </div>
        <div className="flex flex-col mt-3 gap-8 p-1.5">
          <div className="flex items-center gap-3">
            <input
              id="category"
              name="category"
              placeholder="Category"
              onChange={(e) => setCategory(e.target.value)}
              required
              className="p-2 max-w-full transition-all active:scale-[0.99] rounded-lg bg-blue-50 text-center text-blue-500 font-semibold placeholder-blue-500 outline-0 border-0"
            />
          </div>
          <div>
            <label htmlFor="title" className="text-xs text-gray-600">
              Heading
            </label>
            <div className="flex gap-3 ring-1 ring-gray-200 p-2 mt-1 rounded-lg transition-all active:scale-[0.99]">
              <textarea
                id="title"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Add a Title"
                className="font-semibold min-h-[3rem] w-full text-lg items-center placeholder-black text-black outline-0 border-0"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-600">Content</label>
            <ReactQuill
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
                <label
                  htmlFor="avatar-picker"
                  className="block text-sm font-medium text-gray-700"
                >
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Avatar preview"
                      className="w-6 h-6 cursor-pointer rounded-md"
                    />
                  ) : (
                    <img
                      src="/assets/avatar.png"
                      className="w-6 h-6 transition-all rounded-md cursor-pointer hover:scale-[0.98] active:scale-[0.96]"
                      alt="Add Avatar"
                    />
                  )}
                </label>
                <input
                  id="avatar-picker"
                  ref={avatarRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleAvatarChange}
                />
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  modules={{ toolbar: false }}
                  className="hidden"
                />
                <input
                  id="avatar-picker"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-600" htmlFor="author">
                  Author
                </label>
                <input
                  placeholder="Enter Author's Name"
                  id="author"
                  name="author"
                  required
                  onChange={(e) => setAuthor(e.target.value)}
                  className="text-sm pt-1 transition-all active:scale-[0.99] font-medium border-0 outline-0 text-gray-400"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-600" htmlFor="date-picker">
                Date
              </label>
              <input
                placeholder="Select Date"
                id="date-picker"
                name="date-picker"
                onChange={(e) => setDate(e.target.value)}
                type="date"
                required
                className="text-sm pt-1 transition-all active:scale-[0.99] font-medium border-0 outline-0 text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap text-sm justify-end items-center gap-4 my-6">
        <button
          onClick={() => {
            setImage(null);
            setAvatar(null);
            setContent(null);
          }}
          type="reset"
          className="py-2.5 px-2 hover:scale-[0.98] active:scale-[0.96] transition-all text-[#f31260] font-medium rounded-xl"
        >
          Reset
        </button>
        <button
          type="submit"
          className="p-2.5 px-5 rounded-xl transition-all hover:scale-[0.98] active:scale-[0.96] text-white font-medium bg-blue-500"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
