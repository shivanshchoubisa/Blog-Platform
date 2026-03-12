import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import slugify from "slugify";
import { useEffect, useState } from "react";
import { getEnv } from "@/helpers/getEnv.js";
import { showToast } from "@/helpers/showToast";
import { useFetch } from "@/hooks/useFetch";
import Dropzone from "react-dropzone";
import Editor from "@/components/Editor";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RouteBlog } from "@/helpers/RouteName";

const AddBlog = () => {
  const navigate = useNavigate()
  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();
  const user = useSelector((state) => state.user)
  const {
    data: categoryData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all`, {
    method: "get",
    credentials: "include",
  });

  const formSchema = z.object({
    category: z.string().min(3, "Category must be atleast 3 characters long."),
    title: z.string().min(3, "Title must be atleast 3 characters long."),
    slug: z.string().min(3, "Slug must be atleast 3 characters long."),
    blogContent: z
      .string()
      .min(3, "Blog Content must be atleast 3 characters long."),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      title: "",
      slug: "",
      blogContent: "",
    },
  });

  const blogTitle = form.watch("title");
  useEffect(() => {
    if (blogTitle) {
      const slug = slugify(blogTitle, { lower: true });
      form.setValue("slug", slug);
    }
  }, [blogTitle]);

  async function onSubmit(values) {
    try {
          const newValues = {...values, author: user.user._id}
          if (!file) {
            showToast('error', 'Image Required')
          }
          const formData = new FormData()
          formData.append("file", file)
          formData.append("data", JSON.stringify(newValues))
          const response = await fetch(
            `${getEnv("VITE_API_BASE_URL")}/blog/add`,
            {
              method: "post",
              credentials: "include",
              body: formData,
            },
          );
          const data = await response.json();
          if (!response.ok) {
            return showToast("error", data.message);
          }
          form.reset()
          setFile()
          setFilePreview()
          navigate(RouteBlog)
          showToast("success", data.message);
        } catch (error) {
          showToast("error", error.message);
        }
  }
  const handleFileSelect = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setFilePreview(preview);
  };
  return (
    <div>
      <Card className="pt-5 max-w-screen-md mx-auto ">
        <CardContent>
          <h1 className="text-2xl font-bold mb-5">Add Blog</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValues={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categoryData &&
                              categoryData.category.length > 0 &&
                              categoryData.category.map((category) => (
                                <SelectItem
                                  key={category._id}
                                  value={category._id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter blog title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your slug" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <span className="block mb-2">Featured Image</span>
                <Dropzone
                  onDrop={(acceptedFiles) => handleFileSelect(acceptedFiles)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="flex justify-center items-center w-36 h-30 border-2 border-dashed rounded">
                        <img src={filePreview} alt="" />
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="blogContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Content</FormLabel>
                      <FormControl>
                        <div className="relative w-full max-w-full overflow-hidden">
                          <Editor
                            initialData={field.value}
                            onChange={(data) => field.onChange(data)}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">
                Add
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
export default AddBlog;
