import axios from "axios";
import { store } from "@states/store";

const token = store.getState().authReducer.token;

const API = axios.create({
  baseURL: import.meta.env.VITE_backend,
  withCredentials: true,
});

export const login = (formData: FormData) =>
  API.post("/api/auth/login", formData);

export const register = (formData: FormData) =>
  API.post("/api/auth/register", formData);

export const editAccount = (formData: FormData) =>
  API.patch(`/api/auth/editacc`, formData);

export const deleteAccount = (userId: string) =>
  API.delete(`/api/auth/editacc`, { data: { userId } });

export const addBlog = (formData: FormData) =>
  API.post("/api/blog/createblog", formData);

export const getAllBlogs = (pageNo: number) =>
  API.get("/api/blog", { params: { pageNo } });

export const getUserBlogs = (id: string, pageNo: number) =>
  API.post(
    `/api/blog/${id}`,
    { pageNo },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getSingleBlog = (id: string) => API.get(`/api/blog/${id}`);

export const editBlog = (id: string, formData: FormData) =>
  API.patch(`/api/blog/${id}`, formData);

export const deleteBlog = (id: string) => API.delete(`/api/blog/${id}`);

/*  headers: {
    "Content-Type": "multipart/form-data",
  }, */

/*   headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  }, */
