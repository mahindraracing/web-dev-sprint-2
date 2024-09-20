import Sidebar from "./components/SideBar";
import AppRoutes from "./routes/AppRoutes";

export default function Layout() {
    return (
        <>
        <div>
        
            <Sidebar/>
            <AppRoutes />  
        </div>
        </>
    )
}