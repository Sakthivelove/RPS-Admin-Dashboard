import React, { useEffect, useState } from "react";
import { useGeneralSettings, useUpdateModuleSettings, useUpdateProjectSettings } from "../../hooks/useSettings";
import { useSidebar } from "../../context/SidebarContext";
import { getContainerClass } from "../../utils";
import { FaWallet, FaDollarSign, FaTelegram, FaFacebook, FaInstagram, FaLinkedin, FaGooglePlay, FaTwitter, FaUserShield, FaKey } from "react-icons/fa";
import StatusMessage from "../../components/StatusMessage";

const SettingsComponent = () => {
  const { data: settings, isLoading, isError, error } = useGeneralSettings();
  const updateModuleSettings = useUpdateModuleSettings();
  const updateProjectSettings = useUpdateProjectSettings();
  const { sidebarActive } = useSidebar()
  const [moduleSettings, setModuleSettings] = useState({
    admin2FA: false,
    affiliate2FA: false,
  });

  const [projectSettings, setProjectSettings] = useState({
    adminWallet: "",
    rockUSDPrice: 0,
    telegramLink: "",
    XLink: "",
    facebookLink: "",
    instagramLink: "",
    linkedInLink: "",
    playstoreLink: "",
  });

  useEffect(() => {
    if (settings && settings.length > 0) {
      const generalSettings = settings[0];
      setProjectSettings({
        adminWallet: generalSettings.adminWallet || "",
        rockUSDPrice: generalSettings.rockUSDPrice || 0,
        telegramLink: generalSettings.telegramLink ? generalSettings.telegramLink.replace("https://t.me/", "") : "",
        facebookLink: generalSettings.facebookLink ? generalSettings.facebookLink.replace("https://facebook.com/", "") : "",
        instagramLink: generalSettings.instagramLink ? generalSettings.instagramLink.replace("https://instagram.com/", "") : "",
        linkedInLink: generalSettings.linkedInLink ? generalSettings.linkedInLink.replace("https://linkedin.com/in/", "") : "",
        playstoreLink: generalSettings.playstoreLink ? generalSettings.playstoreLink.replace("https://play.google.com/store/apps/details?id=", "") : "",
        XLink: generalSettings.XLink ? generalSettings.XLink.replace("https://twitter.com/", "") : "", // Handle Twitter/X link
      });
      setModuleSettings({
        admin2FA: generalSettings.admin2FA,
        affiliate2FA: generalSettings.affiliate2FA,
      });
    }
  }, [settings]);


  const handleModuleSettingsSubmit = () => {
    updateModuleSettings.mutate(
      {
        admin2FA: moduleSettings.admin2FA,
        affiliate2FA: moduleSettings.affiliate2FA,
      },
      {
        onSuccess: () => {
          alert("Module settings updated successfully!");
        },
      }
    );
  };

  const handleProjectSettingsSubmit = () => {
    updateProjectSettings.mutate(
      projectSettings,
      {
        onSuccess: () => {
          alert("Project settings updated successfully!");
        },
      }
    );
  };

  // Use the StatusMessage component for loading and error handling
  if (isLoading || isError) {
    return (
      <div className={`${getContainerClass(sidebarActive)} p-6 text-white overflow-auto`}>
        <StatusMessage
          isLoading={isLoading}
          error={error}
          loadingMessage="Fetching settings..."
          errorMessage="Failed to load settings."
          className="flex justify-center items-center h-full"
        />
      </div>
    );
  }

  return (
    <div className={`${getContainerClass(sidebarActive)} text-white overflow-auto`}>
      <div className="m-4 bg-gray-800 p-6">
        <h1 className="text-3xl font-bold mb-4">Settings</h1>
        {/* General Settings Display */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">General Settings</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p className="text-red-500">Error loading settings</p>
          ) : (
            <pre className="bg-gray-700 p-4 rounded-md overflow-auto text-sm">{JSON.stringify(settings, null, 2)}</pre>
          )}
        </section>
        {/* Module Settings Form */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Module Settings</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleModuleSettingsSubmit();
            }}
            className="space-y-4"
          >
            {/* Admin 2FA */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="flex items-center gap-2 text-right">
                <FaKey className="text-gray-500" /> Admin 2FA:
              </label>
              <div className="col-span-2 flex items-center">
                <label htmlFor="admin2FA" className="switch">
                  <input
                    id="admin2FA"
                    type="checkbox"
                    checked={moduleSettings.admin2FA}
                    onChange={(e) =>
                      setModuleSettings({
                        ...moduleSettings,
                        admin2FA: e.target.checked,
                      })
                    }
                    className="hidden"
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
            {/* Affiliate 2FA */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="flex items-center gap-2 text-right">
                <FaUserShield className="text-gray-500" /> Affiliate 2FA:
              </label>
              <div className="col-span-2 flex items-center">
                <label htmlFor="affiliate2FA" className="switch">
                  <input
                    id="affiliate2FA"
                    type="checkbox"
                    checked={moduleSettings.affiliate2FA}
                    onChange={(e) =>
                      setModuleSettings({
                        ...moduleSettings,
                        affiliate2FA: e.target.checked,
                      })
                    }
                    className="hidden"
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Update Module Settings
            </button>
          </form>
        </section>
        {/* Project Settings Form */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Project Settings</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleProjectSettingsSubmit();
            }}
            className="space-y-4"
          >
            {/* Admin Wallet */}
            <div className="grid grid-cols-7 items-center gap-4">
              <label className="flex items-center gap-2 text-right">
                <FaWallet className="text-gray-500" /> Admin Wallet:
              </label>
              <input
                type="text"
                placeholder="Enter Admin Wallet Address"
                value={projectSettings.adminWallet}
                onChange={(e) =>
                  setProjectSettings({
                    ...projectSettings,
                    adminWallet: e.target.value,
                  })
                }
                className="col-span-6 w-full p-2 text-black border border-gray-300 rounded-md"
              />
            </div>

            {/* Rock USD Price */}
            <div className="grid grid-cols-7 items-center gap-4">
              <label className="flex items-center gap-2 text-right">
                <FaDollarSign className="text-gray-500" /> Rock USD Price:
              </label>
              <input
                type="number"
                placeholder="e.g., 50"
                value={projectSettings.rockUSDPrice}
                onChange={(e) =>
                  setProjectSettings({
                    ...projectSettings,
                    rockUSDPrice: parseFloat(e.target.value),
                  })
                }
                className="col-span-6 w-full p-2 text-black border border-gray-300 rounded-md"
              />
            </div>

            {/* Telegram Link */}
            <div className="grid grid-cols-7 items-center gap-4">
              <label className="flex items-center gap-2 text-right">
                <FaTelegram className="text-gray-500" /> Telegram Link:
              </label>
              <input
                type="text"
                placeholder="e.g., yourchannel"
                value={projectSettings.telegramLink ? `https://t.me/${projectSettings.telegramLink}` : ""}
                onChange={(e) =>
                  setProjectSettings({
                    ...projectSettings,
                    telegramLink: e.target.value.replace("https://t.me/", ""), // Store only the unique part
                  })
                }
                className="col-span-6 w-full p-2 text-black border border-gray-300 rounded-md"
              />
            </div>

            {/* Facebook Link */}
            <div className="grid grid-cols-7 items-center gap-4">
              <label className="flex items-center gap-2 text-right">
                <FaFacebook className="text-blue-600" /> Facebook Link:
              </label>
              <input
                type="text"
                placeholder="e.g., yourpage"
                value={projectSettings.facebookLink ? `https://facebook.com/${projectSettings.facebookLink}` : ""}
                onChange={(e) =>
                  setProjectSettings({
                    ...projectSettings,
                    facebookLink: e.target.value.replace("https://facebook.com/", ""), // Store only the unique part
                  })
                }
                className="col-span-6 w-full p-2 text-black border border-gray-300 rounded-md"
              />
            </div>

            {/* Instagram Link */}
            <div className="grid grid-cols-7 items-center gap-4">
              <label className="flex items-center gap-2 text-right">
                <FaInstagram className="text-pink-500" /> Instagram Link:
              </label>
              <input
                type="text"
                placeholder="e.g., yourprofile"
                value={projectSettings.instagramLink ? `https://instagram.com/${projectSettings.instagramLink}` : ""}
                onChange={(e) =>
                  setProjectSettings({
                    ...projectSettings,
                    instagramLink: e.target.value.replace("https://instagram.com/", ""), // Store only the unique part
                  })
                }
                className="col-span-6 w-full p-2 text-black border border-gray-300 rounded-md"
              />
            </div>

            {/* LinkedIn Link */}
            <div className="grid grid-cols-7 items-center gap-4">
              <label className="flex items-center gap-2 text-right">
                <FaLinkedin className="text-blue-700" /> LinkedIn Link:
              </label>
              <input
                type="text"
                placeholder="e.g., yourprofile"
                value={projectSettings.linkedInLink ? `https://linkedin.com/in/${projectSettings.linkedInLink}` : ""}
                onChange={(e) =>
                  setProjectSettings({
                    ...projectSettings,
                    linkedInLink: e.target.value.replace("https://linkedin.com/in/", ""), // Store only the unique part
                  })
                }
                className="col-span-6 w-full p-2 text-black border border-gray-300 rounded-md"
              />
            </div>

            {/* Playstore Link */}
            <div className="grid grid-cols-7 items-center gap-4">
              <label className="flex items-center gap-2 text-right">
                <FaGooglePlay className="text-green-500" /> Playstore Link:
              </label>
              <input
                type="text"
                placeholder="e.g., yourapp"
                value={projectSettings.playstoreLink ? `https://play.google.com/store/apps/details?id=${projectSettings.playstoreLink}` : ""}
                onChange={(e) =>
                  setProjectSettings({
                    ...projectSettings,
                    playstoreLink: e.target.value.replace("https://play.google.com/store/apps/details?id=", ""), // Store only the unique part
                  })
                }
                className="col-span-6 w-full p-2 text-black border border-gray-300 rounded-md"
              />
            </div>

            {/* Twitter XLink */}
            <div className="grid grid-cols-7 items-center gap-4">
              <label className="flex items-center gap-2 text-right">
                <FaTwitter className="text-blue-500" /> Twitter XLink:
              </label>
              <input
                type="text"
                placeholder="e.g., yourtwitterhandle"
                value={projectSettings.XLink ? `https://twitter.com/${projectSettings.XLink}` : ""} // Add "https://twitter.com/" when displaying
                onChange={(e) =>
                  setProjectSettings({
                    ...projectSettings,
                    XLink: e.target.value.replace(/^https:\/\/twitter\.com\//, ""), // Store only the Twitter handle
                  })
                }
                className="col-span-6 w-full p-2 text-black border border-gray-300 rounded-md"
              />
            </div>


            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Update Project Settings
            </button>
          </form>
        </section>

      </div>

    </div>
  );
};

export default SettingsComponent;
