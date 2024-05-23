import React from "react";
import { Modal, Box, Button } from "@mui/material";

interface DeleteAccountModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="delete-account-modal-title"
      aria-describedby="delete-account-modal-description"
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
        <h2 id="delete-account-modal-title">Delete Account</h2>
        <p id="delete-account-modal-description">
          Are you sure you want to delete your account? This action cannot be undone.
        </p>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button onClick={onClose} sx={{ color: '#10B981' }}>
            Cancel
          </Button>
          <Button onClick={onConfirm} sx={{ color: '#d32f2f' }}>
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteAccountModal;
