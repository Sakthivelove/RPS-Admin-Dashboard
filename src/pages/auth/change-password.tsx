import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../api/api";
import Container from "../../components/form/FormContainer";
import { Field } from "../../components/form/FormFields";
import { useSidebar } from "../../context/SidebarContext";

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
    const response = await api.put("/settings/change-password", data);
    return response.data;
};

// ChangePassword component
const ChangePassword: React.FC = () => {
    const [formValues, setFormValues] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { sidebarActive } = useSidebar();

    const { mutate, isPending } = useMutation({
        mutationFn: changePassword,
        onSuccess: () => {
            setStatusMessage("Password changed successfully.");
            setErrorMessage(null); // Clear error message
            setTimeout(() => setStatusMessage(null), 3000); // Clear status message after 3 seconds
        },
        onError: (err: any) => {
            setErrorMessage(err.response?.data?.message || "Failed to change password.");
            setStatusMessage(null); // Clear status message
            setTimeout(() => setErrorMessage(null), 3000); // Clear error message after 3 seconds
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleSaveClick = () => {
        const { currentPassword, newPassword, confirmPassword } = formValues;

        if (newPassword !== confirmPassword) {
            alert("New password and confirmation do not match.");
            return;
        }

        mutate({ currentPassword, newPassword });
    };

    return (
        <div className={`absolute right-0 ${sidebarActive ? "w-[77%]" : "w-[94%]"} h-screen flex overflow-auto`}>
            {/* Main container */}
            <div className="flex-1 flex flex-col justify-center items-center p-4 bg-[#0E1B2280] m-4 rounded-lg shadow-lg">
                {/* Title */}
                <h1 className="text-green-500 font-rajdhani text-3xl font-bold mb-6">
                    Change Password
                </h1>

                {/* Display Status or Error Message */}
                {statusMessage && <div className="text-green-500 mb-4">{statusMessage}</div>}
                {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

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
            </div>
        </div>
    );
};

export default ChangePassword;
