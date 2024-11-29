import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../api";
import Container from "../../components/form/FormContainer";
import { Field } from "../../components/form/FormFields";
import { useSidebar } from "../../SidebarContext";
// Enum for button colors
enum ButtonColors {
    Yellow = "yellow",
    Green = "green",
}

// Change Password form fields
const changePasswordFormFields: Field[] = [
    { type: "password", placeholder: "*Enter current password", name: "currentPassword" },
    { type: "password", placeholder: "*Create new password", name: "newPassword" },
    { type: "password", placeholder: "*Confirm new password", name: "confirmPassword" },
];

// API call function
const changePassword = async (data: { currentPassword: string; newPassword: string }) => {
    console.log("API call initiated with data:", data); // Log data being sent to the API
    const response = await api.put("/settings/change-password", data);
    console.log("API call successful, response:", response.data); // Log the successful response
    return response.data;
};

// ChangePassword component
const ChangePassword: React.FC = () => {
    const [formValues, setFormValues] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const {sidebarActive} = useSidebar()

    const { mutate, isPending, isError, isSuccess, error } = useMutation({
        mutationFn: changePassword,
        onSuccess: () => {
            console.log("Password change successful."); // Log success
            alert("Password changed successfully");
        },
        onError: (err: any) => {
            console.error("Password change failed:", err); // Log the error
            alert(`Failed to change password: ${err.response?.data?.message || err.message}`);
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`Field updated: ${e.target.name}, Value: ${e.target.value}`); // Log field changes
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleSaveClick = () => {
        const { currentPassword, newPassword, confirmPassword } = formValues;
        console.log("Save button clicked with values:", formValues); // Log button click and values
        if (newPassword !== confirmPassword) {
            console.warn("New password and confirmation do not match."); // Log mismatch warning
            alert("New password and confirmation do not match.");
            return;
        }
        console.log("Initiating password change mutation."); // Log mutation initiation
        mutate({ currentPassword, newPassword });
    };

    return (
        <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]': 'w-[94%]'} h-screen flex overflow-auto`}>
            {/* Main container */}
            <div className="flex-1 flex flex-col justify-center items-center p-4 bg-[#0E1B2280] m-4 rounded-lg shadow-lg">
                {/* Title */}
                <h1 className="text-green-500 font-rajdhani text-3xl font-bold mb-6">
                    Change Password
                </h1>

                {/* Form container */}
                <Container
                    fields={changePasswordFormFields.map((field) => ({
                        ...field,
                        value: formValues[field.name as keyof typeof formValues] || "",
                        onChange: handleChange,
                    }))}
                    buttons={[
                        {
                            text: isPending ? "Saving..." : "Change Password",
                            onClick: handleSaveClick,
                            image: ButtonColors.Green,
                            width: "w-40",
                            height: "h-12",
                            isDisabled: isPending,
                        },
                    ]}
                />

                {/* Error or success messages */}
                {isError && <p className="text-red-500 mt-4">Failed to change password.</p>}
                {isSuccess && <p className="text-green-500 mt-4">Password changed successfully!</p>}
            </div>
        </div>
    );
};

export default ChangePassword;
