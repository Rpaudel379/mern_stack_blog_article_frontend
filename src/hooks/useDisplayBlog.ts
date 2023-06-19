import { useState, useEffect } from "react";
import { useAppSelector } from "@/src/hooks/states";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBlog, getSingleBlog } from "@api/index";

interface Blog {
  content: string;
  createdAt: string;
  title: string;
  updatedAt: string;
  userId: {
    username: string;
    _id: string;
  };
  _id: string;
  coverImage?: string;
}

export default () => {
  const userId = useAppSelector((state) => state.authReducer.user._id);

  const navigate = useNavigate();
  const { blogId } = useParams();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (blog?._id) {
      const response = await deleteBlog(blog?._id);
      console.log(response.data);
      if (response.data.success && response.data.message.includes("deleted")) {
        navigate("/");
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    const singleBlog = async () => {
      try {
        const response = await getSingleBlog(blogId as string);
        setBlog(response.data.blog);
      } catch (error: any) {
        setError(error.response.data.message);
      }
      setLoading(false);
    };
    singleBlog();
  }, [blogId]);

  return { userId, loading, error, handleDelete, blog };
};
