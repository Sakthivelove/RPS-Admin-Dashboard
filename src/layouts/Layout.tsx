import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/layout/SideBar";
import { sidebarMenuItems } from "../data/sideBarMenuItems";
import { useNavigate } from "react-router-dom";
import Modal from "../components/common/Modal";
import { useAuth } from "../context/AuthContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { setUser } = useAuth();  
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

    // Handle Logout Click
    const handleLogoutClick = () => {
        setLogoutModalOpen(true);
    };

    // Confirm logout
    const handleConfirmLogout = () => {
        setLogoutModalOpen(false);

        // Perform logout actions
        console.log("Logging out user...");

        // Clear user data from context
        setUser(null);  // Clear user data in context

        // Remove auth token from local storage
        localStorage.removeItem("token"); 

        // Clear session storage if needed
        sessionStorage.clear();

        // Redirect to login page
        navigate("/login");
    };

    // Handle Close Modal
    const handleCloseLogoutModal = () => {
        setLogoutModalOpen(false);
    };

    // Routes that should not display the sidebar
    const routesWithoutSidebar = [
        "/signup",
        "/login",
        "/verify-2fa",
        "/forgot-password",
        "/reset-password",
        "/404",
        "/test/sidebartablelayout"
    ];

    const showSidebar = !routesWithoutSidebar.includes(location.pathname);

    return (
        <div className="bg-cover bg-no-repeat bg-center min-h-screen flex w-screen" style={{ backgroundImage: "url(/adminlist.png)" }}>
            {showSidebar && (
                <Sidebar
                    username="Admin"
                    onLogoutClick={handleLogoutClick} // Pass the handleLogoutClick here
                    menuItem={sidebarMenuItems}
                    actionIcon={"/icons/affiliate_2.png"}
                    actionText={"Dashboard"}
                    actionPath={"/dashboard"}
                    // breakIntervals={[3, 1, 4, 4, 2, 2, 3, 8, 5]}
                />
            )}
            <div className="flex-grow">{children}</div>

            {/* Modal for Logout Confirmation */}
            <Modal
                isOpen={isLogoutModalOpen}
                onClose={handleCloseLogoutModal}
                title="Confirm Logout"
                content="Are you sure you want to log out?"
                onConfirm={handleConfirmLogout}
                buttons={[
                    { text: "Yes", onClick: handleConfirmLogout, image: "green" },
                    { text: "No", onClick: handleCloseLogoutModal, image: "yellow" },
                ]}
            />
        </div>
    );
};

export default Layout;
