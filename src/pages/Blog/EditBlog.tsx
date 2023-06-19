import TextEditor from "@/src/components/Editor";

import useBlog from "@hooks/useBlog";

const EditBlog = () => {
  const { error, loading, handleSubmit, setNewContent, content } = useBlog();

  return (
    <div className="mx-auto py-5">
      <div className="mx-auto">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white sm:text-3xl">
            Edit your blog
          </h2>
        </div>

        {/* card */}

        <div className=" relative mt-5 rounded-xl border bg-white dark:border-slate-700 dark:bg-slate-800 sm:mt-10 ">
          {error && <p className="my-5 text-red-600">{error}</p>}

          <form onSubmit={handleSubmit}>
            {loading && (
              <div className="absolute left-0 top-0 z-30 flex h-full w-full items-center justify-center bg-slate-100/80 ">
                <div
                  className="inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-current border-t-transparent text-slate-600"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}

            <div>
              <TextEditor blogContent={setNewContent} initialValue={content} />
            </div>

            <div className="mt-6 grid">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-slate-500 px-4 py-3 font-semibold text-white transition-all hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
              >
                Edit blog
              </button>
            </div>
          </form>
        </div>

        {/* end of card */}
      </div>
    </div>
  );
};

export default EditBlog;
/* 
<div >
<div className="my-5 sm:mb-8">
  <label className={`mb-2 block text-sm font-medium dark:text-white `}>
    Blog Title
  </label>
  <input
    name="title"
    type="text"
    className="block w-full rounded-md border-slate-200 px-4 py-3 text-sm focus:border-slate-500 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 sm:p-4"
    placeholder="Blog Title"
    value={blog?.title}
  />
</div>
<div>
  <TextEditor blogContent={setContent} initialValue={blog?.content} />
</div>
</div> */
