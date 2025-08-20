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

import { get, put, del } from '../../utils/Api';

export default function CharacterSheet(props) {

  useEffect(()=>{
    // props.setLoading(true);
  },[]);

  const styles = {
    characterSheet: {
      backgroundImage: `url(${"img/back_v2.jpg"})`,
      backgroundSize: 'cover',

      boxSizing: 'border-box',
      margin: '0 auto',
      width: '98%',

      border: '2px solid #db2330',
      borderRadius: '3px',
      padding: '10px',
      boxShadow: '3px 3px 5px #999',
    },

    input: {
      margin: '0',
    }
  };

  /*
  return (
    <Grid container spacing={2} style={styles.characterSheet}>
      <Grid item xs={12} sm={6}>
        <TextField label="First Name" fullWidth style={styles.input}/>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label="Last Name" fullWidth />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Email" fullWidth />
      </Grid>
    </Grid>
  );
  */

  return (
    <>  
    </>
  );
}
