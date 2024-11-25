import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./SideBarNew"; // Adjust import path accordingly
import { sidebarMenuItems } from "../../constants/constants";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();

    // Routes that should not display the sidebar
    const routesWithoutSidebar = [
        "/signup",
        "/login",
        "/forgot-password",
        "/create-admin-tournament",
        "/create-new-rock-tournament",
        "/create-new-admin-tournament",
    ];


    const showSidebar = !routesWithoutSidebar.includes(location.pathname);


    return (
        <div className="bg-cover bg-no-repeat bg-center min-h-screen flex" style={{ backgroundImage: "url(/adminlist.png)" }}>
            {showSidebar && (
                <Sidebar
                    username="Admin" // Example username; replace dynamically if needed
                    menuItem={sidebarMenuItems}
                    actionIcon={"/affiliate_2.png"}
                    actionText={"Dashboard"}
                    actionPath={"/create-admin-tournament"}
                    breakIntervals={[3, 3, 3, 3, 2, 2, 5]}
                />
            )}
            <div className="flex-grow">{children}</div>
        </div>
    );
};

export default Layout;
