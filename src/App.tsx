import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("@pages/Home"));

const Dashboard = lazy(() => import("@pages/Dashboard"));

const Edit = lazy(() => import("@pages/Dashboard/Edit"));

const Blog = lazy(() => import("@pages/Blog"));

const AddBlog = lazy(() => import("@pages/Blog/AddBlog"));

const EditBlog = lazy(() => import("@pages/Blog/EditBlog"));

const MyBlogs = lazy(() => import("@components/Home/MyBlogs"));

const Login = lazy(() => import("@pages/Login"));

const Register = lazy(() => import("@pages/Register"));

const NotFound = lazy(() => import("@pages/NotFound"));

const ProtectedRoutes = lazy(() => import("@components/ProtectedRoutes"));

import LoadingPage from "@components/LoadingPage";

function App() {
  return (
    <div className="flex grow flex-col px-6 pt-8 md:px-10 lg:px-20">
      <Suspense fallback={<LoadingPage/>}>
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

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
