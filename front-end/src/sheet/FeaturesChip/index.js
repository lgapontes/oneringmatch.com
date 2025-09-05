import React from "react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export default function FeaturesChip(props) {

  const styles = {
    FormControl: {
      margin: '0 0 4px 0',
      paddingTop: '10px',
      backgroundColor: 'rgba(66, 35, 0, .05)',
      borderBottom: '2px solid #877e76',
      minHeight: '64px',
    },

    InputLabel: {
      marginTop: '12px',
      marginLeft: '-10px',
    },

    Stack: {
      padding: '12px 8px 2px',
      minHeight: '32px',
    },

    StackBreakline: {
      padding: '12px 8px 0',
      minHeight: '32px',
    },

    Chips: {
      '& .MuiChip-label': {
        fontFamily: 'NewBaskerville',
        fontSize: '1.1em',
      },
      marginLeft: 1,
      marginBottom: '6px',
    },

    ChipsBreakline: {
      '& .MuiChip-label': {
        fontFamily: 'NewBaskerville',
        fontSize: '1.1em',
      },
      height: 'auto',
      '& .MuiChip-label': {
        display: 'block',
        whiteSpace: 'normal',
      },
      marginBottom: 1,
    },
  };

  return (
    <FormControl
      fullWidth
      color="secondary"
      focused
      style={styles.FormControl}
    >

      <InputLabel
        id="sheet.character-sheet.heroic-culture.label"
        color="brown"
        style={styles.InputLabel}
      >
        {props.label}
      </InputLabel>

      <Stack
        direction="row"
        flexWrap="wrap"
        spacing={0}
        sx={(props.breakline) ? styles.StackBreakline : styles.Stack}
      >
        {
          props.values.map((entry,index)=>(
            props.canDeleteIt ? (
              <Chip
                label={entry}
                key={`${entry}-${index}`}
                color="secondary"
                variant="outlined"
                sx={(props.breakline) ? styles.ChipsBreakline : styles.Chips}
                onDelete={()=>props.handleDelete(entry)}
              />
            ) : (
              <Chip
                label={entry}
                key={`${entry}-${index}`}
                color="secondary"
                variant="outlined"
                sx={(props.breakline) ? styles.ChipsBreakline : styles.Chips}
              />
            )
          ))
        }
      </Stack>

    </FormControl>
  );
}
