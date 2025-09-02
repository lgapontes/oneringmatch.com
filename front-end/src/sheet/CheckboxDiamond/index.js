import React, { useState } from "react";
import Checkbox from '@mui/material/Checkbox';

import CheckboxDiamondChecked from '../../images/CheckboxDiamondChecked';
import CheckboxDiamondUnchecked from '../../images/CheckboxDiamondUnchecked';

export default function CheckboxDiamond(props) {

  return (
    <Checkbox
      sx={{
        padding: 0,
        margin: 0,
      }}
      checked={props.checked}
      color="secondary"
      icon={<CheckboxDiamondUnchecked mobile={props.mobile} />}
      checkedIcon={<CheckboxDiamondChecked mobile={props.mobile} />}
      disabled
    />
  );
}
