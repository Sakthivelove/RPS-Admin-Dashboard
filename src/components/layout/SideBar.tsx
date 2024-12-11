import React, { useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";


interface MenuItem {
  icon: ReactNode | string;
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
  onLogoutClick?: () => void; // Added onLogoutClick prop, which is an optional function
}



interface SidebarMenuListProps {
  sidebarActive: boolean;
  menuItems: MenuItem[];
  breakIntervals?: number[];
  onLogoutClick?: () => void;
}

const SidebarMenuList: React.FC<SidebarMenuListProps> = ({
  sidebarActive,
  menuItems,
  breakIntervals,
  onLogoutClick,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  let itemsToRender: JSX.Element[] = [];
  let itemCount = 0;
  let intervalIndex = 0;

  const iconSize = sidebarActive ? "w-6 h-6" : "w-8 h-8";


  // Set selected menu based on current path
  useEffect(() => {
    console.log("Current pathname:", location.pathname);
    console.log("Available menu items:", menuItems);

    // Sort menu items by path length (descending)
    const sortedMenuItems = [...menuItems].sort((a, b) => {
      const aPathLength = a.path ? a.path.split('/').length : 0;
      const bPathLength = b.path ? b.path.split('/').length : 0;
      return bPathLength - aPathLength;
    });

    console.log("Sorted menu items by path length:", sortedMenuItems);

    // Check for exact match first
    const exactMatch = sortedMenuItems.find((item) => item.path === location.pathname);
    if (exactMatch) {
      console.log(`Exact match found: ${exactMatch.label} (path: ${exactMatch.path})`);
      setSelectedMenu(exactMatch.label);
      return;
    }

    // Check for partial match
    const partialMatch = sortedMenuItems.find((item) => {
      if (!item.path) return false;

      const pathSegments = item.path.split('/').filter(Boolean);
      const locationSegments = location.pathname.split('/').filter(Boolean);

      console.log(`Checking partial match for item: ${item.label} (path: ${item.path})`);
      console.log("Path segments:", pathSegments);
      console.log("Location segments:", locationSegments);

      // Check if the menu item's path can logically match the current path
      if (pathSegments.length <= locationSegments.length) {
        const match = pathSegments.every((segment, index) => {
          if (segment.startsWith(":")) {
            // For dynamic segments (e.g., :id), ensure there's a corresponding value
            return locationSegments[index] && locationSegments[index].length > 0;
          }
          // For static segments, match exactly
          return segment === locationSegments[index];
        });

        if (match) {
          console.log(`Partial match found for item: ${item.label} (path: ${item.path})`);
          return true;
        }
      }

      return false;
    });

    if (partialMatch) {
      console.log(`Matched item via partial match: ${partialMatch.label}`);
      setSelectedMenu(partialMatch.label);
    } else {
      console.log("No match found.");
      setSelectedMenu(null);
    }
  }, [location.pathname, menuItems]);



  const handleItemClick = (item: MenuItem) => {
    console.log("Item clicked:", item);
    console.log("Current selectedMenu:", selectedMenu);
    console.log("Navigating to path:", item.path || "No path, triggering action.");

    setSelectedMenu(item.label);
    if (item.path) {
      navigate(item.path);
    } else if (item.action) {
      console.log("Executing custom action for item:", item.label);
      item.action();
    }
    if (item.label === "Logout" && onLogoutClick) {
      console.log("Logout clicked, executing logout callback.");
      onLogoutClick();
    }
  };


  return (
    <div className="overflow-y-auto">
      <div className={window.innerHeight < 400 ? "h-[10rem]" : "h-full"}>
        <ul>
          {menuItems.map((item, index) => {
            itemCount++;

            // Add break interval logic
            if (sidebarActive && breakIntervals && itemCount === breakIntervals[intervalIndex]) {
              itemsToRender.push(<hr key={`hr-${index}`} className="my-4" />);
              itemCount = 0;
              intervalIndex = (intervalIndex + 1) % breakIntervals.length;
            }

            itemsToRender.push(
              <li
                key={index}
                className={`flex items-center gap-[1rem] mb-[1rem] cursor-pointer ${selectedMenu === item.label ? "text-[#45F882]" : "text-white"
                  }`}
                onClick={() => handleItemClick(item)}
              >
                {typeof item.icon === "string" ? (
                  <img
                    src={item.icon}
                    alt={item.label}
                    className={`${iconSize} ${sidebarActive ? "" : "mx-auto"}`}
                  />
                ) : (
                  item.icon
                )}
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
              src="/affiliate-panel/icons/profile_icon.png"
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
  onLogoutClick // Accept the onLogoutClick as a prop
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
        {/* <div className="flex w-full justify-center">
          {profileCard(sidebarActive, username)}
        </div> */}
        {/* Logo at the top of the sidebar */}
        <div className="flex justify-center">
          <img
            src="/RockMainLogo.png" // Add the logo image path here
            alt="Logo"
            className={`transition-all duration-300 ${sidebarActive ? "h-12 w-auto" : "h-8 w-auto mx-auto"} cursor-pointer`} // Adjust size and positioning based on sidebar state
            onClick={() => navigate('/dashboard')} // Navigate to dashboard without page refresh
          />
        </div>

        {sidebarActive ? (
          <div className="w-full my-[0.5rem]">
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
        <div className={`overflow-y-auto flex-grow scrollbar-thin ${!sidebarActive ? 'no-scrollbar' : ''}`}>
          <SidebarMenuList sidebarActive={sidebarActive} menuItems={menuItem} breakIntervals={breakIntervals} onLogoutClick={onLogoutClick} />
        </div>

      </div>

      {/* Button to toggle sidebar */}
      <div
        onClick={toggleSidebar} // Use the toggleSidebar function from context
        className="hidden md:block absolute top-[4.5rem] rounded-full p-[0.5rem] bg-[#1A1D26] -right-5 cursor-pointer"
      >
        <img src="/affiliate-panel/icons/arrow_left.png" alt="" className={sidebarActive ? "" : "rotate-180"} />
      </div>
    </div>
  );
};


export default Sidebar;
