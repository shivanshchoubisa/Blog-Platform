import cloudinary from "../config/cloudinary.js";
import { handleError } from "../helpers/handleError.js";
import Blog from "../models/blog.model.js";
import {encode} from 'entities'

export const addBlog = async (req, res, next) => {
    try {
        const data = JSON.parse(req.body.data)
        let featuredImage = ''
        if (req.file) {
              const uploadResult = await cloudinary.uploader
                .upload(
                  req.file.path,
                  {folder: "tdp-blog", resource_type: "auto"}
                )
                .catch((error) => {
                  next(handleError(500, error.message))
                });
        
                featuredImage = uploadResult.secure_url
            }

        const blog = Blog({
            author: data.author,
            blog: data.blog,
            title: data.title,
            slug: data.slug,
            featuredImage: featuredImage,
            blogContent: encode(data.blogContent),
        })
        await blog.save()

        res.status(200).json({
            success: true,
            message: 'Blog added successfully.'
        })
    } catch (error) {
       next(handleError(500, error.message)) 
    }
}
export const editBlog = async (req, res, next) => {
    try {
        const {blogid} = req.params
        const blog = await Blog.findById(blogid).populate('category', 'name')
        if (!blog) {
            next(handleError(404, "Category not found."))
        }
        res.status(200).json({
            blog
        })
    } catch (error) {
       next(handleError(500, error.message)) 
    }
}
export const updateBlog = async (req, res, next) => {
    try {
        const {blogid} = req.params
        const data = JSON.parse(req.body.data)
        const blog = await Blog.findById(blogid)

        blog.category = data.category
        blog.title = data.title
        blog.slug = data.slug
        blog.blogContent = encode(data.blogContent)

        let featuredImage = blog.featuredImage

        if (req.file) {
              const uploadResult = await cloudinary.uploader
                .upload(
                  req.file.path,
                  {folder: "tdp-blog", resource_type: "auto"}
                )
                .catch((error) => {
                  next(handleError(500, error.message))
                });
        
                featuredImage = uploadResult.secure_url
            }

            blog.featuredImage = featuredImage

            await blog.save()
       

        res.status(200).json({
            success: true,
            message: 'Blog updated successfully.'
        })
    } catch (error) {
       next(handleError(500, error.message)) 
    }
}
export const deleteBlog = async (req, res, next) => {
    try {
        const {blogid} = req.params
        await Blog.findByIdAndDelete(blogid)
        res.status(200).json({
            success: true,
            message: "BLog deleted successfully.",
        })
    } catch (error) {
       next(handleError(500, error.message)) 
    }
}
export const showAllBlog = async (req, res, next) => {
    try {
        const blog = await Blog.find().populate('author', 'name').populate('category', 'name').sort({createdAt: -1}).lean().exec()
        res.status(200).json({
            blog
        })
    } catch (error) {
       next(handleError(500, error.message)) 
    }
}