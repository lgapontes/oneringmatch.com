import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme, useMediaQuery } from '@mui/material';

export default function WaitingLogin(props) {

  const theme = useTheme();
  let width = useMediaQuery(theme.breakpoints.up("sm")) ? '80%' : '100%';

  useEffect(()=>{
    props.setLoading(true);

    if (props.user.login) {
      props.setLoading(false);
    }
  },[props]);

  return (
    <Box
      component="form"
      sx={{
        p: 1,
        width: {width},
        maxWidth: '700px'
      }}
      noValidate
      autoComplete="off"
    >
      <Typography sx={{ ml: 0.5 , fontWeight: 'bold', color: '#7b4296' }} variant="h6">
        Realizando Login integrado!
      </Typography>

      <Typography  sx={{ ml: 0.5 , mb: 2 }} variant="caption" display="block" gutterBottom>
        Sua autenticação está sendo realizada e você será redirecionado em breve. A qualquer momento você pode alterar seus dados no menu com a imagem de seu perfil através da opção <b>Minha Conta</b>.
      </Typography>
    </Box>
  )
}
