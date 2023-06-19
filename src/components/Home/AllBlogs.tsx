import { Link } from "react-router-dom";
import moment from "moment";

import SkeletonBlog from "@components/Home/SkeletonBlog";

import { extractFirstParagraph } from "@utilities/richTextExtractor";

import useDisplayBlogLists from "@hooks/useDisplayBlogLists";
import Pagination from "@components/Pagination";

const AllBlogs = () => {
  const { blogs, loading, generatePageNumbers, pageNo, setSearchParams } =
    useDisplayBlogLists();

  return (
    <div className="relative grow">
      {loading ? (
        <SkeletonBlog />
      ) : (
        <div className="mx-auto mb-16 py-10 lg:py-10">
          {!blogs.length ? (
            <>
              <p className=" mt-20 text-center text-4xl text-slate-700 dark:text-slate-200">
                no blogs
              </p>
            </>
          ) : (
            <>
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-y-16">
                {blogs.map((blog) => (
                  <Link
                    className="group overflow-hidden rounded-xl"
                    to={`blog/${blog._id}`}
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
              </div>
            </>
          )}
          {/* end of grid */}

          <div className="absolute bottom-0 w-full py-5">
            <Pagination generatePageNumbers={generatePageNumbers}
            pageNo={pageNo} setSearchParams={setSearchParams}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
