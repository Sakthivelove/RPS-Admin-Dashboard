import React, { useEffect, useState } from "react";
import { useGeneralSettings, useUpdateModuleSettings, useUpdateProjectSettings } from "../../hooks/useSettings";
import { useSidebar } from "../../context/SidebarContext";
import { getContainerClass } from "../../utils";
import { FaWallet, FaDollarSign, FaTelegram, FaFacebook, FaInstagram, FaLinkedin, FaGooglePlay, FaTwitter, FaUserShield, FaKey } from "react-icons/fa";
import StatusMessage from "../../components/StatusMessage";
import { Box, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography, Link, Alert, Paper } from "@mui/material";

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
        telegramLink: generalSettings.telegramLink ? generalSettings.telegramLink : "",
        facebookLink: generalSettings.facebookLink ? generalSettings.facebookLink : "",
        instagramLink: generalSettings.instagramLink ? generalSettings.instagramLink : "",
        linkedInLink: generalSettings.linkedInLink ? generalSettings.linkedInLink : "",
        playstoreLink: generalSettings.playstoreLink ? generalSettings.playstoreLink : "",
        XLink: generalSettings.XLink ? generalSettings.XLink : "", // Handle Twitter/X link
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
    console.log("Project Settings:", projectSettings);  // Log the project settings
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
        <Box sx={{ mb: 8, p: 3, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }} color="black">
            General Settings
          </Typography>
          {isLoading ? (
            <Box display="flex" alignItems="center" justifyContent="center" sx={{ height: 200 }}>
              <CircularProgress />
            </Box>
          ) : isError ? (
            <Alert severity="error">Error loading settings. Please try again later.</Alert>
          ) : settings && settings[0] ? (
            <Paper elevation={3} sx={{ overflow: "hidden" }}>
              <Table>
                <TableHead sx={{ backgroundColor: "#1976d2" }}>
                  <TableRow>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Setting</TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(settings[0]).map(([key, value]) =>
                    key !== "id" && key !== "createdAt" && key !== "updatedAt" ? (
                      <TableRow key={key} sx={{ "&:nth-of-type(even)": { backgroundColor: "#f5f5f5" } }}>
                        <TableCell sx={{ fontWeight: "bold" }}>{key}</TableCell>
                        <TableCell>
                          {key.includes("Link") ? (
                            <Link href={value} target="_blank" rel="noopener noreferrer" sx={{ color: "#1976d2", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
                              {value}
                            </Link>
                          ) : typeof value === "boolean" ? (
                            <Typography
                              sx={{
                                fontWeight: "bold",
                                color: value ? "green" : "red",
                              }}
                            >
                              {value ? "Enabled" : "Disabled"}
                            </Typography>
                          ) : (
                            value
                          )}
                        </TableCell>
                      </TableRow>
                    ) : null
                  )}
                </TableBody>
              </Table>
            </Paper>
          ) : (
            <Typography>No settings available.</Typography>
          )}
        </Box>

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
                value={projectSettings.telegramLink}
                onChange={(e) =>
                  setProjectSettings({
                    ...projectSettings,
                    telegramLink: `https://t.me/${e.target.value.replace("https://t.me/", "")}`,
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
                value={projectSettings.facebookLink}
                onChange={(e) =>
                  setProjectSettings({
                    ...projectSettings,
                    facebookLink: `https://facebook.com/${e.target.value.replace("https://facebook.com/", "")}`,
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
                value={projectSettings.instagramLink}
                onChange={(e) =>
                  setProjectSettings({
                    ...projectSettings,
                    instagramLink: `https://instagram.com/${e.target.value.replace("https://instagram.com/", "")}`,
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
                value={projectSettings.linkedInLink}
                onChange={(e) =>
                  setProjectSettings({
                    ...projectSettings,
                    linkedInLink: `https://linkedin.com/in/${e.target.value.replace("https://linkedin.com/in/", "")}`,
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
                value={projectSettings.playstoreLink}
                onChange={(e) =>
                  setProjectSettings({
                    ...projectSettings,
                    playstoreLink: `https://play.google.com/store/apps/details?id=${e.target.value.replace("https://play.google.com/store/apps/details?id=", "")}`,
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
                value={projectSettings.XLink}
                onChange={(e) =>
                  setProjectSettings({
                    ...projectSettings,
                    XLink: `https://twitter.com/${e.target.value.replace(/^https:\/\/twitter\.com\//, "")}`,
                  })
                }
                className="col-span-6 w-full p-2 text-black border border-gray-300 rounded-md"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              disabled={updateProjectSettings.isPending}
            >
              {updateProjectSettings.isPending ? "Updating..." : "Update Project Settings"}
            </button>

          </form>
        </section>
      </div>

    </div>
  );
};

export default SettingsComponent;
