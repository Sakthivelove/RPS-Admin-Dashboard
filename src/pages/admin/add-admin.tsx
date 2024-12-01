import Container from "../../components/form/FormContainer";
import { Field } from "../../components/form/FormFields";
import { useSidebar } from "../../context/SidebarContext";

enum ButtonColors {
    Yellow = 'yellow',
    Green = 'green',
}

// Example dynamic fields data for Name, Username, Password, and Confirm Password
const addAdminFormFields: Field[] = [
    { type: "text", placeholder: "*Enter your name" },
    { type: "text", placeholder: "*Enter your username" },
    { type: "password", placeholder: "*Enter your password" },
    { type: "password", placeholder: "*Confirm your password" },
];


// AddAdmin component
const AddAdmin: React.FC = () => {

    const { sidebarActive } = useSidebar()

    const handleCancelClick = () => alert('Cancel Clicked');
    const handleCreateClick = () => alert('Create Clicked');

    return (
        <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen flex overflow-auto`}>
            {/* Container on the right */}
            <div className="flex-1 flex justify-center items-center p-4 bg-[#1A1D26CC] m-[2%]">
                {/* Container component for the form */}
                <Container
                    title="Add Admin"
                    fields={addAdminFormFields}
                    buttons={[
                        { image: ButtonColors.Yellow, text: 'Cancel', onClick: handleCancelClick },
                        { image: ButtonColors.Green, text: 'Create', onClick: handleCreateClick },
                    ]}

                />
            </div>
        </div>
    );
};

export default AddAdmin;