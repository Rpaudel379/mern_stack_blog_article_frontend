import { useState, useEffect } from "react";
import { useAppSelector } from "@hooks/states";
import { useLocation, useSearchParams } from "react-router-dom";
import { getAllBlogs, getUserBlogs } from "@api/index";

interface Blogs {
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
  const user = useAppSelector((state) => state.authReducer.user);

  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [loading, setLoading] = useState(true);

  const perPage = 4;
  const pageNo = parseInt(searchParams.get("page") as string) || 1;
  console.log(pageNo);

  const totalPages = Math.ceil(totalBlogs / perPage);
  const generatePageNumbers = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  );

  useEffect(() => {
    const getBlogs = async () => {
      console.log("hmt");
 
      try {
        const response =
          pathname === "/myblogs"
            ? await getUserBlogs(user._id as string, pageNo)
            : await getAllBlogs(pageNo);

        setBlogs(response.data.blogs);
        setTotalBlogs(response.data.totalBlogs);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getBlogs();
  }, [user, pageNo, pathname]);

  return { blogs, loading, generatePageNumbers, pageNo, setSearchParams };
};
