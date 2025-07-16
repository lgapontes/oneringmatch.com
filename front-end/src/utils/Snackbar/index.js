import React from "react";
import MaterialSnackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Snackbar({message,severity,opened,handleClose}) {

  const vertical = 'bottom';
  const horizontal = 'center';

  return (
    <MaterialSnackbar
      key={Math.random()}
      anchorOrigin={{ vertical, horizontal }}
      open={opened}
      autoHideDuration={6000}
      onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </MaterialSnackbar>
  );
}

export const SEVERITY = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};
