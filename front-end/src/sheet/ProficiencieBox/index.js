import React from "react";
import CheckboxDiamondStack from '../CheckboxDiamondStack';
import CheckboxSquare from '../CheckboxSquare';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import IconFeatDie from '../../icons/IconFeatDie';
import { styled } from '@mui/material/styles';
import {
  COMBAT_PROFICIENCIES,
} from '../Data';
import { rollDice } from '../Rules';

const ProficienciesButton = styled(IconButton)(({ theme }) => ({
  height: '26px',
  width: '26px',
}));

export default function ProficiencieBox(props) {

  let indexProficiencie = Object.keys(COMBAT_PROFICIENCIES).indexOf(props.proficiencie);

  //COMBAT_PROFICIENCIES
  //props.proficiencie

  const handleRollDice = (event) => {
    let favoured = false;
    let illFavored = false;
    let shadowEqualsMaxHope = (
      (props.character.current_stats.shadow + props.character.current_stats.shadow_scars) >=
      props.character.attributes.hope
    );
    let numberOfSuccessDice = props.character.combat_proficiencies[props.proficiencie];
    let target = props.character.attributes.TN_strength;

    rollDice(
      false, // adversary
      props.character.current_stats.miserable, // miserable
      props.character.current_stats.weary, // weary
      10, // piercingBlowLimit
      shadowEqualsMaxHope, // shadowEqualsMaxHope
      favoured, // favoured
      illFavored, // illFavored
      numberOfSuccessDice, // numberOfSuccessDice
      target, // target
      (result)=>{
        console.log(result);
      }
    );
  };

  const styles = {
    typography: {
      color: 'rgba(0, 0, 0, 0.87)',
      fontFamily: 'NewBaskerville',
      fontWeight: 'bold',
      fontSize: '0.9em',
      lineHeight: '22px',
      marginTop: '1px',
    },
  };

  return (
    <Grid container sx={{
      marginBottom: '4px',
      minWidth: '288px',
    }}>
      <Grid item xs={1.2}>
        <ProficienciesButton onClick={handleRollDice}>
          <IconFeatDie />
        </ProficienciesButton>
      </Grid>

      <Grid item xs={5.5} sx={{
        borderBottom: '2px solid #CE8786',
      }}>
        <Typography style={styles.typography}>
          {props.i18n(`sheet.character-sheet.combat-proficiencies.${indexProficiencie}`)}
        </Typography>
      </Grid>

      <Grid item xs={5} sx={{ textAlign: 'center' }}>
        <CheckboxDiamondStack
          {...props}
          proficiencie={props.proficiencie}
        />
      </Grid>
    </Grid>
  );
}
