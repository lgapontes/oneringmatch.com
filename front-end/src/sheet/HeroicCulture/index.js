import React from "react";

import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { FormHelperText } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

export default function HeroicCulture(props) {

  const heroicCultures = (props.i18nReady) ? props.i18n('sheet.character-sheet.heroic-cultures', { returnObjects: true }) : [];
  const standardsOfLiving = (props.i18nReady) ? props.i18n('sheet.character-sheet.standards-of-living', { returnObjects: true }) : [];

  const handleChangeHeroicCulture = (event) => {
    let indexHeroicCulture = event.target.value;
    let changedCharacter = props.changeHeroicCulture(indexHeroicCulture);
    props.changeCharacter(changedCharacter);
  };

  const handleChangeStandardsOfLiving = (event) => {
    let index = event.target.value;
    let changedCharacter = props.changeStandardsOfLiving(index);
    props.changeCharacter(changedCharacter);
  };

  const handleChangeTreasure = (event) => {
    let changedCharacter = {treasure: event.target.value};
    props.changeCharacter(changedCharacter);
  };

  const handleChangeAge = (event) => {
    let changedCharacter = {age: event.target.value};
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
            id="sheet.character-sheet.heroic-culture.label"
            color="secondary"
          >
            {props.i18n('sheet.character-sheet.heroic-culture')}
          </InputLabel>
          <Select
            labelId="sheet.character-sheet.heroic-culture.label"
            id="sheet.character-sheet.heroic-culture.select"
            label={props.i18n('sheet.character-sheet.heroic-culture')}
            style={props.styles.input}
            color="secondary"
            value={props.character.heroic_culture_index}
            onChange={handleChangeHeroicCulture}
          >
            {
              heroicCultures.map((entry,index)=>(
                <MenuItem key={`${entry}-${index}`} value={index}>{entry}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} sx={props.styles.item}>
        <TextField
          label={props.i18n('sheet.character-sheet.cultural-blessing')}
          fullWidth
          style={props.styles.input}
          color="secondary"
          focused
          value={props.character.cultural_blessing_name}
          readOnly
          InputProps={{
            onFocus: (event) => {
              event.target.blur();
            }
          }}
        />
      </Grid>

      <Grid item xs={12} sx={props.styles.item}>
        <TextField
          label={props.i18n('sheet.character-sheet.cultural-blessing-rules')}
          fullWidth
          style={props.styles.textarea}
          color="brown"
          focused
          variant="standard"
          multiline
          minRows={2}
          value={props.character.cultural_blessing}
          InputLabelProps={{
            shrink: true,
            sx: {
             left: "4px",
             top: "4px",
            }
          }}
          InputProps={{
            sx: {
             padding: '4px',
             readOnlye: 'true',
           },
           onFocus: (event) => {
             event.target.blur();
           }
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6} sx={props.styles.item}>
        <FormControl
          fullWidth
          color="secondary"
          focused
        >
          <InputLabel
            id="sheet.character-sheet.standard-of-living.label"
            color="secondary"
          >
            {props.i18n('sheet.character-sheet.standard-of-living')}
          </InputLabel>
          <Select
            labelId="sheet.character-sheet.standard-of-living.label"
            id="sheet.character-sheet.standard-of-living.select"
            label={props.i18n('sheet.character-sheet.standard-of-living')}
            style={props.styles.input}
            color="secondary"
            value={props.character.standard_of_living_index}
            onChange={handleChangeStandardsOfLiving}
            readOnly={!props.editingCharacterSheet}
          >
            {
              standardsOfLiving.map((entry,index)=>(
                <MenuItem key={`${entry}-${index}`} value={index}>{entry}</MenuItem>
              ))
            }
          </Select>
          <FormHelperText
            id="sheet.character-sheet.standard-of-living.help">
            {`${props.i18n('sheet.character-sheet.starting_treasure_rating')}: ${props.character.starting_treasure_rating}`}
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={6} sm={3} sx={props.styles.item}>
        <TextField
          label={props.i18n('sheet.character-sheet.treasure')}
          fullWidth
          style={props.styles.input}
          color="secondary"
          focused
          value={props.character.treasure}
          readOnly={!props.editingCharacterSheet}
          InputProps={{
            onFocus: (event) => {
              if (!props.editingCharacterSheet) {
                event.target.blur();
              }
            }
          }}
          onChange={handleChangeTreasure}
        />
      </Grid>
      <Grid item xs={6} sm={3} sx={props.styles.item}>
        <TextField
          label={props.i18n('sheet.character-sheet.age')}
          fullWidth
          style={props.styles.input}
          color="secondary"
          focused
          helperText={`${props.i18n('sheet.character-sheet.age-suggestion')}: ${props.character.range_ages.min}~${props.character.range_ages.max}`}
          readOnly={!props.editingCharacterSheet}
          InputProps={{
            onFocus: (event) => {
              if (!props.editingCharacterSheet) {
                event.target.blur();
              }
            }
          }}
          onChange={handleChangeAge}
        />
      </Grid>
    </>
  );
}
