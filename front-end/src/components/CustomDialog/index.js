import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: '8px 16px 0 16px',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  margin: '0 auto',
}));

export default function CustomDialog(props) {
  const { children, value, index, ...other } = props;

  const handleClose = () => {
    props.handleClose(false);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        closeAfterTransition={false}
        sx={{
          width: { xs: 'auto', sm: '800px' },
          minWidth: { xs: 'auto', sm: '800px' },
          maxWidth: { xs: 'auto', sm: '800px' },
        }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            color: '#ffffff',
            backgroundColor: '#CE8786',
            fontFamily: 'Aniron',
            fontWeight: 'bold',
            fontSize: '1em',
          }}
          id="customized-dialog-title"
        >
          {props.title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: '#fff',
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {children}
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="outlined"
            startIcon={props.cancelButtonIcon}
            onClick={props.handleCancel}
          >
            {props.cancelButtonLabel}
          </Button>
          <div style={{flex: '1 0 0'}} />
          <Button
            autoFocus
            color="secondary"
            variant="contained"
            startIcon={props.confirmButtonIcon}
            sx={{ color: '#ffffff' }}
            onClick={props.handleConfirm}
          >
            {props.confirmButtonLabel}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
