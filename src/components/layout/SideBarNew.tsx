import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../Modal";
import { useSidebar } from "../../SidebarContext";

interface MenuItem {
  icon: string;
  label: string;
  path?: string; // Optional property for navigation
  action?: () => void; // Optional callback for specific actions
}


interface SidebarProps {
  menuItem: MenuItem[];
  username: string;
  actionText: string;
  actionPath: string;
  actionIcon?: string; // Optional property for the icon
  profileImageSrc?: string;
  breakIntervals?: number[];
  collapsedWidth?: string;
  expandedWidth?: string;
}


interface SidebarMenuListProps {
  sidebarActive: boolean;
  menuItems: MenuItem[];
  breakIntervals?: number[];
}


const SidebarMenuList: React.FC<SidebarMenuListProps> = ({ sidebarActive, menuItems, breakIntervals }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  let itemsToRender: JSX.Element[] = [];
  let itemCount = 0;
  let intervalIndex = 0;

  const iconSize = sidebarActive ? "w-6 h-6" : "w-8 h-8";

  // Set selected menu based on current path
  useEffect(() => {
    const activeMenuItem = menuItems.find((item) => item.path === location.pathname);
    setSelectedMenu(activeMenuItem?.label || null);
  }, [location.pathname, menuItems]);

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

  // Fallback for image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Replace with an inline SVG if the image fails to load
    e.currentTarget.src = "data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A//www.w3.org/2000/svg'%20viewBox%3D'0%200%2048%2048'%3E%3Cpath%20d%3D'M24%200C10.745%200%200%2010.745%200%2024%200s24%2010.745%2024%2024%20-10.745%2024%20-24%2024%20Z'%20fill%3D'%23FFD700'%2F%3E%3C/svg%3E"; // Replace with your fallback SVG
  };

  return (
    <div className="my-[2rem] overflow-y-auto">
      <div className={window.innerHeight < 400 ? "h-[10rem]" : "h-full"}>
        <ul>
          {menuItems.map((item, index) => {
            itemCount++;

            const handleItemClick = () => {
              setSelectedMenu(item.label);
              if (item.path) {
                navigate(item.path);
              } else if (item.action) {
                item.action();
              }
              if (item.label === "Logout") {
                handleLogoutClick();
              }
            };

            // Add break interval logic
            if (sidebarActive && breakIntervals && itemCount === breakIntervals[intervalIndex]) {
              itemsToRender.push(<hr key={`hr-${index}`} className="my-4" />);
              itemCount = 0;
              intervalIndex = (intervalIndex + 1) % breakIntervals.length;
            }

            itemsToRender.push(
              <li
                key={index}
                className={`flex items-center gap-[1rem] mb-[1rem] cursor-pointer ${selectedMenu === item.label ? "text-[#45F882]" : "text-white"}`}
                onClick={handleItemClick}
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className={`${iconSize} ${sidebarActive ? "" : "mx-auto"}`}
                  onError={handleImageError} // Attach error handler for icon fallback
                />
                {sidebarActive && (
                  <h1 className="capitalize poppins-regular text-[1rem]">
                    {item.label}
                  </h1>
                )}
              </li>
            );

            return null;
          })}

          {/* Render items */}
          {itemsToRender}
        </ul>
      </div>

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



const profileCard = (sidebarActive: boolean, userName: string) => {
  return (
    <div
      className={`bg-gradient-to-r w-${sidebarActive ? "full" : "fit"} from-[#45F882] to-[#FFBE18] p-[1px] rounded-[0.5rem] cursor-pointer`}
    >
      <div
        className={`bg-[#0E1B22] w-${sidebarActive ? "full" : "fit"} p-[0.5rem] rounded-[0.5rem]`}
      >
        <div className="flex justify-between items-center">
          {/* Left Section */}
          <div className="flex gap-[1rem] items-center">
            <img
              src="/affiliatePanel/icons/profile_icon.png"
              alt=""
              className={`h-[20px] w-auto ${sidebarActive ? "" : "mx-auto"}`}
            />
            {sidebarActive && (
              <div>
                <h1 className="capitalize text-white poppins-regular text-[12px]">
                  {userName}
                </h1>
              </div>
            )}
          </div>

          {/* Right Section */}
          {sidebarActive && (
            <div>
              <img
                src="/icons/edit.png"
                alt="Edit Icon"
                className="h-[16px] w-[16px] cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


const Sidebar: React.FC<SidebarProps> = ({
  username,
  menuItem,
  actionIcon,
  actionText,
  actionPath,
  breakIntervals,
  collapsedWidth = 'w-[5%]',
  expandedWidth = 'w-[22%]',
}) => {
  const { sidebarActive, toggleSidebar, setSidebarActive } = useSidebar(); // Access the context
  const navigate = useNavigate();

  // Handle window resizing and set sidebar state based on the window width
  useEffect(() => {
    const screenWidthListener = () => {
      if (window.innerWidth >= 768) {
        setSidebarActive(true);  // Ensure sidebar is active on large screens
      } else {
        setSidebarActive(false); // Hide sidebar on smaller screens
      }
    };

    screenWidthListener(); // Initial check on mount

    window.addEventListener('resize', screenWidthListener);

    return () => {
      window.removeEventListener('resize', screenWidthListener);
    };
  }, [setSidebarActive]);

  return (
    <div
      className={`absolute top-0 left-0 min-h-screen ${sidebarActive ? expandedWidth : collapsedWidth
        } bg-[#0E1B22] opacity-90 flex-shrink-0`}
    >
      <div className="absolute top-0 w-full h-full px-[0.5rem] xl:px-[1rem] py-[0.857rem] flex flex-col">
        <div className="flex w-full justify-center">
          {profileCard(sidebarActive, username)}
        </div>

        {sidebarActive ? (
          <div className="w-full my-[1rem]">
            <button
              className="capitalize bg-[#45F882] rounded-[5px] w-full px-[0.5rem] py-[10px] flex items-center gap-[0.5rem] poppins-bold"
              onClick={() => navigate(actionPath)}
            >
              <img
                src={actionIcon}
                alt="icon"
                className="w-5 h-5"
              />
              {actionText}
            </button>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <button
              className="bg-[#45F882] rounded-[5px] w-fit p-[0.5rem] my-[1rem] flex items-center gap-[0.5rem]"
              onClick={() => navigate(actionPath)}
            >
              <img
                src={actionIcon}
                alt="icon"
                className="w-5 h-5"
              />
              <span className="sr-only">{actionText}</span> {/* For accessibility */}
            </button>
          </div>
        )}

        {/* Scrollable Menu List */}
        <div className="overflow-y-auto flex-grow no-scrollbar">
          <SidebarMenuList sidebarActive={sidebarActive} menuItems={menuItem} breakIntervals={breakIntervals} />
        </div>
      </div>

      {/* Button to toggle sidebar */}
      <div
        onClick={toggleSidebar} // Use the toggleSidebar function from context
        className="hidden md:block absolute top-[4.5rem] rounded-full p-[0.5rem] bg-[#1A1D26] -right-5 cursor-pointer"
      >
        <img src="/affiliatePanel/icons/arrow_left.png" alt="" className={sidebarActive ? "" : "rotate-180"} />
      </div>
    </div>
  );
};

export default Sidebar;
