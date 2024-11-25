import Container from "../components/FormContainer";
import { Field } from "../components/FormFields";
import Sidebar from "../components/sideBarNew";


export const menuItems = [
    { label: "Rock Tournaments", icon: "/star_1.png" },
    { label: "VIP Tournaments", icon: "/vip_1.png" },
    { label: "Affiliate Tournaments", icon: "/affiliate_1.png" },
    { label: "User's List", icon: "/users_list.png" },
    { label: "User Info", icon: "/user-info.png" },
    { label: "User Status Update", icon: "/user-status-update.png" },
    { label: "Admin List", icon: "/admin-list.png" },
    { label: "Admin Add", icon: "/admin-add.png" },
    { label: "Admin Edit", icon: "/admin-edit.png" },
    { label: "Activity List", icon: "/activity-list.png" },
    { label: "Tournament List", icon: "/tournament-list.png" },
    { label: "Tournament Info", icon: "/tournament-info.png" },
    { label: "Game History", icon: "/game-history.png" },
    { label: "Game Info", icon: "/game-info.png" },
    { label: "Stake History", icon: "/stake-history.png" },
    { label: "Stake Info", icon: "/stake-info.png" },
    { label: "Project Settings", icon: "/project-settings.png" },
    { label: "Change Password", icon: "/change-password.png" },
    { label: "Logout", icon: "/logout.png" },
];

// Example dynamic fields data for Name, Username, Password, and Confirm Password
const fields: Field[] = [
    { type: "text", placeholder: "*Enter your name" },
    { type: "text", placeholder: "*Enter your username" },
    { type: "password", placeholder: "*Enter your password" },
    { type: "password", placeholder: "*Confirm your password" },
];


// AddAdmin component
const AddAdmin: React.FC = () => {
    return (
        <div
            className="flex h-screen bg-cover bg-center"
            style={{
                backgroundImage: 'url(/public/adminlist.png)', // Background image from public directory
            }}
        >
            {/* Sidebar on the left */}
            <Sidebar
                username="Admin"
                menuItem={menuItems} // Assuming `menuItems` is defined somewhere in your code
                createTournamentIcon="/affiliate_2.png"
                createTournamentText="Dashboard"
                createTournamentPath="#"
                breakIntervals={[3, 3, 3, 3, 2, 2, 5]}
            />

            {/* Container on the right */}
            <div className="flex-1 flex justify-center items-center p-4 bg-[#1A1D26CC] m-[2%]">
                {/* Container component for the form */}
                <Container
                    title="Add Admin"
                    fields={fields}
                    buttons={[{ image: 'yellow', text: 'Cancel', onClick: () => alert('Cancel Clicked') }, { image: 'green', text: 'Create', onClick: () => alert('Create Clicked') }]}
                />
            </div>
        </div>
    );
};

export default AddAdmin;