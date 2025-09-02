import React, { useEffect, useState } from "react";

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CheckIcon from '@mui/icons-material/Check';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

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
import Calling from '../Calling';
import FeaturesChip from '../FeaturesChip';
import TextFieldDiamond from '../TextFieldDiamond';
import SheetDetail1 from '../../images/SheetDetail1';
import Attributes from '../Attributes';

import { keyInDict, isValid, isValidIndex, convertValueToNumber, mergeDictionaries } from '../Rules';
import {
  DISTINCTIVE_FEATURES,
  ADDITIONAL_DISTINCTIVE_FEATURES,
} from '../Data';

export default function CharacterSheet(props) {

  const combatProficiencies = (props.i18nReady) ? props.i18n('sheet.character-sheet.combat-proficiencies', { returnObjects: true }) : [];

  const translateDistinctiveFeatures = () => {
    return props.character.distinctive_features.map((entry)=>{
      let value = '';
      if (keyInDict(entry,DISTINCTIVE_FEATURES)) {
        value = props.i18n(`sheet.character-sheet.distinctive-features.${DISTINCTIVE_FEATURES[entry]}`);
      } else if (keyInDict(entry,ADDITIONAL_DISTINCTIVE_FEATURES)) {
        value = props.i18n(`sheet.character-sheet.additional-distinctive-features.${ADDITIONAL_DISTINCTIVE_FEATURES[entry]}`);
      }
      return value;
    }).filter(str => str !== '');
  };

  const translateFlaws = () => {
    const shadow_paths = (props.i18nReady) ? props.i18n('sheet.character-sheet.shadow-paths', { returnObjects: true }) : [];
    let shadow_path_index = props.character.shadow_path_index;
    if (
      !isValid(shadow_path_index) ||
      (shadow_path_index === '') ||
      !isValidIndex(shadow_path_index,shadow_paths)
    ) {
      shadow_path_index = 0;
    }

    if (props.character.flaws.length === 0) {
      return [];
    } else {
      return props.character.flaws.map(entry=>{
        return props.i18n(`sheet.character-sheet.flaws.${shadow_path_index}.${entry}`);
      });
    }
  };

  const callings = (props.i18nReady) ? props.i18n('sheet.character-sheet.callings', { returnObjects: true }) : [];
  const distinctive_features = translateDistinctiveFeatures();
  const flaws = translateFlaws();

  const defaultHandleDiamond = (event,key) => {
    let value = convertValueToNumber(event.target.value);
    let current_stats = {};
    current_stats[key] = value;
    let changedCharacter = {
      current_stats: mergeDictionaries(props.character.current_stats,current_stats),
    };
    props.changeCharacter(changedCharacter);
  };

  const handleChangePatron = (event) => {
    let changedCharacter = {
      patron: event.target.value,
    };
    props.changeCharacter(changedCharacter);
  };

  const handleChangePatronFellowshipBonus = (event) => {
    let changedCharacter = {
      patron_fellowship_bonus: convertValueToNumber(event.target.value),
    };
    props.changeCharacter(changedCharacter);
  };

  const handleChangePatronAdvantage = (event) => {
    let changedCharacter = {
      patron_advantage: event.target.value,
    };
    props.changeCharacter(changedCharacter);
  };

  useEffect(()=>{

  },[props.character]);

  const styles = {
    characterSheet: {
      backgroundImage: `url(${"img/sheet/background.jpg"})`,
      backgroundSize: 'cover',

      boxSizing: 'border-box',
      margin: '0 auto',
      width: '98%',

      boxShadow: '0 0 10px #999',

      marginBottom: '1000px',
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
          character={props.character}
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
        fullCharacterSheet={true}
      />

      <Grid item xs={12} sx={styles.item}>
        <FeaturesChip
          label={props.i18n('sheet.character-sheet.distinctive-features-label')}
          values={distinctive_features}
        />
      </Grid>

      <Calling
        styles={styles}
        i18n={props.i18n}
        i18nReady={props.i18nReady}
        character={props.character}
        changeCalling={props.changeCalling}
        changeCharacter={props.changeCharacter}
        editingCharacterSheet={props.editingCharacterSheet}
      />

      <Grid item xs={12} sx={styles.item}>
        <FeaturesChip
          label={props.i18n('sheet.character-sheet.flaws-label')}
          values={flaws}
        />
      </Grid>

      <Grid item xs={4} sm={2} sx={styles.item}>
        <TextFieldDiamond
          label={props.i18n('sheet.character-sheet.adventure-points')}
          editingCharacterSheet={props.editingCharacterSheet}
          value={props.character.current_stats.adventure_points}
          handleChangeValue={(event)=>{defaultHandleDiamond(event,'adventure_points')}}
        />
      </Grid>
      <Grid item xs={4} sm={2} sx={styles.item}>
        <TextFieldDiamond
          label={props.i18n('sheet.character-sheet.skill-points')}
          editingCharacterSheet={props.editingCharacterSheet}
          value={props.character.current_stats.skill_points}
          handleChangeValue={(event)=>{defaultHandleDiamond(event,'skill_points')}}
        />
      </Grid>
      <Grid item xs={4} sm={2} sx={styles.item}>
        <TextFieldDiamond
          label={props.i18n('sheet.character-sheet.fellowship-score')}
          editingCharacterSheet={props.editingCharacterSheet}
          value={props.character.current_stats.fellowship_score}
          handleChangeValue={(event)=>{defaultHandleDiamond(event,'fellowship_score')}}
        />
      </Grid>

      <Grid item xs={12} sm={6} sx={styles.item}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <TextField
              label={props.i18n('sheet.character-sheet.patron')}
              fullWidth
              style={styles.input}
              color="secondary"
              focused
              value={props.character.patron}
              onChange={handleChangePatron}
              InputProps={{
                sx: {
                  fontFamily: 'NewBaskerville',
                },
              }}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              label={props.i18n('sheet.character-sheet.patron-fellowship-bonus')}
              fullWidth
              style={styles.input}
              color="secondary"
              focused
              value={props.character.patron_fellowship_bonus}
              onChange={handleChangePatronFellowshipBonus}
              InputProps={{
                sx: {
                  fontFamily: 'NewBaskerville',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} sx={{
              display: { xs: 'none', sm: 'block' },
            }}>
            <SheetDetail1 />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12} sx={styles.item}>
        <TextField
          label={props.i18n('sheet.character-sheet.patron-advantage')}
          fullWidth
          style={styles.textarea}
          color="brown"
          focused
          variant="standard"
          value={props.character.patron_advantage}
          onChange={handleChangePatronAdvantage}
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
              fontFamily: 'NewBaskerville',
            },
          }}
        />
      </Grid>

      <Grid item xs={12} sm={12} sx={styles.item}>
        <Attributes
          {...props}
          combatProficiencies={combatProficiencies}
        />
      </Grid>

    </Grid>
  );
}
