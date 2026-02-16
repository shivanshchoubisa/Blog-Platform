import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"
import { Link } from "react-router-dom"
import logo from "/src/assets/images/logo-white.png"
import { IoHomeOutline } from "react-icons/io5";
import { TbCategory } from "react-icons/tb";
import { GrBlog } from "react-icons/gr";
import { GoComment } from "react-icons/go";
import { FiUsers } from "react-icons/fi";
import { GoDot } from "react-icons/go";


export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="bg-white">
        <img src={logo} alt="logo" width={80} />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IoHomeOutline />
                        <Link to="">Home</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                      <TbCategory />
                        <Link to="">Category</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                      <GrBlog />
                        <Link to="">Blogs</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                      <GoComment />
                        <Link to="">Comments</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                      <FiUsers />
                        <Link to="">Users</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                      <GoDot />
                        <Link to="">Category Item</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                
            </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}