import React from "react";

export default function CheckboxDiamondUnchecked(props) {
  let size = props.mobile ? '23px' : '20px';
  let style = {
    width: size,
    height: size
  };

  return (
    <img
      src="img/sheet/sheet-checkbox-diamond-unchecked.png"
      alt="Checkbox diamond unchecked"
      style={style}
    />
  );
}
