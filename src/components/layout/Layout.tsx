import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./SideBarNew"; // Adjust import path accordingly
import { sidebarMenuItems } from "../../data/data";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();

    // Routes that should not display the sidebar
    const routesWithoutSidebar = [
        "/signup",
        "/login",
        "/verify-2fa",
        "/forgot-password",
        "/reset-password",
        "/404"
    ];


    const showSidebar = !routesWithoutSidebar.includes(location.pathname);


    return (
        <div className="bg-cover bg-no-repeat bg-center min-h-screen flex w-screen" style={{ backgroundImage: "url(/adminlist.png)" }}>
                {showSidebar && (
                    <Sidebar
                        username="Admin" // Example username; replace dynamically if needed
                        menuItem={sidebarMenuItems}
                        actionIcon={"/icons/affiliate_2.png"}
                        actionText={"Dashboard"}
                        actionPath={"/affiliate-tournaments"}
                        breakIntervals={[3, 1, 4, 4, 2, 2, 3,8,5]}
                    />
                )}
            <div className="flex-grow">{children}</div>
        </div>
    );
};

export default Layout;
