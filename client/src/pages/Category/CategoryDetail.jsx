import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RouteAddCategory, RouteEditCategory } from "@/helpers/RouteName";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import Loading from "@/components/Loading";

const CategoryDetail = () => {
  const {
    data: categoryData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all`, {
    method: "get",
    credentials: "include",
  });
  console.log(categoryData)
  if (loading) return <Loading />;
  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <Button asChild>
              <Link to={RouteAddCategory}>Add Category</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryData && categoryData.category.length > 0 ? 
              categoryData.category.map(category => 
                <TableRow key={category._id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.slug}</TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="outline" className="hover:bg-blue-600 hover:text-white" asChild>
                    <Link to={RouteEditCategory(category._id)}>
                    <FiEdit />
                    </Link>
                  </Button>
                  <Button variant="outline" className="hover:bg-blue-600 hover:text-white" asChild>
                    <Link to={RouteEditCategory(category._id)}>
                    <FaRegTrashAlt />
                    </Link>
                  </Button>
                </TableCell>
                
              </TableRow>
              ) 
              : 
              <TableRow>
                <TableCell colSpan="3">
                  No category found. Please add some category.
                </TableCell>
              </TableRow>
              }
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
export default CategoryDetail;
