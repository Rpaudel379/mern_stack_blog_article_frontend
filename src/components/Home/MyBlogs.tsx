import { useEffect, useState } from "react";
import { useAppSelector } from "@/src/hooks/states";
import { Link, useSearchParams } from "react-router-dom";
import { getUserBlogs } from "@/src/api";
import SkeletonBlog from "@components/Home/SkeletonBlog";
import moment from "moment";
import { extractFirstParagraph } from "@utilities/richTextExtractor";

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

const MyBlogs = () => {
  const user = useAppSelector((state) => state.authReducer.user);

  const [searchParams, setSearchParams] = useSearchParams();

  const perPage = 4;
  const pageNo = parseInt(searchParams.get("page") as string) || 1;
  console.log(pageNo);

  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const [totalBlogs, setTotalBlogs] = useState(0);

  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(totalBlogs / perPage);
  const generatePageNumbers = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  );

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await getUserBlogs(user._id as string, pageNo);
        setBlogs(response.data.blogs);
        setTotalBlogs(response.data.totalBlogs);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getBlogs();
  }, [user, pageNo]);

  return (
    <div className="relative grow">
      {loading ? (
        <SkeletonBlog />
      ) : (
        <div className="mx-auto py-10 lg:py-10">
          {!blogs.length ? (
            <>
              <p className=" mt-20 text-center text-4xl text-slate-700 dark:text-slate-200">
                no blogs
              </p>
            </>
          ) : (
            <>
              {/* grid */}
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-y-16">
                {/* card */}

                {blogs.map((blog) => (
                  <Link
                    className="group overflow-hidden rounded-xl"
                    to={`/blog/${blog._id}`}
                    key={blog._id}
                  >
                    <div className="sm:flex">
                      <div className="relative h-44 w-full flex-shrink-0 overflow-hidden rounded-xl sm:w-56">
                        <img
                          className="absolute left-0 top-0 h-full w-full rounded-xl object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                          src={
                            blog.coverImage ||
                            "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image-300x203.jpg"
                          }
                          alt="Image Description"
                        />
                      </div>

                      <div className="mt-4 grow px-4 sm:ml-6 sm:mt-0 sm:px-0">
                        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-gray-300 dark:group-hover:text-white lg:line-clamp-2">
                          {blog.title.slice(0, 50)}
                        </h3>
                        <p className="mt-3 text-gray-600 dark:text-gray-400 lg:line-clamp-3">
                          {extractFirstParagraph(blog.content)}
                        </p>
                        <div className="mt-3 text-slate-600 dark:text-slate-400">
                          <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                            By {blog.userId.username}
                          </h4>
                          <p className="text-xs text-slate-800 dark:text-slate-200">
                            {moment(new Date(blog.createdAt)).fromNow()}
                            {/* <br />
                           {new Date(blog.createdAt).toDateString()} */}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}

                {/* end of card */}
              </div>
            </>
          )}
          {/* end of grid */}

          <div className="absolute bottom-0 w-full py-5">
            <div className="flex items-center justify-center space-x-2">
              {generatePageNumbers.map((page) => (
                <button
                  key={page}
                  type="button"
                  className={`${
                    page === (pageNo as number)
                      ? "bg-blue-500 text-white"
                      : "text-gray-500 hover:text-blue-600"
                  }  inline-flex h-10 w-10 items-center rounded-full p-4 text-sm font-medium`}
                  onClick={() => {
                    setSearchParams(`page=${page}`);
                  }}
                  disabled={page === (pageNo as number)}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
