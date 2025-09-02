import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { isValid, cloneArray } from '../Rules';

export default function Header(props) {

  const handleChangeName2 = (event) => {
    let value = event.target.value;
    let changedCharacter = {
      name: '',
      family_name: '',
    };

    if ( isValid(value) && (value !== '') ) {
      let values = value.split(' ');

      if (values.length === 0) {
        changedCharacter.name = value;
        changedCharacter.family_name = '';
      } else if (values.length === 1) {
        changedCharacter.name = values[0];
        changedCharacter.family_name = '';
      } else {
        changedCharacter.name = values[0];
        changedCharacter.family_name = values.slice(1, values.length).join(' ').trim();
      }
    }

    props.changeCharacter(changedCharacter);
  };

  const handleChangeName = (event) => {
    let value = event.target.value;
    let changedCharacter = {
      name: '',
      family_name: '',
    };

    if (isValid(value)) {
      let values = value.split(' ');
      changedCharacter.name = value;
    }

    props.changeCharacter(changedCharacter);
  };

  const styles = {
    header: {
      backgroundImage: `url(${"img/sheet/sheet-header.png"})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'auto',
      backgroundPosition: 'center',

      boxSizing: 'border-box',
      margin: '0',
      width: '100%',

      height: '114px',
    },

    inputImage: {
      backgroundImage: `url(${"img/sheet/sheet-header-name.png"})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '400px',
      backgroundPosition: 'center',

      boxSizing: 'border-box',
      margin: '0 auto',
      width: '100%',
      height: '100px',
    },

    name: {
      color: '#CA5B61',
      fontFamily: 'NewBaskerville',
      fontWeight: 'bold',
      fontSize: '.75em',
      paddingTop: '20px',
      textTransform: 'uppercase',
    },

    textField: {
      display: 'block',
      textAlign: 'center',
      "& fieldset": { border: 'none' },
    },
  };

  return (
    <Box style={styles.header}>
      <Box style={styles.inputImage}>
        <Typography style={styles.name} align="center">
          {props.i18n('sheet.character-sheet.name')}
        </Typography>
        <TextField
          style={styles.textField}
          inputProps={{style:{
            textAlign: 'center',
            padding: '0',
            fontFamily: 'NewBaskerville',
            fontSize: '1.6em',
            height: '38px',
            width: '350px',
            color: 'rgba(0, 0, 0, 0.87)',
          }}}
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
          value={props.character.name}
          onChange={handleChangeName}
        />
      </Box>
    </Box>
  );
}
