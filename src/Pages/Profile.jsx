import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../Components/Sidebar";
import { useAuth, useUpdateUser, useGetMe } from "../hooks/useAuth";
import { toast } from "react-hot-toast";
import {
  FaCamera,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaLock,
  FaSave,
} from "react-icons/fa";
import default_avt from "../assets/images/default_avatar.png";

const Profile = () => {
  const { userInfo, isGetting } = useGetMe();
  const { changePass, isChangingPass } = useAuth();
  const { updateAvatar, isUpdatingAvatar, updateInfo, isUpdatingInfo } = useUpdateUser();

  const [formData, setFormData] = useState({
    first_name: userInfo?.first_name || "",
    last_name: userInfo?.last_name || "",
    phone: userInfo?.phone || "",
  });

  const [passData, setPassData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [previewAvatar, setPreviewAvatar] = useState(
    userInfo?.avatar || default_avt,
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    document.title = "My Profile | Yalina";
  }, []);

  useEffect(() => {
    if (userInfo) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        first_name: userInfo.first_name || "",
        last_name: userInfo.last_name || "",
        phone: userInfo.phone || "",
      });
      setPreviewAvatar(userInfo.avatar || default_avt);
    }
  }, [userInfo?.first_name, userInfo?.last_name, userInfo?.phone, userInfo?.avatar]);

  const handleInfoChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePassChange = (e) => {
    setPassData({ ...passData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file!");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
         toast.error("Image size must be less than 10MB");
         return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitInfo = async (e) => {
    e.preventDefault();

    try {
      // 1. Upload Avatar Logic (Mock)
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        await updateAvatar(formData);
      }

      // 2. Update User Logic (Mock)
      const updatePayload = {
        ...formData,
      };

      await updateInfo(updatePayload);
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (
      !passData.newPassword ||
      !passData.confirmPassword ||
      !passData.password
    ) {
      toast.error("Please enter complete information!");
      return;
    }
    await changePass(passData);
    setPassData({ password: "", newPassword: "", confirmPassword: "" });
  };

  if (isGetting) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-base-300 font-sans items-start">
      <Sidebar />

      {/* Main Content */}
      <div className="w-full flex-1 flex flex-col p-4 sm:p-6 lg:p-8 gap-6 overflow-x-hidden overflow-y-auto">
        {/* Header Title */}
        <div className="bg-base-100 p-4 rounded-xl shadow-sm border border-base-200">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaUser className="text-secondary" /> My Profile
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage personal information and account security
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* --- LEFT COLUMN: AVATAR CARD --- */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-md border border-base-200">
              <div className="card-body items-center text-center">
                <div className="relative group">
                  {/* Avatar Circle */}
                  <div className="avatar">
                    <div className="w-32 h-32 rounded-full ring ring-offset-base-100 ring-offset-2 overflow-hidden">
                      <img
                        src={previewAvatar}
                        alt="Profile"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Camera Icon Overlay */}
                  <div
                    className="absolute bottom-0 right-0 bg-base-100 p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-100 transition-all border border-gray-200"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <FaCamera size={18} className="text-gray-600" />
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>

                {isUpdatingAvatar && (
                    <span className="text-sm text-success">Updating avatar...</span>
                )}

                <h2 className="card-title mt-4 text-2xl">
                  {userInfo?.first_name} {userInfo?.last_name}
                </h2>
                <div className="badge badge-secondary badge-outline mt-1 uppercase font-bold text-xs">
                  {userInfo?.role}
                </div>

                <div className="w-full divider my-2"></div>

                <div className="w-full text-left space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm font-medium">
                      Email
                    </span>
                    <span className="text-gray-700 text-sm truncate">
                      {userInfo?.email}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm font-medium">
                      Joined Date
                    </span>
                    <span className="text-gray-700 text-sm">
                      {userInfo?.createdAt
                        ? new Date(userInfo.createdAt).toLocaleDateString("en-US")
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm font-medium">
                      Balance
                    </span>
                    <span className="text-emerald-600 font-bold text-sm">
                      ${userInfo?.balance?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: FORMS --- */}
          <div className="lg:col-span-2 space-y-6">
            {/* Form 1: Personal Information */}
            <div className="card bg-base-100 shadow-md border border-base-200">
              <div className="card-body">
                <h3 className="card-title text-lg border-b border-gray-100 pb-2 mb-4">
                  Personal Information
                </h3>
                <form
                  onSubmit={handleSubmitInfo}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-gray-600">
                        First Name
                      </span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInfoChange}
                      placeholder="Enter first name"
                      className="input input-bordered focus:input-secondary w-full"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-gray-600">
                        Last Name
                      </span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInfoChange}
                      placeholder="Enter last name"
                      className="input input-bordered focus:input-secondary w-full"
                    />
                  </div>

                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text font-medium text-gray-600 flex items-center gap-2">
                        <FaPhone className="text-gray-400" /> Phone Number
                      </span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInfoChange}
                      placeholder="e.g. 0912345678"
                      className="input input-bordered focus:input-secondary w-full"
                    />
                  </div>

                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text font-medium text-gray-600 flex items-center gap-2">
                        <FaEnvelope className="text-gray-400" /> Email (Cannot
                        be changed)
                      </span>
                    </label>
                    <input
                      type="text"
                      value={userInfo?.email}
                      disabled
                      className="input input-bordered bg-gray-100 text-gray-500 w-full cursor-not-allowed"
                    />
                  </div>

                  <div className="md:col-span-2 mt-2 flex justify-end">
                    <button
                      type="submit"
                      className="btn btn-secondary text-white"
                      disabled={isUpdatingInfo}
                    >
                      {isUpdatingInfo ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        <>
                          <FaSave /> Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Form 2: Change Password */}
            <div className="card bg-base-100 shadow-md border border-base-200">
              <div className="card-body">
                <h3 className="card-title text-lg border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
                  <FaLock className="text-sky-500" /> Change Password
                </h3>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-gray-600">
                        Current Password
                      </span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={passData.password}
                      onChange={handlePassChange}
                      placeholder="••••••••"
                      className="input input-bordered focus:input-info w-full"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium text-gray-600">
                          New Password
                        </span>
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passData.newPassword}
                        onChange={handlePassChange}
                        placeholder="••••••••"
                        className="input input-bordered focus:input-info w-full"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium text-gray-600">
                          Confirm New Password
                        </span>
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passData.confirmPassword}
                        onChange={handlePassChange}
                        placeholder="••••••••"
                        className="input input-bordered focus:input-info w-full"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      className="btn btn-info text-white"
                      disabled={isChangingPass}
                    >
                      {isChangingPass ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        "Update Password"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
