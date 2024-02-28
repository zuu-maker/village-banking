import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ModalComponent({ current, open, setOpen, handleEdit }) {
  const [name, setName] = React.useState("");
  const handleClose = () => setOpen(false);
  React.useEffect(() => {
    if (current && current.name) {
      setName(current.name);
    }
  }, [current]);

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            className="w-60"
            id="filled-basic"
            label="Name"
            variant="filled"
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
          />
          <Button onClick={() => handleEdit(current.id, name)}>Edit </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default ModalComponent;
