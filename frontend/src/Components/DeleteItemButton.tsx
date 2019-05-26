import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Theme
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { delet } from "../Utilities/Http";

const useStyles = makeStyles((theme: Theme) => ({
  common: {
    marginRight: "8px"
  }
}));

const DeleteItemButton = ({
  path,
  params,
  onDeleted
}: {
  path: string;
  params: Map<string, string>;
  onDeleted: () => void;
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    handleClose();
    await delet(path, params);
    onDeleted();
  };

  const handleCancel = () => {
    handleClose();
    setLoading(false);
  };

  const deleteSubmit = async () => {
    setLoading(true);
    setOpen(true);
  };

  return (
    <>
      {loading ? (
        <CircularProgress size={24} className={classes.common} />
      ) : (
        <Clear onClick={deleteSubmit} className={classes.common} />
      )}
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action can not be undone!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary" autoFocus={true}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteItemButton;
