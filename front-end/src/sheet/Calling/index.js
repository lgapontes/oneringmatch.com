import React from "react";

import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

export default function Calling(props) {

  const callings = (props.i18nReady) ? props.i18n('sheet.character-sheet.callings', { returnObjects: true }) : [];

  const handleChangeCalling = (event) => {
    let indexCalling = event.target.value;
    let changedCharacter = props.changeCalling(indexCalling);
    props.changeCharacter(changedCharacter);
  };

  return (
    <>
      <Grid item xs={12} sm={6} sx={props.styles.item}>
        <FormControl
          fullWidth
          color="secondary"
          focused
        >
          <InputLabel
            id="sheet.character-sheet.calling.label"
            color="secondary"
          >
            {props.i18n('sheet.character-sheet.calling')}
          </InputLabel>
          <Select
            labelId="sheet.character-sheet.calling.label"
            id="sheet.character-sheet.calling.select"
            label={props.i18n('sheet.character-sheet.calling')}
            style={props.styles.input}
            color="secondary"
            value={props.character.calling_index}
            onChange={handleChangeCalling}
          >
            {
              callings.map((entry,index)=>(
                <MenuItem key={`${entry}-${index}`} value={index}>{entry}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} sx={props.styles.item}>
        <TextField
          label={props.i18n('sheet.character-sheet.shadow-path')}
          fullWidth
          style={props.styles.input}
          color="secondary"
          focused
          value={props.character.shadow_path}
          readOnly
          InputProps={{
            onFocus: (event) => {
              event.target.blur();
            },
            sx: {
              fontFamily: 'NewBaskerville',
            },
          }}
        />
      </Grid>
    </>
  );
}
