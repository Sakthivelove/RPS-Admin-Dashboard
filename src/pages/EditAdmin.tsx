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
    {
        type: "text",
        placeholder: "Enter your username",
        label: "User Name",
        labelColor: "text-[#45F882]", // You can change this color as needed
        inputPadding: "p-2",
    },
    {
        type: "password",
        placeholder: "Enter your password",
        label: "Password",
        labelColor: "text-[#45F882]", // You can change this color as needed
        inputPadding: "p-2",
    },
    {
        type: "text",
        placeholder: "Enter your Telegram ID",
        label: "Telegram ID",
        labelColor: "text-[#45F882]", // You can change this color as needed
        inputPadding: "p-2",
    },
    {
        type: "text",
        placeholder: "Enter your first name",
        label: "First Name",
        labelColor: "text-[#45F882]", // You can change this color as needed
        inputPadding: "p-2",
    },
    {
        type: "text",
        placeholder: "Enter your last name",
        label: "Last Name",
        labelColor: "text-[#45F882]", // You can change this color as needed
        inputPadding: "p-2",
    },
    {
        type: "text",
        placeholder: "Enter your time zone",
        label: "Time Zone",
        labelColor: "text-[#45F882]", // You can change this color as needed
        inputPadding: "p-2",
    },
];


const EditAdmin: React.FC = () => {
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
                menuItem={menuItems}
                createTournamentIcon="/affiliate_2.png"
                createTournamentText="Dashboard"
                createTournamentPath="/create-tournament"
                breakIntervals={[3, 3, 3, 3, 2, 2, 5]}
            />

            {/* Container on the right */}
            <div className="flex-1 flex flex-col justify-center items-center p-4 bg-[#1A1D26CC] m-[1%]">
                <h1 className="font-Rajdhani text-[#45F882] capitalize text-[1.5rem] font-semibold mb-[1rem]">Edit profile</h1>
                {/* Container component for the form */}
                <Container
                    // title="Edit Profile"
                    fields={fields}
                    buttons={[
                        { image: 'green', text: 'Save', onClick: () => alert('Save Clicked') },
                        { image: 'yellow', text: 'Reset', onClick: () => alert('Reset Clicked') },
                    ]}
                />
            </div>
        </div>
    );
};


export default EditAdmin;