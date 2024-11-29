import Container from "../components/form/FormContainer";
import { Field } from "../components/form/FormFields";
import { EditAdminFields } from "../data/data";
import { useSidebar } from "../SidebarContext";

const EditAdmin: React.FC = () => {
    const { sidebarActive } = useSidebar()
    return (
        <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen flex overflow-auto`}>
            {/* Container on the right */}
            <div className="flex-1 flex flex-col justify-center items-center p-4 bg-[#1A1D26CC] m-[1%]">
                <h1 className="font-Rajdhani text-[#45F882] capitalize text-[1.5rem] font-semibold mb-[1rem]">Edit profile</h1>
                {/* Container component for the form */}
                <Container
                    // title="Edit Profile"
                    fields={EditAdminFields as Field[]}
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