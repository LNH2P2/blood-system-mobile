import { Blog } from '../types/blog'
import axiosInstance from './axiosInstance'

const blogURL = '/blog'

class BlogApi {
  async getBlogs(): Promise<Blog[]> {
    try {
      const res = await axiosInstance.get(blogURL)
      return res.data.data
    } catch (error) {
      console.error('Error fetching blogs: ', error)
      throw error
    }
  }
  async getBlogById(id: string): Promise<Blog> {
    try {
      const res = await axiosInstance.get(`${blogURL}/${id}`)
      return res.data.data
    } catch (error) {
      console.error('Error fetching blog by id: ', error)
      throw error
    }
  }
}

const blogApi = new BlogApi()

export default blogApi
