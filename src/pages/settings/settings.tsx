import React, { useEffect, useState } from "react";
import { useGeneralSettings, useUpdateModuleSettings, useUpdateProjectSettings } from "../../hooks/useSettings";
import { useUpdateAdminWalletSettings } from "../../hooks/useSettings2";
import { useSidebar } from "../../context/SidebarContext";
import { getContainerClass } from "../../utils";
import { FaWallet, FaDollarSign, FaTelegram, FaFacebook, FaInstagram, FaLinkedin, FaGooglePlay, FaTwitter, FaUserShield, FaKey, FaLock, FaFileContract, FaNetworkWired } from "react-icons/fa";
import StatusMessage from "../../components/StatusMessage";
import { Box, Tab, Tabs, FormControlLabel, Switch, Typography } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the types for projectSettings keys
type ProjectSettings = {
  // adminWallet: string;
  // adminSecret: string;
  contractAddress: string; // Added missing field
  rpc: string; // Added missing field
  rockUSDPrice: number;
  telegramLink: string;
  XLink: string;
  facebookLink: string;
  instagramLink: string;
  linkedInLink: string;
  playstoreLink: string;
};

type AdminWalletSettings = {
  adminWallet: string;
  // adminSecret: string
}

type ModuleSettings = {
  admin2FA: boolean,
  affiliate2FA: boolean
}

// Define the component
const SettingsComponent = () => {
  const { data: settings, isLoading, isError, error } = useGeneralSettings();
  const updateModuleSettings = useUpdateModuleSettings();
  const updateProjectSettings = useUpdateProjectSettings();
  const { mutate: updateAdminWalletSettings } = useUpdateAdminWalletSettings();
  const { sidebarActive } = useSidebar();
  const [moduleSettings, setModuleSettings] = useState({
    admin2FA: false,
    affiliate2FA: false,
  });

  // Define projectSettings with the appropriate type
  const [projectSettings, setProjectSettings] = useState<ProjectSettings>({
    // adminWallet: "",
    // adminSecret: "", // Added missing field
    contractAddress: "", // Added missing field
    rpc: "", // Added missing field
    rockUSDPrice: 0,
    telegramLink: "",
    XLink: "",
    facebookLink: "",
    instagramLink: "",
    linkedInLink: "",
    playstoreLink: "",
  });

  const [adminWalletSettings, setAdminWalletSettings] = useState<AdminWalletSettings>({
    // adminSecret: "",
    adminWallet: ""
  })

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (settings && settings.length > 0) {
      const generalSettings = settings[0];
      setProjectSettings({
        // adminWallet: generalSettings.adminWallet || "",
        // adminSecret: generalSettings.adminSecret || "",
        contractAddress: generalSettings.contractAddress || "",
        rpc: generalSettings.rpc || "",
        rockUSDPrice: generalSettings.rockUSDPrice || 0,
        telegramLink: generalSettings.telegramLink || "",
        facebookLink: generalSettings.facebookLink || "",
        instagramLink: generalSettings.instagramLink || "",
        linkedInLink: generalSettings.linkedInLink || "",
        playstoreLink: generalSettings.playstoreLink || "",
        XLink: generalSettings.XLink || "",
      });

      setModuleSettings({
        admin2FA: generalSettings.admin2FA,
        affiliate2FA: generalSettings.affiliate2FA,
      });
      setAdminWalletSettings({
        // adminSecret: generalSettings.adminSecret,
        adminWallet: generalSettings.adminWallet
      })
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

  const handleAdminWalletSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminWalletSettings(
      adminWalletSettings,
      {
        onSuccess: () => toast.success('Admin wallet settings updated successfully!'),
        onError: () => toast.error('Failed to update admin wallet settings.'),
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

  const inputStyles = "w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#45F882] text-black";
  const buttonStyles = "mt-4 px-6 py-2 bg-[#45F882] text-black rounded-lg hover:bg-green-600 transition duration-200";

  return (
    <div className={`${getContainerClass(sidebarActive)} text-white overflow-auto h-screen setting-scrollbar`}>
      <ToastContainer />
      <div className="m-4 p-6 bg-[#1A1C26] rounded-lg shadow-lg">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="settings tabs"
            sx={{
              '.MuiTab-root': {
                color: '#9e9e9e',
              },
              '.MuiTab-root.Mui-selected': {
                color: '#45F882',
                backgroundColor: '#2A2D3A',
              },
              '.MuiTabs-indicator': {
                backgroundColor: '#45F882',
              },
            }}
          >
            <Tab label="Project Settings" />
            <Tab label="Module Settings" />
            {/* <Tab label="Admin Wallet Settings" /> */}
          </Tabs>
        </Box>

        <Box sx={{ p: 3, height: "78vh", overflow: "auto" }} className="setting-scrollbar">
          {activeTab === 0 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleProjectSettingsSubmit();
              }}
              className="space-y-6"
            >
              {[
                // { label: "Admin Wallet", key: "adminWallet", icon: <FaWallet /> }, // Wallet icon for Admin Wallet
                // { label: "Admin Secret", key: "adminSecret", icon: <FaLock /> }, // Lock icon for Admin Secret
                { label: "RockUSD Price", key: "rockUSDPrice", icon: <FaDollarSign /> }, // Dollar sign for RockUSD Price
                { label: "Contract Address", key: "contractAddress", icon: <FaFileContract /> }, // Contract icon for Contract Address
                { label: "RPC URL", key: "rpc", icon: <FaNetworkWired /> }, // Network icon for RPC URL
                ...projectLinks
              ].map(({ label, icon, key }) => (
                <div key={key} className="grid grid-cols-4 items-center gap-4">
                  <label className="col-span-1 flex items-center gap-2 text-right text-gray-200">
                    {icon} {label}:
                  </label>
                  <input
                    type="text"
                    value={projectSettings[key as keyof ProjectSettings]} // Use keyof assertion
                    onChange={(e) => setProjectSettings({ ...projectSettings, [key]: e.target.value })}
                    className={`${inputStyles} col-span-3`}
                    placeholder={`Enter ${label}`}
                  />
                </div>
              ))}
              <button type="submit" className={buttonStyles}>Save Settings</button>
            </form>
          )}

          {activeTab === 1 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleModuleSettingsSubmit();
              }}
              className="space-y-6"
            >
              {[{ label: "Admin 2FA", key: "admin2FA", icon: <FaKey /> }, { label: "Affiliate 2FA", key: "affiliate2FA", icon: <FaUserShield /> }].map(({ label, key, icon }) => (
                <div key={key} className="grid grid-cols-3 items-center gap-4">
                  <label className="flex items-center gap-2 text-right text-gray-200">
                    {icon} {label}:
                  </label>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={moduleSettings[key as keyof ModuleSettings]}
                        onChange={() => setModuleSettings({ ...moduleSettings, [key]: !moduleSettings[key as keyof ModuleSettings] })}
                      />
                    }
                    label=""
                  />
                </div>
              ))}
              <button type="submit" className={buttonStyles}>Save Settings</button>
            </form>
          )}

          {/* {activeTab === 2 && (
            <form onSubmit={handleAdminWalletSubmit} className="space-y-6">
              {[
                { label: "Admin Wallet", key: "adminWallet", icon: <FaWallet /> },
                // { label: "Admin Secret", key: "adminSecret", icon: <FaLock /> }
              ].map(({ label, key, icon }) => (
                <div key={key} className="grid grid-cols-4 items-center gap-4">
                  <label className="col-span-1 flex items-center gap-2 text-right text-gray-200">
                    {icon}{label}:
                  </label>
                  <input
                    type="text"
                    value={adminWalletSettings[key as keyof AdminWalletSettings]}
                    onChange={(e) => setAdminWalletSettings({ ...adminWalletSettings, [key]: e.target.value })}
                    className={`${inputStyles} col-span-3`}
                    placeholder={`Enter ${label}`}
                  />
                </div>
              ))}
              <button type="submit" className={buttonStyles}>Save Settings</button>
            </form>
          )} */}
        </Box>
      </div>
    </div>
  );
};

export default SettingsComponent;
