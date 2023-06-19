import { useState, useEffect } from "react";
import { useAppSelector } from "./states";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { coverImageExtract, extractTitle } from "@utilities/richTextExtractor";
import { addBlog, editBlog, getSingleBlog } from "@api/index";

export default () => {
  const { pathname } = useLocation();

  const [isAddRoute] = useState(pathname === "/blog/add");
  console.log(isAddRoute);

  // edit
  const { blogId } = useParams();
  const [newContent, setNewContent] = useState<string>("");

  const userId = useAppSelector((state) => state.authReducer.user._id);

  const navigate = useNavigate();

  const [error, setError] = useState<string>("");

  const [content, setContent] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    const title = extractTitle(isAddRoute ? content : newContent);
    if (!title.valid) {
      setError(title?.text);
      return;
    }

    const coverImage = coverImageExtract(isAddRoute ? content : newContent);

    // setLoading(true);
    const formData = new FormData();

    formData.append("title", title.text);
    coverImage && formData.append("coverImage", coverImage);
    isAddRoute
      ? formData.append("content", content)
      : formData.append("content", newContent);
    formData.append("userId", userId as string);

    try {
      const response = isAddRoute
        ? await addBlog(formData)
        : await editBlog(blogId as string, formData);
      console.log(await response.data);
      if (response.data.success && response.data.message.includes("created")) {
        navigate("/");
      }
      if (response.data.success && response.data.message.includes("updated")) {
        navigate(`/blog/${blogId}`);
      }
    } catch (error: any) {
      console.log(error);

      setError(error.response.data?.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const singleBlog = async () => {
      try {
        const response = await getSingleBlog(blogId as string);
        setContent(response.data.blog.content);
        console.log(response.data);
      } catch (error: any) {
        setError(error.response.data.message);
      }
      setLoading(false);
    };

    if (!isAddRoute) {
      singleBlog();
    }
  }, [blogId, isAddRoute]);

  return { error, content, loading, handleSubmit, setContent, setNewContent };
};
