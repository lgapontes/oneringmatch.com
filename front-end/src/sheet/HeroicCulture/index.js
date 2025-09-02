import React from "react";

import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { FormHelperText } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import TextFieldAge from '../TextFieldAge';
import CharacterPicture from '../CharacterPicture';

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
            },
            sx: {
              fontFamily: 'NewBaskerville',
            },
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
          value={props.character.cultural_blessing}
          InputLabelProps={{
            shrink: true,
            sx: {
             left: "4px",
             top: "4px",
            }
          }}
          InputProps={{
            rows: 2,
            multiline: true,
            inputComponent: 'textarea',
            sx: {
              padding: '4px',
              readOnlye: 'true',
              fontFamily: 'NewBaskerville',
            },
            onFocus: (event) => {
              event.target.blur();
            }
          }}
        />
      </Grid>

      <Grid item xs={12} sm={4} sx={props.styles.item}>
        <CharacterPicture character={props.character} />
      </Grid>
      <Grid item xs={12} sm={8} sx={props.styles.item}>
        <Grid container spacing={2}>

          <Grid item xs={12} sm={12}>
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
                {`${props.i18n('sheet.character-sheet.starting-treasure-rating')}: ${props.character.starting_treasure_rating}`}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={props.fullCharacterSheet ? 6 : 12} sm={props.fullCharacterSheet ? 6 : 12}>
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
                },
                sx: {
                  fontFamily: 'NewBaskerville',
                },
              }}
              onChange={handleChangeTreasure}
            />
          </Grid>
          {
            (props.fullCharacterSheet) ? (
              <Grid item xs={6} sm={6}>
                <TextFieldAge
                  styles={props.styles}
                  i18n={props.i18n}
                  editingCharacterSheet={props.editingCharacterSheet}
                  character={props.character}
                  changeCharacter={props.changeCharacter}
                />
              </Grid>
            ) : <></>
          }

        </Grid>
      </Grid>

    </>
  );
}
