import React from "react";
import CheckboxDiamondStack from '../CheckboxDiamondStack';
import CheckboxSquare from '../CheckboxSquare';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import IconFeatDie from '../../icons/IconFeatDie';
import { styled } from '@mui/material/styles';
import {
  SKILLS,
} from '../Data';
import { rollDice } from '../Rules';

const SkillButton = styled(IconButton)(({ theme }) => ({
  height: '26px',
  width: '26px',
}));

export default function SkillBox(props) {

  const skillIndex = SKILLS[props.skill];

  const handleRollDice = (event) => {
    let favoured = (props.character.favoured_skills.indexOf(props.skill) > -1);
    let illFavored = false;
    let shadowEqualsMaxHope = (
      (props.character.current_stats.shadow + props.character.current_stats.shadow_scars) >=
      props.character.attributes.hope
    );
    let numberOfSuccessDice = props.character.skills[props.skill];
    let target = props.character.attributes[`TN_${props.attribute}`];

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
        <SkillButton onClick={handleRollDice}>
          <IconFeatDie />
        </SkillButton>
      </Grid>

      <Grid item xs={1}>
        <CheckboxSquare
          {...props}
          skill={props.skill}
        />
      </Grid>

      <Grid item xs={4.5} sx={{
        borderBottom: '2px solid #CE8786',
      }}>
        <Typography style={styles.typography}>
          {props.i18n(`sheet.character-sheet.skills.${skillIndex}`)}
        </Typography>
      </Grid>

      <Grid item xs={5} sx={{ textAlign: 'center' }}>
        <CheckboxDiamondStack
          {...props}
          skill={props.skill}
        />
      </Grid>
    </Grid>
  );
}
