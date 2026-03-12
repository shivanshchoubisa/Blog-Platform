import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import moment from "moment"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RouteBlogAdd, RouteBlogEdit } from "@/helpers/RouteName";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/Loading";
import { deleteData } from "@/helpers/handleDelete";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";

const BlogDetail = () => {
  const [refreshData, setRefreshData] = useState(false)
    const {
      data: blogData,
      loading,
      error,
    } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/all`, {
      method: "get",
      credentials: "include",
    }, [refreshData]);
    
    const handleDelete = (id) => {
        const response = deleteData(`${getEnv("VITE_API_BASE_URL")}/blog/delete/${id}`)
        if(response){
          setRefreshData(!refreshData)
          showToast('success', 'Data Deleted.')
        } else{
          showToast('error', 'Data not Deleted.')
        }
    }
  
    if (loading) return <Loading />;
  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <Button asChild>
              <Link to={RouteBlogAdd}>Add Blog</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Dated</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogData && blogData.blog.length > 0 ? (
                blogData.blog.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell>{blog?.author?.name}</TableCell>
                    <TableCell>{blog?.category?.name}</TableCell>
                    <TableCell>{blog.title}</TableCell>
                    <TableCell>{blog.slug}</TableCell>
                    <TableCell>{moment(blog?.createdAt).format('DD-MM-YYYY')}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant="outline"
                        className="hover:bg-blue-600 hover:text-white"
                        asChild
                      >
                        <Link to={RouteBlogEdit(blog._id)}>
                          <FiEdit />
                        </Link>
                      </Button>
                      <Button 
                        variant="outline"
                        className="hover:bg-blue-600 hover:text-white"
                        asChild
                        onClick={() => handleDelete(blog._id)}
                      >
                        <Link to={RouteBlogEdit(blog._id)}>
                          <FaRegTrashAlt />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="3">
                    No blog found. Please add some blog.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
export default BlogDetail