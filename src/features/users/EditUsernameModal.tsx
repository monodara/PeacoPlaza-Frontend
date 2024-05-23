import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { usersActions } from "./userSlice";
import { AppState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { UserReadDto } from "./userDto";

interface EditUsernameModalProps {
  open: boolean;
  onClose: () => void;
  currentUsername: string;
}

const EditUsernameModal: React.FC<EditUsernameModalProps> = ({
  open,
  onClose,
  currentUsername,
}) => {
  const [newUsername, setNewUsername] = useState(currentUsername);
  const dispatch = useAppDispatch();

  const user = useSelector((state: AppState) => state.users.userLoggedIn);
  const token = useSelector((state: AppState) => state.users.token);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(event.target.value);
  };

  const handleUsernameUpdate = async () => {
    console.log(token)
    console.log(user?.id)
    var response = await dispatch(usersActions.updateOne({ id: user?user.id:"", updateDto: {username: newUsername}, headers: { Authorization: `Bearer ${token}` } }));
    dispatch(usersActions.setUser(response.payload as UserReadDto))
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-username-modal-title"
      aria-describedby="edit-username-modal-description"
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
          borderColor: "#10B981",
          boxShadow: 2,
          p: 4,
        }}
      >
        <h2 id="edit-username-modal-title">Edit Username</h2>
        <TextField
          id="new-username"
          label="New Username"
          variant="outlined"
          fullWidth
          value={newUsername}
          onChange={handleUsernameChange}
          sx={{ mt: 2, mb: 2 }}
        />
        <Button variant="contained" onClick={handleUsernameUpdate} sx={{
            backgroundColor: '#10B981',
            '&:hover': {
              backgroundColor: '#33cc99',
            },
          }}>
          Confirm
        </Button>
      </Box>
    </Modal>
  );
};

export default EditUsernameModal;
