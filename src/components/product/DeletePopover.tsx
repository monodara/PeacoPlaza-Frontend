import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid gray",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};
const buttonStyle = {
  marginRight: 2,
  backgroundColor: "#72BD41",
  color: "white",
  "&:hover": {
    backgroundColor: "rgb(114,220,65)", // Change the background color on hover
  },
};
interface DeletePopoverProps {
  open: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
}
export default function DeletePopover({
  open,
  onClose,
  onConfirmDelete,
}: DeletePopoverProps) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Do you confirm to delete the item?
            </Typography>
            <Button
              variant="contained"
              sx={buttonStyle}
              onClick={onConfirmDelete}
            >
              Confirm
            </Button>
            <Button variant="contained" sx={buttonStyle} onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
