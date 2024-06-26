import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../app/store";
import { usersActions } from "./userSlice";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface AvatarUploadProps {
  onUploadSuccess: () => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ onUploadSuccess }) => {
  const dispatch = useAppDispatch();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const user = useSelector((state: AppState) => state.users.userLoggedIn);
  const token = localStorage.getItem("token");

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("AvatarImage", file);
    data.append("UserId", user?.id ?? "");

    setIsUploading(true);
    setError(null);
    try {
      var response = await dispatch(
        usersActions.uploadAvatar({
          data,
          headers: { Authorization: `Bearer ${token}` },
        })
      ).unwrap();
      onUploadSuccess(); // Close the modal on successful upload
      dispatch(usersActions.setUser(response));
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError(errorMessage);
      alert(`Upload failed: ${errorMessage}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box sx={{ textAlign: "center", p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Upload Avatar
      </Typography>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="file-input"
        type="file"
        onChange={uploadFile}
      />
      <label htmlFor="file-input">
        <Button
          variant="contained"
          component="span"
          disabled={isUploading}
          sx={{
            backgroundColor: "#10B981",
            "&:hover": {
              backgroundColor: "#33cc99",
            },
          }}
        >
          {isUploading ? <CircularProgress size={24} /> : "Upload"}
        </Button>
      </label>
      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default AvatarUpload;
