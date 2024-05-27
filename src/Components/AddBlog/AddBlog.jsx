import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import blogsData from "../../db/BlogsData";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { enqueueSnackbar } from "notistack";
import imageCompression from "browser-image-compression";

const AddBlog = () => {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [author, setAuthor] = useState(null);
  const [date, setDate] = useState(null);
  const [imgPlaceholder, setImgPlaceholder] = useState("/assets/image.png");
  const [avatarPlaceholder, setAvatarPlaceholder] =
    useState("/assets/avatar.png");

  const quillRef = useRef(null);
  const inputRef = useRef(null);
  const avatarRef = useRef(null);
  const labelRef = useRef(null);

  const [blogsDataArr, setBlogsDataArr] = blogsData();

  const navigate = useNavigate();

  const handleImageChange = async () => {
    const options = {
      maxSizeMB: 100 / 1024,
      useWebWorker: true,
    };
    setImgPlaceholder("/assets/loading.png");
    const file = inputRef.current.files[0];
    const compressedFile = await imageCompression(file, options);
    const timer = setTimeout(() => {
      setImgPlaceholder("/assets/image.png");
    }, 0);
    if (compressedFile) {
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

    return () => clearTimeout(timer);
  };

  const handleAvatarChange = async () => {
    const options = {
      maxSizeMB: 50 / 1024,
      useWebWorker: true,
    };
    setAvatarPlaceholder("/assets/loading.png");
    const file = avatarRef.current.files[0];
    const compressedFile = await imageCompression(file, options);
    const timer = setTimeout(() => {
      setAvatarPlaceholder("/assets/avatar.png");
    }, 0);
    if (compressedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const imgURL = reader.result;
        setAvatar(imgURL);
      };
      reader.readAsDataURL(file);
    }

    return () => clearTimeout(timer);
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

      const blogsArr = [...blogsDataArr];
      blogsArr.unshift(blogToAdd);

      try {
        localStorage.setItem("blogsDataArr", JSON.stringify(blogsArr));
        setBlogsDataArr(blogsArr);
        setTimeout(() => {
          navigate("/");
          enqueueSnackbar("The blog has been saved.", {
            variant: "success",
          });
        });
      } catch (error) {
        enqueueSnackbar(
          "The local storage memory capacity has been reached. Please try reducing the size of the images or consider clearing local storage.",
          {
            variant: "warning",
          }
        );
        console.log(error);
      }
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

  return (
    <form onSubmit={addBlog} className="p-1.5 pt-2.5 pb-1 max-w-2xl mx-auto">
      <h5 className="font-bold text-gray-800 text-lg">Add a Blog!</h5>
      <div className="rounded-lg p-2 mt-4 ring-1 ring-gray-200 sm:p-2.5 min-h-[23rem]">
        <div className="rounded-lg w-full flex flex-col gap-2 justify-center items-center h-[13.5rem]">
          <label ref={labelRef}>
            {image ? (
              <img
                src={image}
                alt="Image preview"
                className="h-[13.5rem] cursor-pointer rounded-lg"
              />
            ) : (
              <img
                src={imgPlaceholder}
                className="w-14 transition-all cursor-pointer hover:scale-[0.98] active:scale-[0.96]"
                alt="Add Image"
              />
            )}
          </label>
          <input
            ref={inputRef}
            type="file"
            required
            name="img-picker"
            id="img-picker"
            accept="image/*"
            className="hidden"
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
              className="p-2 max-w-full text-sm transition-all active:scale-[0.99] rounded-lg bg-blue-50 text-center text-blue-500 font-semibold placeholder-blue-500 outline-0 border-0"
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
                className="font-semibold min-h-[3rem] w-full text-base items-center placeholder-black text-black outline-0 border-0"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-600">Content</label>
            <ReactQuill
              className="mt-1 min-w-[300px]"
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
                  ["image", "video"],
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
                "image",
                "video",
              ]}
            />
          </div>
          <div className="flex justify-between mt-8 flex-wrap sm:flex-nowrap gap-y-8 w-full items-center gap-5">
            <div className="flex items-center w-full gap-3">
              <div>
                <label
                  htmlFor="avatar-picker"
                  className="block text-xs font-medium text-gray-700"
                >
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Avatar preview"
                      className="w-6 h-6 cursor-pointer rounded-md"
                    />
                  ) : (
                    <img
                      src={avatarPlaceholder}
                      className="w-6 h-6 transition-all rounded-md cursor-pointer hover:scale-[0.98] active:scale-[0.96]"
                      alt="Add Avatar"
                    />
                  )}
                </label>
                <input
                  id="avatar-picker"
                  name="avatar-picker"
                  ref={avatarRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  modules={{ toolbar: false }}
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
                  className="text-sm pt-1 transition-all active:scale-[0.99] font-medium border-0 outline-0 placeholder-gray-500 text-gray-500"
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
                className="text-sm pt-1 transition-all active:scale-[0.99] font-medium border-0 placeholder-gray-500 outline-0 text-gray-500"
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
          className="py-2.5 px-2 hover:scale-[0.98] active:scale-[0.96] border-0 outline-0 transition-all text-[#f31260] font-medium rounded-xl"
        >
          Reset
        </button>
        <button
          type="submit"
          onClick={() => {
            if (category && title && content && author && date && !image) {
              enqueueSnackbar("Please include an image to proceed.", {
                variant: "info",
              });
            } else if (!category || !title || !content || !author || !date) {
              enqueueSnackbar("Please complete all fields to proceed.", {
                variant: "info",
              });
            }
          }}
          className="p-2.5 px-5 border-0 outline-0 rounded-xl transition-all hover:scale-[0.98] active:scale-[0.96] text-white font-medium bg-blue-500"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
