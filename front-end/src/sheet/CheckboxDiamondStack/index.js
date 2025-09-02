import React, { useState, useEffect } from "react";
import CheckboxDiamond from '../CheckboxDiamond';
import Stack from '@mui/material/Stack';
import { isValid } from '../Rules';

const DEFAULT_LIST = [false,false,false,false,false,false];

export default function CheckboxDiamondStack(props) {

  const isSkill = isValid(props.skill);
  const isProficiencie = !isSkill;
  const isBrawling = (isProficiencie && (props.proficiencie === 'Brawling'));

  const handleClick = (event) => {
    if (props.editingCharacterSheet && (!isBrawling)) {
      if (isSkill) {
        let value = props.character.skills[props.skill] + 1;
        if (value > 6) value = 0;
        props.character.skills[props.skill] = value;
        props.changeCharacter(props.character);
      } else {
        props.changeCombatProficiencies(props.proficiencie);
      }
    }
  };

  return (
    <Stack
      direction="row"
      spacing={0}
      onClick={handleClick}
      sx={{
        display: 'inline-block',
      }}
    >
      {
        DEFAULT_LIST.map((checked,index)=>(
          <CheckboxDiamond
            key={`${isSkill ? props.skill : props.proficiencie}-checkbox-${index}`}
            checked={
              (isSkill) ?
              (index < props.character.skills[props.skill]) :
              (index < props.character.combat_proficiencies[props.proficiencie])
            }
            mobile={props.mobile}
          />
        ))
      }
    </Stack>
  );
}
