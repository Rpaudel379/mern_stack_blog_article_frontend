import { Routes, Route } from "react-router-dom";
import Auth from "@pages/Auth";
import Dashboard from "@pages/Dashboard";
import Edit from "@pages/Dashboard/Edit";
import Home from "@pages/Home";
import Blog from "@pages/Blog";
import AddBlog from "@pages/Blog/AddBlog";
import EditBlog from "@pages/Blog/EditBlog";
import NotFound from "@pages/NotFound";
import ProtectedRoutes from "@components/ProtectedRoutes";
import MyBlogs from "@/src/components/Home/MyBlogs";

function App() {
  return (
    <div className="flex grow flex-col px-6 pt-8 md:px-10 lg:px-20">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route element={<ProtectedRoutes />}>
            <Route path="myblogs" element={<MyBlogs />} />
          </Route>
        </Route>
        <Route path="/blog/:blogId" element={<Blog />} />

        {/* protected routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/account">
            <Route index element={<Dashboard />} />
            <Route path="edit" element={<Edit />} />
          </Route>

          <Route path="/blog">
            <Route path="add" element={<AddBlog />} />
            <Route path="edit/:blogId" element={<EditBlog />} />
          </Route>
        </Route>
        {/* protected <routes></routes> */}

        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
