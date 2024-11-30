import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./SideBarNew";
import { sidebarMenuItems } from "../../data/data";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const navigate = useNavigate();
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
        localStorage.removeItem("token"); // Example: Remove auth token from local storage
        sessionStorage.clear(); // Clear session storage if needed

        // Redirect to login
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
                    actionPath={"/affiliate-tournaments"}
                    breakIntervals={[3, 1, 4, 4, 2, 2, 3, 8, 5]}
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
