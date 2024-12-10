import React, { useEffect, useState } from "react";
import { useGeneralSettings, useUpdateModuleSettings, useUpdateProjectSettings } from "../../hooks/useSettings";
import { useSidebar } from "../../context/SidebarContext";
import { getContainerClass } from "../../utils";
import { FaWallet, FaDollarSign, FaTelegram, FaFacebook, FaInstagram, FaLinkedin, FaGooglePlay, FaTwitter, FaUserShield, FaKey } from "react-icons/fa";
import StatusMessage from "../../components/StatusMessage";
import { Box, Tab, Tabs, FormControlLabel, Switch } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the types for projectSettings keys
type ProjectSettings = {
  adminWallet: string;
  rockUSDPrice: number;
  telegramLink: string;
  XLink: string;
  facebookLink: string;
  instagramLink: string;
  linkedInLink: string;
  playstoreLink: string;
};

// Define the component
const SettingsComponent = () => {
  const { data: settings, isLoading, isError, error } = useGeneralSettings();
  const updateModuleSettings = useUpdateModuleSettings();
  const updateProjectSettings = useUpdateProjectSettings();
  const { sidebarActive } = useSidebar();
  const [moduleSettings, setModuleSettings] = useState({
    admin2FA: false,
    affiliate2FA: false,
  });

  // Define projectSettings with the appropriate type
  const [projectSettings, setProjectSettings] = useState<ProjectSettings>({
    adminWallet: "",
    rockUSDPrice: 0,
    telegramLink: "",
    XLink: "",
    facebookLink: "",
    instagramLink: "",
    linkedInLink: "",
    playstoreLink: "",
  });

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (settings && settings.length > 0) {
      const generalSettings = settings[0];
      setProjectSettings({
        adminWallet: generalSettings.adminWallet || "",
        rockUSDPrice: generalSettings.rockUSDPrice || 0,
        telegramLink: generalSettings.telegramLink ? generalSettings.telegramLink : "",
        facebookLink: generalSettings.facebookLink ? generalSettings.facebookLink : "",
        instagramLink: generalSettings.instagramLink ? generalSettings.instagramLink : "",
        linkedInLink: generalSettings.linkedInLink ? generalSettings.linkedInLink : "",
        playstoreLink: generalSettings.playstoreLink ? generalSettings.playstoreLink : "",
        XLink: generalSettings.XLink ? generalSettings.XLink : "",
      });
      setModuleSettings({
        admin2FA: generalSettings.admin2FA,
        affiliate2FA: generalSettings.affiliate2FA,
      });
    }
  }, [settings]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const projectLinks = [
    { label: "Telegram", icon: <FaTelegram />, key: "telegramLink" },
    { label: "Facebook", icon: <FaFacebook />, key: "facebookLink" },
    { label: "Instagram", icon: <FaInstagram />, key: "instagramLink" },
    { label: "LinkedIn", icon: <FaLinkedin />, key: "linkedInLink" },
    { label: "Playstore", icon: <FaGooglePlay />, key: "playstoreLink" },
    { label: "Twitter", icon: <FaTwitter />, key: "XLink" },
  ] as const;

  const handleModuleSettingsSubmit = () => {
    updateModuleSettings.mutate(
      {
        admin2FA: moduleSettings.admin2FA,
        affiliate2FA: moduleSettings.affiliate2FA,
      },
      {
        onSuccess: () => {
          toast.success("Module settings updated successfully!");
        },
        onError: () => {
          toast.error("Failed to update module settings.");
        }
      }
    );
  };

  const handleProjectSettingsSubmit = () => {
    updateProjectSettings.mutate(
      projectSettings,
      {
        onSuccess: () => {
          toast.success("Project settings updated successfully!");
        },
        onError: () => {
          toast.error("Failed to update project settings.");
        }
      }
    );
  };

  if (isLoading || isError) {
    return (
      <div className={`${getContainerClass(sidebarActive)} p-6 h-screen text-black overflow-auto`}>
        <StatusMessage
          isLoading={isLoading}
          error={error}
          loadingMessage="Fetching settings..."
          errorMessage="Failed to load settings."
          className="flex justify-center items-center h-full text-white bg-[#1A1C26]"
        />
      </div>
    );
  }

  return (
    <div className={`${getContainerClass(sidebarActive)} text-white overflow-auto h-screen setting-scrollbar`}>
      <ToastContainer />
      <div className="m-4 bg-[#1A1C26] p-6 rounded-lg shadow-lg">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="settings tabs"
            sx={{
              '.MuiTab-root': {
                color: '#9e9e9e', // Default color of the tab text
              },
              '.MuiTab-root.Mui-selected': {
                color: '#45F882', // Active tab text color
                backgroundColor: '#2A2D3A', // Background color for active tab
              },
              '.MuiTabs-indicator': {
                backgroundColor: '#45F882', // Indicator color (underline)
              },
            }}
          >
            <Tab label="Project Settings" sx={{ color: "#45F882" }} />
            <Tab label="Module Settings" sx={{ color: "#45F882" }} />
          </Tabs>
        </Box>

        <Box sx={{ p: 3, height: "78vh", overflow: "auto" }} className="setting-scrollbar">
          {activeTab === 0 && (
            <section className="mb-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleProjectSettingsSubmit();
                }}
                className="space-y-4"
              >
                {[{ label: "Admin Wallet", key: "adminWallet", icon: <FaWallet /> }, { label: "RockUSD Price", key: "rockUSDPrice", icon: <FaDollarSign /> }, ...projectLinks].map(({ label, icon, key }) => (
                  <div key={key} className="grid grid-cols-3 items-center gap-4">
                    <label className="flex items-center gap-2 text-right text-gray-200">
                      {icon} {label}:
                    </label>
                    <div className="col-span-2">
                      <input
                        type="text"
                        value={projectSettings[key as keyof ProjectSettings]}
                        onChange={(e) =>
                          setProjectSettings((prev) => ({
                            ...prev,
                            [key]: e.target.value,
                          }))
                        }
                        className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#45F882] text-black" // Added text-black class here
                        placeholder={`Enter ${label} URL`}
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="submit"
                  className="mt-4 px-6 py-2 bg-[#45F882] text-black rounded-lg hover:bg-green-600 transition duration-200"
                >
                  Save Settings
                </button>
              </form>
            </section>
          )}
          {activeTab === 1 && (
            <section className="mb-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleModuleSettingsSubmit();
                }}
                className="space-y-4"
              >
                {/* Admin 2FA */}
                <div className="grid grid-cols-3 items-center gap-4">
                  <label className="flex items-center gap-2 text-right text-gray-200">
                    <FaKey className="text-gray-600" /> Admin 2FA:
                  </label>
                  <div className="col-span-2 flex items-center">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={moduleSettings.admin2FA}
                          onChange={() =>
                            setModuleSettings((prev) => ({
                              ...prev,
                              admin2FA: !prev.admin2FA,
                            }))
                          }
                          className="text-[#45F882]"
                        />
                      }
                      label=""
                    />
                  </div>
                </div>

                {/* Affiliate 2FA */}
                <div className="grid grid-cols-3 items-center gap-4">
                  <label className="flex items-center gap-2 text-right text-gray-200">
                    <FaUserShield className="text-gray-600" /> Affiliate 2FA:
                  </label>
                  <div className="col-span-2 flex items-center">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={moduleSettings.affiliate2FA}
                          onChange={() =>
                            setModuleSettings((prev) => ({
                              ...prev,
                              affiliate2FA: !prev.affiliate2FA,
                            }))
                          }
                          className="text-[#45F882]"
                        />
                      }
                      label=""
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-4 px-6 py-2 bg-[#45F882] text-black rounded-lg hover:bg-green-600 transition duration-200"
                >
                  Save Settings
                </button>
              </form>
            </section>
          )}
        </Box>
      </div>
    </div>
  );
};

export default SettingsComponent;
