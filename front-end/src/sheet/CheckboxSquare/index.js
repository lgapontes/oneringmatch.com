import React, { useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import { cloneArray } from '../Rules';
import CheckboxSquareChecked from '../../images/CheckboxSquareChecked';
import CheckboxSquareUnchecked from '../../images/CheckboxSquareUnchecked';

export default function CheckboxSquare(props) {

  const getFavouredIndex = () => {
    return props.character.favoured_skills.indexOf(props.skill);
  };

  const checked = (getFavouredIndex() > -1);

  const handleClick = (event) => {
    if (props.editingCharacterSheet) {
      let index = getFavouredIndex();
      let array = cloneArray(props.character.favoured_skills);
      if (checked) {
        array.splice(index, 1);
      } else {
        array.push(props.skill);
      }
      props.character.favoured_skills = array;
      props.changeCharacter(props.character);
    }
  };

  return (
    <Checkbox
      sx={{
        padding: 0,
        margin: 0,
      }}
      checked={checked}
      color="secondary"
      icon={<CheckboxSquareUnchecked />}
      checkedIcon={<CheckboxSquareChecked />}
      onChange={handleClick}      
    />
  );
}
