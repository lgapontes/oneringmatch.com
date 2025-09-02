import React from "react";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { convertValueToNumber } from '../Rules';

export default function TextFieldAge(props) {

  const styles = {
    inputImage: {
      boxSizing: 'border-box',
      margin: '0 auto',
      width: '100%',
    },

    typography: {
      color: '#CA5B61',
      fontFamily: 'Aniron',
      fontWeight: 'bold',
      marginBottom: '4px',
      minHeight: '39px',
      verticalAlign: 'middle',
    },

    textField: {
      display: 'block',
      textAlign: 'center',

      backgroundImage: `url(${"img/sheet/sheet-diamond.png"})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '70px',
      backgroundPosition: 'bottom',
    },

    inputProps: {
      textAlign: 'center',
      padding: '0',
      fontFamily: 'NewBaskerville',
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: '1.6em',
      height: '72px',
      width: '60px',
    },
  };

  return (
    <Box style={styles.inputImage}>
      <Typography
        style={styles.typography}
        align="center"
        sx={{
          fontSize: { xs: '0.7em', sm: '0.8em' },
        }}
      >
        {props.label}
      </Typography>
      <TextField
        style={styles.textField}
        inputProps={{
            style: styles.inputProps
        }}
        sx={{
          "& fieldset": {
            border: 'none',
          },
        }}
        variant="outlined"
        readOnly={!props.editingCharacterSheet}
        InputProps={{
          onFocus: (event) => {
            if (!props.editingCharacterSheet) {
              event.target.blur();
            }
          }
        }}
        value={props.value}
        onChange={props.handleChangeValue}
      />
    </Box>
  );
}
