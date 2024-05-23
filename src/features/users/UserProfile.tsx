import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import DrawIcon from '@mui/icons-material/Draw';
import { Button } from "@mui/material";

import { AppState, useAppDispatch } from "../../redux/store";
import { useTheme } from "../../components/contextAPI/ThemeContext";
import UserDefaultAvatar from "./defaultAvatar.jpeg";
import AvatarUpload from "./AvatarUpload";
import { usersActions } from "./userSlice";
import EditUsernameModal from "./EditUsernameModal";

export default function UserProfile() {
  const { theme } = useTheme();
  const color = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.default;
  const user = useSelector((state: AppState) => state.users.userLoggedIn);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [openAvatarUploadModal, setOpenAvatarUploadModal] = useState(false);
  const [openEditUsernameModal, setOpenEditUsernameModal] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.userName || "");
  const dispatch = useAppDispatch();

  const handleMouseEnter = () => {
    setShowUploadButton(true);
  };

  const handleMouseLeave = () => {
    setShowUploadButton(false);
  };

  const handleOpenAvatarUploadModal = () => {
    setOpenAvatarUploadModal(true);
  };

  const handleCloseAvatarUploadModal = () => {
    setOpenAvatarUploadModal(false);
  };

  const handleOpenEditUsernameModal = () => {
    setOpenEditUsernameModal(true);
  };

  const handleCloseEditUsernameModal = () => {
    setOpenEditUsernameModal(false);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(event.target.value);
  };

  const handleUploadSuccess = () => {
    handleCloseAvatarUploadModal();
  };

  return (
    <div>
      <div
        className="max-w-md md:max-w-lg lg:max-w-xl mx-auto rounded-lg overflow-hidden shadow-2xl"
        style={{ backgroundColor }}
      >
        <div className="border-b px-4 pb-6">
          <div
            className="text-center mx-10 relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative mx-auto my-4 h-48 w-48 rounded-full border-4 border-white">
              <img
                className="h-full w-full rounded-full object-cover"
                src={user && user.avatar ? user.avatar.data : UserDefaultAvatar}
                alt="user's avatar"
              />
              {showUploadButton && (
                <div
                  className="absolute bg-transparent text-white rounded-full px-2 py-1"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    cursor: "pointer",
                  }}
                  onClick={handleOpenAvatarUploadModal}
                >
                  <AddIcon sx={{ fontSize: 60 }} />
                </div>
              )}
            </div>

            <div className="py-2">
              <h3 className="font-bold text-2xl mb-1" style={{ color }}>
                {user?.userName}
                <span
  className="ml-2 text-gray-500 cursor-pointer"
  onClick={handleOpenEditUsernameModal}
>
  <DrawIcon className="h-6 w-6" />
</span>
              </h3>
              <div className="inline-flex items-center" style={{ color }}>
                {user?.email}
              </div>
            </div>
            <div>
              <Button
                variant="text"
                type="button"
                sx={theme.typography.body1}
                // onClick={() => navigate("/login")}
              >
                Change Password
              </Button></div>
          </div>
        </div>
        <div className="px-4 py-4 flex flex-col justify-left items-left ml-20">
          <div className="flex gap-2 items-center mb-4" style={{ color }}>
            <ShoppingCartIcon />
            <span>
              <Link to="/cart">My Cart</Link>
            </span>
          </div>
          <div className="flex gap-2 items-center mb-2" style={{ color }}>
            <FavoriteIcon />
            <span>
              <Link to="/wishlist">My Wishlist</Link>
            </span>
          </div>
        </div>
      </div>

      <Modal
        open={openAvatarUploadModal}
        onClose={handleCloseAvatarUploadModal}
        aria-labelledby="upload-avatar-modal-title"
        aria-describedby="upload-avatar-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "#10B981", // 使用 Tailwind green-500 颜色
            boxShadow: 2,
            p: 4,
          }}
        >
          <AvatarUpload onUploadSuccess={handleUploadSuccess} />
        </Box>
      </Modal>

      <EditUsernameModal
        open={openEditUsernameModal}
        onClose={handleCloseEditUsernameModal}
        currentUsername={user?.userName || ""}
      />
    </div>
  );
}
