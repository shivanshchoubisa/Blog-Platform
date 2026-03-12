import express from "express";
import { addBlog, deleteBlog, editBlog, showAllBlog, updateBlog } from "../controllers/Blog.controller.js";
import upload from "../config/multer.js";



const BlogRoute = express.Router();

BlogRoute.post("/add", upload.single('file'), addBlog)
BlogRoute.put("/update/:blogid", upload.single('file'), updateBlog)
BlogRoute.get("/edit/:blogid", editBlog)
BlogRoute.delete("/delete/:blogid", deleteBlog)
BlogRoute.get("/all", showAllBlog)

export default BlogRoute;
