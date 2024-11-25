import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface MenuItem {
  icon: string;
  label: string;
  action?: () => void;  // Optional callback for specific actions (like navigation or showing modals)
}

interface SidebarProps {
  menuItem: MenuItem[];
  username: string;
  createTournamentText: string;
  createTournamentPath: string;
  createTournamentIcon?: string; // Optional property for the icon
  profileImageSrc?: string;
  breakIntervals?: number[];
}


interface SidebarMenuListProps {
  sidebarActive: boolean;
  menuItems: { label: string; icon: string }[];
  breakIntervals?: number[];
}

export const menuItems = [
  { label: "Home", icon: "/icons/home-icon.png" },
  { label: "Settings", icon: "/icons/settings-icon.png" },
  { label: "Profile", icon: "/icons/profile-icon.png" },
  { label: "Messages", icon: "/icons/messages-icon.png" },
  { label: "Notifications", icon: "/icons/notifications-icon.png" },
  { label: "Dashboard", icon: "/icons/dashboard-icon.png" },
  { label: "Help", icon: "/icons/help-icon.png" },
  { label: "Logout", icon: "/icons/logout-icon.png" },
  { label: "Search", icon: "/icons/search-icon.png" },
  { label: "Reports", icon: "/icons/reports-icon.png" },
  { label: "Analytics", icon: "/icons/analytics-icon.png" },
  { label: "Orders", icon: "/icons/orders-icon.png" },
  { label: "Calendar", icon: "/icons/calendar-icon.png" },
  { label: "Tasks", icon: "/icons/tasks-icon.png" },
  { label: "Users", icon: "/icons/users-icon.png" },
];


const SidebarMenuList: React.FC<SidebarMenuListProps> = ({ sidebarActive, menuItems, breakIntervals }) => {
  let itemsToRender: JSX.Element[] = []; // Explicitly define the type as JSX.Element[]
  let itemCount = 0;
  let intervalIndex = 0; // Index to track the current interval

  const iconSize = sidebarActive ? "w-6 h-6" : "w-8 h-8"; // Set icon size based on `sidebarActive` state

  return (
    <div className={`my-[2rem] overflow-y-auto`}>
      <div className={window.innerHeight < 400 ? "h-[10rem]" : "h-full"}>
        <ul>
          {menuItems.map((item, index) => {
            itemCount++;

            // Add current item
            itemsToRender.push(
              <li
                key={index}
                className="flex items-center gap-[1rem] mb-[1rem] cursor-pointer"
              >
                <img
                  src={item.icon}
                  alt=""
                  className={`${iconSize} ${sidebarActive ? "" : "mx-auto"}`}
                />
                {sidebarActive && (
                  <h1 className="capitalize text-white poppins-regular text-[1rem]">
                    {item.label}
                  </h1>
                )}
              </li>
            );

            // Check if we need to insert <hr /> based on the current interval and sidebarActive
            if (sidebarActive && itemCount === breakIntervals?.[intervalIndex]) {
              // Insert <hr /> after the specified number of items
              itemsToRender.push(
                <hr key={`hr-${index}`} className="my-4" />
              );
              itemCount = 0; // Reset counter

              // Move to the next interval
              intervalIndex =
                (intervalIndex + 1) % breakIntervals.length; // Loop through intervals
            }

            return null; // Don't return anything here; we are handling rendering via itemsToRender
          })}
          {itemsToRender}
        </ul>
      </div>
    </div>
  );
};



const profileCard = (sidebarActive: boolean, userName: string) => {
  return (
    <div className={`bg-gradient-to-r w-${sidebarActive ? "full" : "fit"} from-[#45F882] to-[#FFBE18] p-[1px] rounded-[0.5rem] cursor-pointer`}>
      <div className={`bg-[#0E1B22] w-${sidebarActive ? "full" : "fit"} p-[0.5rem] rounded-[0.5rem]`}>
        <div className="flex gap-[1rem] items-center">
          <img src="/affiliatePanel/icons/profile_icon.png" alt="" className={`h-[20px] w-auto ${sidebarActive ? "" : "mx-auto"}`} />
          {
            sidebarActive ?
              <div className="">
                <h1 className="capitalize text-white poppins-regular text-[12px]">{userName}</h1>
              </div>
              :
              <></>
          }
        </div>
      </div>
    </div>
  );
};



const Sidebar: React.FC<SidebarProps> = ({
  username,
  menuItem,
  createTournamentIcon,
  createTournamentText,
  createTournamentPath,
  breakIntervals
  // profileImageSrc,
}) => {
  const [sidebarActive, setSidebarActive] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setSidebarActive(true);
    } else {
      setSidebarActive(false);
    }

    const screenWidthListener = () => {
      if (window.innerWidth < 768) {
        setSidebarActive(false);
      }
    };

    window.addEventListener('resize', screenWidthListener);

    return () => {
      window.removeEventListener('resize', screenWidthListener);
    };
  }, []);

  return (
    <div className={sidebarActive ? "relative w-[70%] xl:w-[30%] bg-[#0E1B22] opacity-[90%] min-h-screen" : "relative w-[20%] md:w-[10%] lg:w-[5%] bg-[#0E1B22] opacity-[90%] min-h-full"}>
      <div className="absolute top-0 w-full h-full px-[0.5rem] xl:px-[1rem] py-[0.857rem] flex flex-col">
        <div className="flex w-full justify-center">
          {profileCard(sidebarActive, username)}
        </div>

        {
          sidebarActive ? (
            <div className="w-full my-[1rem]">
              <button
                className="capitalize bg-[#45F882] rounded-[5px] w-full px-[0.5rem] py-[10px] flex items-center gap-[0.5rem] poppins-bold"
                onClick={() => navigate(createTournamentPath)}
              >
                <img
                  src={createTournamentIcon} // Your icon source here
                  alt="icon"
                  className="w-5 h-5" // Adjust size as needed
                />
                {createTournamentText}
              </button>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <button
                className="bg-[#45F882] rounded-[5px] w-fit p-[0.5rem] my-[1rem] flex items-center gap-[0.5rem]"
                onClick={() => navigate(createTournamentPath)}
              >
                <img
                  src={createTournamentIcon} // Your icon source here
                  alt="icon"
                  className="w-5 h-5" // Adjust size as needed
                />
                <span className="sr-only">{createTournamentText}</span> {/* For accessibility */}
              </button>
            </div>
          )
        }



        {/* Scrollable Menu List */}
        <div className="overflow-y-auto flex-grow no-scrollbar"> {/* Added custom scrollbar class */}
          <SidebarMenuList sidebarActive={sidebarActive} menuItems={menuItem} breakIntervals={breakIntervals} />
        </div>
      </div>

      <div onClick={() => setSidebarActive(!sidebarActive)} className="hidden md:block absolute top-[4.5rem] rounded-full p-[0.5rem] bg-[#1A1D26] -right-5 cursor-pointer">
        <img src="/affiliatePanel/icons/arrow_left.png" alt="" className={sidebarActive ? "" : "rotate-180"} />
      </div>
    </div>
  );
};


export default Sidebar