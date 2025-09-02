import React from "react";
import TextField from '@mui/material/TextField';
import { convertValueToNumber } from '../Rules';

export default function TextFieldAge(props) {

  const handleChangeAge = (event) => {
    let age = convertValueToNumber(event.target.value);
    let changedCharacter = {age: age};
    props.changeCharacter(changedCharacter);
  };

  return (
    <TextField
      label={props.i18n('sheet.character-sheet.age')}
      fullWidth
      style={props.styles.input}
      color="secondary"
      focused
      helperText={`${props.i18n('sheet.character-sheet.age-suggestion')}: ${props.character.range_ages.min}~${props.character.range_ages.max}`}
      readOnly={!props.editingCharacterSheet}
      InputProps={{
        inputMode: 'numeric',
        onFocus: (event) => {
          if (!props.editingCharacterSheet) {
            event.target.blur();
          }
        },
      }}
      onChange={handleChangeAge}
      value={props.character.age}
    />
  );
}
