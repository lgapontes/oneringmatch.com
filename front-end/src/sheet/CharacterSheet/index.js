import React, { useEffect, useState } from "react";

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CheckIcon from '@mui/icons-material/Check';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { FormHelperText } from '@mui/material';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { get, put, del } from '../../utils/Api';
import Header from '../Header';
import HeroicCulture from '../HeroicCulture';

export default function CharacterSheet(props) {

  const callings = (props.i18nReady) ? props.i18n('sheet.character-sheet.callings', { returnObjects: true }) : [];

  useEffect(()=>{

  },[props.character]);

  const styles = {
    characterSheet: {
      backgroundImage: `url(${"img/background.jpg"})`,
      backgroundSize: 'cover',

      boxSizing: 'border-box',
      margin: '0 auto',
      width: '98%',

      boxShadow: '0 0 10px #999',
    },

    item: {
      padding: '0 15px 15px 15px !important',
    },
    header: {
      padding: '0 !important',
    },

    input: {
      margin: '0',
      fontFamily: 'NewBaskerville',
    },
    textarea: {
      margin: '0 0 4px 0',
      fontFamily: 'NewBaskerville',
      backgroundColor: 'rgba(66, 35, 0, .05)',
    },
  };

  return (
    <Grid container spacing={2} style={styles.characterSheet}>
      <Grid item xs={12} sx={styles.header}>
        <Header
          i18n={props.i18n}
          changeCharacter={props.changeCharacter}
          editingCharacterSheet={props.editingCharacterSheet}
        />
      </Grid>

      <HeroicCulture
        styles={styles}
        i18n={props.i18n}
        i18nReady={props.i18nReady}
        character={props.character}
        changeHeroicCulture={props.changeHeroicCulture}
        changeStandardsOfLiving={props.changeStandardsOfLiving}
        changeCharacter={props.changeCharacter}
        editingCharacterSheet={props.editingCharacterSheet}
      />

      <Grid item xs={12} sm={6} sx={styles.item}>
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
            style={styles.input}
            color="secondary"
            defaultValue=""
          >
            {
              callings.map((entry,index)=>(
                <MenuItem key={`${entry}-${index}`} value={index}>{entry}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} sx={styles.item}>
        <TextField
          label={props.i18n('sheet.character-sheet.heroic-culture')}
          fullWidth
          style={styles.input}
          color="secondary"
          focused
        />
      </Grid>
      <Grid item xs={12} sx={styles.item}>
        <TextField label="Email" fullWidth style={styles.input} />
      </Grid>
    </Grid>
  );

  /*
  return (
    <>
    </>
  );
  */
}
