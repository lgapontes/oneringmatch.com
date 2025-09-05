import React from "react";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { convertValueToNumber, mergeDictionaries } from '../Rules';

export default function TextFieldAttributes(props) {

  const KEY_SECONDARY_ATTRIBUTE = (props.attribute === 'strength') ? 'endurance' :
    (props.attribute === 'heart') ? 'hope' : 'parry';

  const valueTN = props.character.attributes[`TN_${props.attribute}`];
  const valueRating = props.character.attributes[props.attribute];
  const valueSecondaryAttribute = props.character.attributes[KEY_SECONDARY_ATTRIBUTE];

  const handleChangeRating = (event) => {
    let value = convertValueToNumber(event.target.value);
    let attributes = {};
    attributes[props.attribute] = value;
    let changedCharacter = {
      attributes: mergeDictionaries(props.character.attributes,attributes),
    };
    props.changeCharacter(changedCharacter);
  };

  const handleChangeSecondaryAttribute = (event) => {
    let value = convertValueToNumber(event.target.value);
    let attributes = {};
    attributes[KEY_SECONDARY_ATTRIBUTE] = value;
    let changedCharacter = {
      attributes: mergeDictionaries(props.character.attributes,attributes),
    };
    props.changeCharacter(changedCharacter);
  };

  const handleChangeTN = (event) => {
    let value = convertValueToNumber(event.target.value);
    let attributes = {};
    attributes[`TN_${props.attribute}`] = value;
    let changedCharacter = {
      attributes: mergeDictionaries(props.character.attributes,attributes),
    };
    props.changeCharacter(changedCharacter);
  };

  const styles = {
    inputImage: {
      display: 'block',
      position: 'relative',
      boxSizing: 'border-box',
      margin: '0 auto',
      width: '300px',
      height: '250px',

      backgroundImage: `url(${"img/sheet/sheet-attributes.png"})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '250px 181px',
      backgroundPosition: 'center',
    },

    typography: {
      display: 'block',
      position: 'absolute',
      color: 'rgba(0, 0, 0, 0.87)',
      fontFamily: 'NewBaskerville',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      textAlign: 'center',
    },

    textField: {
      display: 'block',
      position: 'absolute',
      textAlign: 'center',
    },

    inputPropsMinor: {
      textAlign: 'center',
      padding: '0',
      fontFamily: 'NewBaskerville',
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: '34px',
      height: '80px',
      width: '82px',
    },

    inputPropsMajor: {
      textAlign: 'center',
      padding: '0',
      fontFamily: 'NewBaskerville',
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: '46px',
      height: '126px',
      width: '122px',
    },
  };

  return (
    <Box style={styles.inputImage}>

      <Typography style={styles.typography} sx={{
        fontSize: '22px',
        width: '60px',
        left: '68px',
        top: '160px',
      }}>
        {props.i18n('sheet.character-sheet.tn')}
      </Typography>
      <TextField
        style={styles.textField}
        inputProps={{
            style: styles.inputPropsMajor
        }}
        sx={{
          "& fieldset": {
            border: 'none',
          },
          top: '63px',
          left: '94px',
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
        value={valueTN}
        onChange={handleChangeTN}
      />

      <Typography style={styles.typography} sx={{
        fontSize: '14px',
        width: '120px',
        left: '174px',
        top: '10px',
      }}>
        {props.i18n('sheet.character-sheet.rating')}
      </Typography>
      <TextField
        style={styles.textField}
        inputProps={{
            style: styles.inputPropsMinor
        }}
        sx={{
          "& fieldset": {
            border: 'none',
          },
          top: '35px',
          left: '192px',
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
        value={valueRating}
        onChange={handleChangeRating}
      />

      <Typography style={styles.typography} sx={{
        fontSize: '14px',
        width: '120px',
        left: '174px',
        top: '218px',
      }}>
        {props.i18n(`sheet.character-sheet.${KEY_SECONDARY_ATTRIBUTE}`)}
      </Typography>
      <TextField
        style={styles.textField}
        inputProps={{
            style: styles.inputPropsMinor
        }}
        sx={{
          "& fieldset": {
            border: 'none',
          },
          top: '132px',
          left: '192px',
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
        value={valueSecondaryAttribute}
        onChange={handleChangeSecondaryAttribute}
      />

    </Box>
  );
}
