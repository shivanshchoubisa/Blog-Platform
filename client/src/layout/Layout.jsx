import { Outlet } from "react-router-dom"
import { AppSidebar } from "../components/AppSidebar"
import Topbar from "../components/Topbar"
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import Footer from "../components/Footer"

const Layout = () => {
  return (
    <SidebarProvider>
      <Topbar />
      <AppSidebar />
      <main className="w-full">
        <div className="w-full min-h-[calc(100vh-40px)] py-30 px-10">
          <Outlet />
        </div>
        
        <Footer />
      </main>
    </SidebarProvider>
  )
}
export default Layout