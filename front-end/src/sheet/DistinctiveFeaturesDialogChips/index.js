import React, { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import CustomDialog from '../../components/CustomDialog';
import FeaturesChip from '../FeaturesChip';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { cloneArray, mergeDictionaries } from '../Rules';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { SEVERITY } from '../../utils/Snackbar';

export default function DistinctiveFeaturesDialogChips(props) {

  const [characterDistinctiveFeaturesTranslated,setCharacterDistinctiveFeaturesTranslated] = useState([]);

  const [distinctiveFeaturesByHeroicCultureTranslated,setDistinctiveFeaturesByHeroicCultureTranslated] = useState([]);
  const [distinctiveFeatureByHeroicCultureSelected,setDistinctiveFeatureByHeroicCultureSelected] = useState('');

  const [distinctiveFeaturesByCallingTranslated,setDistinctiveFeaturesByCallingTranslated] = useState([]);
  const [distinctiveFeatureByCallingSelected,setDistinctiveFeatureByCallingSelected] = useState('');

  const [existsCalling,setExistsCalling] = useState(true);

  const handleDelete = (chip) => {
    let heroicCultureValues = props.heroicCultureDistinctiveFeatures.map(dict => dict.translated);
    if (heroicCultureValues.indexOf(chip) === -1) {
      props.handleMessage(
        props.i18n('sheet.messages.distinctive-features-by-calling'),
        SEVERITY.WARNING
      );
    } else {
      let characterValues = characterDistinctiveFeaturesTranslated.filter(value => value !== chip);
      setCharacterDistinctiveFeaturesTranslated(characterValues);
      setDistinctiveFeaturesByHeroicCultureTranslated(heroicCultureValues.filter(entry=>(characterValues.indexOf(entry) === -1)));
    }
  };

  const handleAdd = (chip) => {
    if (props.heroicCulture) {

    } else {

    }
  };

  const handleSave = (event) => {
    let list = props.characterDistinctiveFeatures.filter(dict => (characterDistinctiveFeaturesTranslated.indexOf(dict.translated) > -1)).map(dict => dict.value);
    props.handleSave(list);
  };

  useEffect(()=>{
    setCharacterDistinctiveFeaturesTranslated(props.characterDistinctiveFeatures.map(dict => dict.translated));
    setDistinctiveFeaturesByHeroicCultureTranslated(
      props.heroicCultureDistinctiveFeatures.map(dict => dict.translated).filter(entry=>(characterDistinctiveFeaturesTranslated.indexOf(entry) === -1))
    );
    setDistinctiveFeaturesByCallingTranslated(
      props.callingDistinctiveFeatures.map(dict => dict.translated).filter(entry=>(characterDistinctiveFeaturesTranslated.indexOf(entry) === -1))
    );
  },[
    props.characterDistinctiveFeatures,
    props.heroicCultureDistinctiveFeatures,
    props.callingDistinctiveFeatures,
  ]);

  const styles = {
    grid: {
      margin: '0 0 10px 0',
      padding: '0',
    },

    lastGrid: {
      margin: '0',
      padding: '0',
    },

    button: {
      marginLeft: '4px',
      marginTop: '-1px',
      height: '100%',
      width: '100%',
      color: '#ffffff',
    },
  };

  const ColorButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.getContrastText('#ffffff'),
    backgroundColor: '#CE8786',
    '&:hover': {
      backgroundColor: '#CE8786',
    },
    height: '100%',
    width: '95%',
    borderRadius: '4px',
    marginLeft: '5%',
    marginTop: '-1px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px',
  }));

  return (
    <CustomDialog
      {...props}
      title={props.title}
      confirmButtonLabel={props.i18n('sheet.button.save-changes')}
      confirmButtonIcon={<SaveIcon sx={{ marginTop: '-2px' }} />}
      handleConfirm={handleSave}

      cancelButtonLabel={props.i18n('sheet.button.cancel')}
      cancelButtonIcon={<ArrowBackIcon sx={{ marginTop: '-2px' }} />}
      handleCancel={()=>props.handleClose(false)}

      open={props.open}
      handleClose={props.handleClose}
    >
      <Grid container spacing={0} sx={styles.grid}>

        <Grid item xs={12} sm={12} sx={styles.grid}>
          <Typography gutterBottom>
            {
              existsCalling ?
              props.i18n('sheet.character-sheet.all-distinctive-features-description') :
              props.i18n('sheet.character-sheet.distinctive-features-by-heroic-culture-description')
            }
          </Typography>
        </Grid>

        <Grid item xs={10} sm={10} sx={styles.grid}>
          <FormControl
            fullWidth
            color="secondary"
            focused
          >
            <InputLabel
              id={`sheet.character-sheet.heroic-culture.label`}
              color="secondary"
            >
              {props.i18n('sheet.character-sheet.distinctive-features-by-heroic-culture')}
            </InputLabel>
            <Select
              labelId={`sheet.character-sheet.heroic-culture.label`}
              id={`sheet.character-sheet.heroic-culture.select`}
              label={props.i18n('sheet.character-sheet.distinctive-features-by-heroic-culture')}
              style={props.styles.input}
              color="secondary"
              value={distinctiveFeatureByHeroicCultureSelected}
              onChange={(event)=>{setDistinctiveFeatureByHeroicCultureSelected(event.target.value)}}
            >
              {
                distinctiveFeaturesByHeroicCultureTranslated.map((entry,index)=>(
                  <MenuItem key={`${entry}-${index}`} value={index}>{entry}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={2} sm={2} sx={styles.grid}>
          <ColorButton
            variant="contained"
            sx={styles.buttonMobile}
          >
            <AddCircleIcon sx={{ width: '32px', height: '32px', color: '#ffffff' }} />
          </ColorButton>
        </Grid>

        <Grid item xs={10} sm={10} sx={styles.grid}>
          <FormControl
            fullWidth
            color="secondary"
            focused
          >
            <InputLabel
              id={`sheet.character-sheet.calling.label`}
              color="secondary"
            >
              {props.i18n('sheet.character-sheet.distinctive-features-by-calling')}
            </InputLabel>
            <Select
              labelId={`sheet.character-sheet.calling.label`}
              id={`sheet.character-sheet.calling.select`}
              label={props.i18n('sheet.character-sheet.distinctive-features-by-calling')}
              style={props.styles.input}
              color="secondary"
              value={distinctiveFeatureByCallingSelected}
              onChange={(event)=>{setDistinctiveFeatureByCallingSelected(event.target.value)}}
            >
              {
                distinctiveFeaturesByCallingTranslated.map((entry,index)=>(
                  <MenuItem key={`${entry}-${index}`} value={index}>{entry}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={2} sm={2} sx={styles.grid}>
          <ColorButton
            variant="contained"
            sx={styles.buttonMobile}
          >
            <AddCircleIcon sx={{ width: '32px', height: '32px', color: '#ffffff' }} />
          </ColorButton>
        </Grid>

        <Grid item xs={12} sm={12} sx={styles.lastGrid}>
          <FeaturesChip
            label={props.featuresChipLabel}
            values={characterDistinctiveFeaturesTranslated}
            breakline={false}
            canDeleteIt={true}
            handleDelete={handleDelete}
          />
        </Grid>

      </Grid>
    </CustomDialog>
  );
}
