import Container from "../components/form/FormContainer";
import { Field } from "../components/form/FormFields";

// Enum for button colors (can also use Tailwind classes directly)
enum ButtonColors {
    Yellow = 'yellow',
    Green = 'green',
}

// Fields for the Change Password form
const changePasswordFormFields: Field[] = [
    { type: "password", placeholder: "*Enter current password" },
    { type: "password", placeholder: "*Create new password" },
    { type: "password", placeholder: "*Confirm new password" },
];

// ChangePassword component
const ChangePassword: React.FC = () => {

    const handleSaveClick = () => alert('Password changed successfully');

    return (
        <div className="flex h-screen">

            {/* Main container */}
            <div className="flex-1 flex flex-col justify-center items-center p-4 bg-[#0E1B2280] m-4 rounded-lg shadow-lg">
                {/* Title */}
                <h1 className="text-green-500 font-rajdhani text-3xl font-bold mb-6">
                    Change Password
                </h1>

                {/* Form container */}
                <Container
                    fields={changePasswordFormFields}
                    buttons={[
                        {
                            text: 'Change Password',
                            onClick: handleSaveClick,
                            image: ButtonColors.Green,
                            width:"w-40",
                            height:"h-12"
                        },
                    ]}
                />
            </div>
        </div>
    );
};

export default ChangePassword;
