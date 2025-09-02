import React from "react";

export default function CheckboxDiamondChecked(props) {
  let size = props.mobile ? '23px' : '20px';
  let style = {
    width: size,
    height: size
  };

  return (
    <img
      src="img/sheet/sheet-checkbox-diamond-checked.png"
      alt="Checkbox diamond checked"
      style={style}
    />
  );
}
