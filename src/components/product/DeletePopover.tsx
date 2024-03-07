import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { buttonStyle, popoverStyle } from "../../misc/style";
import { useTheme } from "../contextAPI/ThemeContext";
import { green, grey } from "@mui/material/colors";

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
  const { theme } = useTheme();
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
          <Box sx={popoverStyle}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Do you confirm to delete the item?
            </Typography>
            <Button
              variant="outlined"
              onClick={onConfirmDelete}
              sx={{ backgroundColor: "lightgrey", color: green[600] }}
            >
              Confirm
            </Button>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{ backgroundColor: "lightgrey", color: green[600] }}
            >
              Cancel
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
