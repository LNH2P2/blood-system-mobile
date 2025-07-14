import { Blog } from "../types/blog";
import axiosInstance from "./axiosInstance";

const blogURL = "/blog";

class BlogApi {
  async getBlogs(): Promise<Blog[]> {
    try {
      const res = await axiosInstance.get(blogURL);
      return res.data.data.data;
    } catch (error) {
      console.error("Error fetching blogs: ", error);
      throw error;
    }
  }
  async getBlogById(id: string): Promise<Blog> {
    try {
      const res = await axiosInstance.get(`${blogURL}/${id}`);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching blog by id: ", error);
      throw error;
    }
  }
  async createBlog(blog: Partial<Blog>) {
    try {
      const res = await axiosInstance.post(blogURL, blog);
      return res.data.data;
    } catch (error) {
      console.error("Error creating blog: ", error);
      throw error;
    }
  }
  async updateBlog(id: string, blog: Partial<Blog>) {
    try {
      const res = await axiosInstance.patch(`${blogURL}/${id}`, blog);
      return res.data.data;
    } catch (error) {
      console.error("Error updating blog: ", error);
      throw error;
    }
  }
  async deleteBlog(id: string) {
    try {
      const res = await axiosInstance.delete(`${blogURL}/${id}`);
      return res.data.data;
    } catch (error) {
      console.error("Error deleting blog: ", error);
      throw error;
    }
  }
}

const blogApi = new BlogApi();

export default blogApi;
