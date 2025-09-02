import React from "react";
import Box from '@mui/material/Box';
import SheetPictureFrame from '../../images/SheetPictureFrame';

export default function CharacterPicture(props) {

  return (
    <Box sx={{
      width: '100%',
      height: 'auto',
      backgroundSize: 'cover',
      backgroundImage: `url(${props.character.imagem_path})`,
      marginBottom: { xs: '8px', sm: '0' },
    }}>
      <SheetPictureFrame />
    </Box>
  );
}
