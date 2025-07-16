import React, { useEffect, useState, useRef } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';

import { useTheme, useMediaQuery } from '@mui/material';
import { get, post } from '../../utils/Api';
import FileUpload from '../../components/FileUpload';

import InputAdornment from '@mui/material/InputAdornment';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import SaveIcon from '@mui/icons-material/Save';

export default function ChangeUser(props) {

  const theme = useTheme();
  let width = useMediaQuery(theme.breakpoints.up("sm")) ? '80%' : '100%';

  const CHECK_LOGIN_OK = 'ok';
  const CHECK_LOGIN_NOTOK = 'notok';
  const CHECK_LOGIN_LOADING = 'loading';
  const DEFAULT_MESSAGE = 'Esta é a sua identificação no Lootbook!';

  const schedule = useRef(0);
  const [checkLogin,setCheckLogin] = useState(CHECK_LOGIN_OK);
  const [messageCheckLogin,setMessageCheckLogin] = useState('');
  const [checkNomeSocial,setCheckNomeSocial] = useState(false);
  const [checkNomeCompleto,setCheckNomeCompleto] = useState(false);

  useEffect(()=>{
    props.setLoading(true);

    if (props.user.login) {
      props.setLoading(false);
    }
  },[]);

  const handleLoading = (currentNumber,typeLoading,message) => {
    if (currentNumber === schedule.current) {
      setCheckLogin(typeLoading);
      setMessageCheckLogin(message);
    }
  };

  const handleChangeLogin = (event) => {
    event.preventDefault();
    setCheckLogin(CHECK_LOGIN_LOADING);
    let currentNumber = schedule.current + 1;
    schedule.current = currentNumber;

    let temp = event.target.value;

    if ( (temp) && (temp.length > 3) ) {

      if (/^[a-z0-9_]+$/.test(temp)) {

        if (/^[a-z_]\w*$/.test(temp)) {

          let url = `api/validar-nome-usuario?login=${temp}&email=${props.user.email}`;

          get(url,(json,message,severity)=>{

            if (json) {
              if (json.valido) {

                // Login válido
                //setCheckLogin(CHECK_LOGIN_OK);
                handleLoading(currentNumber,CHECK_LOGIN_OK,DEFAULT_MESSAGE);

              } else {
                //setMessageCheckLogin(message);
                //setCheckLogin(CHECK_LOGIN_NOTOK);
                handleLoading(currentNumber,CHECK_LOGIN_NOTOK,message);
              }
            } else {
              //setMessageCheckLogin('Ocorreu um erro ao validar o nome do usuário!');
              //setCheckLogin(CHECK_LOGIN_NOTOK);
              handleLoading(currentNumber,CHECK_LOGIN_NOTOK,'Ocorreu um erro ao validar o nome do usuário!');
            }

          },(error,message,severity)=>{
            //setMessageCheckLogin(error.message);
            //setCheckLogin(CHECK_LOGIN_NOTOK);
            handleLoading(currentNumber,CHECK_LOGIN_NOTOK,error.message);
          });

        } else {
          //setMessageCheckLogin('Não pode iniciar com números!');
          //setCheckLogin(CHECK_LOGIN_NOTOK);
          handleLoading(currentNumber,CHECK_LOGIN_NOTOK,'Não pode iniciar com números!');
        }

      } else {
        //setMessageCheckLogin();
        //setCheckLogin(CHECK_LOGIN_NOTOK);
        handleLoading(currentNumber,CHECK_LOGIN_NOTOK,'São permitidas letras minúsculas, números ou \'_\'!');
      }

    } else {
      //setMessageCheckLogin('O nome de usuário deve ter mais de 3 caracteres!');
      //setCheckLogin(CHECK_LOGIN_NOTOK);
      handleLoading(currentNumber,CHECK_LOGIN_NOTOK,'O nome de usuário deve ter mais de 3 caracteres!');
    }

    // Atualizar modelo
    props.user.login = event.target.value;
    props.onUserChanged({...props.user});
  };

  const handleUpload = (picture,error) => {
    if (!error) {
      // Atualizar modelo
      props.user.picture = picture;
      props.onUserChanged({...props.user});
    }
  };

  const handleSave = (event) => {
    event.preventDefault();
    props.setLoading(true);
    setCheckNomeSocial(false);
    setCheckNomeCompleto(false);

    let dados = {
      login: props.user.login,
      email: props.user.email,
      nome_social: props.user.nome_social,
      nome_completo: props.user.nome_completo,
    };

    post('api/salvar-usuario',dados,(json,message,severity)=>{

      props.setLoading(false);
      props.user.atualizado_pelo_usuario = true;
      props.onUserChanged({...props.user});
      props.handleMessage(message,severity);

    },(error,message,severity)=>{
      props.setLoading(false);

      if ( (error['exception']) && (error['exception']['campo']) ) {
        if (error['exception']['campo'] === 'login') {
          setCheckLogin(CHECK_LOGIN_NOTOK);
        }
        if (error['exception']['campo'] === 'nome_social') {
          setCheckNomeSocial(true);
        }
        if (error['exception']['campo'] === 'nome_completo') {
          setCheckNomeCompleto(true);
        }
      }

      props.handleMessage(error.message,severity,error);
    });

  };

  const check = (
    <>
      {
        (checkLogin === CHECK_LOGIN_OK) ?
          <CheckCircleIcon
            color="secondary"
            style={{ fontSize: 50 }}
            sx={{ mt: 0.4 }}
          />
        : (
          (checkLogin === CHECK_LOGIN_NOTOK) ?
            <ErrorIcon
              style={{ fontSize: 50, color: '#d32f2f' }}
              sx={{ mt: 0.4 }}
            />
            :
            <CircularProgress
              color="secondary"
              sx={{ mt: 1 }}
            />
        )
      }
    </>
  );

  return (
    <>
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
          {(props.user.atualizado_pelo_usuario) ? 'Atualizar dados' : 'Login realizado!'}
        </Typography>

        <Typography  sx={{ ml: 0.5 , mb: 2 }} variant="caption" display="block" gutterBottom>
          {
            (props.user.atualizado_pelo_usuario) ?
            <>Caso queira alterar alguns de seus dados, preencha os campos abaixo e clique em <b>Salvar dados</b>. Não é possível alterar o e-mail vinculado à sua conta Google.</>
            :
            <>Sua autenticação foi realizada com sucesso! Caso queira alterar alguns de seus dados, preencha os campos abaixo e clique em <b>Salvar dados</b>. Não é possível alterar o e-mail vinculado à sua conta Google.</>
          }
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<SaveIcon />}
          sx={{ float: 'right', mb: 2 }}
          onClick={handleSave}
        >
          Salvar dados
        </Button>

        <TextField
          disabled
          fullWidth
          id="email"
          label="e-mail"
          value={props.user.email ? props.user.email : 'E-Mail Google'}
          InputProps={{
            style: { width: '100%', marginBottom: '20px' },
          }}
        />

        <Grid container spacing={2} sx={{marginBottom: '20px'}}>
          <Grid item xs={10}>
            <TextField
              fullWidth
              focused
              color="secondary"
              id="nome_de_usuario"
              label="Nome de Usuário"
              value={props.user.login ? props.user.login : ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailIcon />
                  </InputAdornment>
                ),
              }}
              onChange={handleChangeLogin}

              error={(checkLogin === CHECK_LOGIN_NOTOK)}
              helperText={(checkLogin === CHECK_LOGIN_NOTOK) ? messageCheckLogin : DEFAULT_MESSAGE}
            />
          </Grid>
          <Grid item xs={2}>
            {check}
          </Grid>
        </Grid>

        <TextField
          fullWidth
          color="secondary"
          id="nome_social"
          label="Como você gostaria de ser chamado(a)?"
          value={props.user.nome_social ? props.user.nome_social : ''}
          InputProps={{
            style: { width: '100%', marginBottom: '20px' },
          }}
          onChange={(event) => {
            props.user.nome_social = event.target.value;
            props.onUserChanged({...props.user});
          }}
          error={checkNomeSocial}
        />

        <TextField
          fullWidth
          color="secondary"
          id="nome_completo"
          label="Nome completo"
          value={props.user.nome_completo ? props.user.nome_completo : ''}
          InputProps={{
            style: { width: '100%', marginBottom: '20px' },
          }}
          onChange={(event) => {
            props.user.nome_completo = event.target.value;
            props.onUserChanged({...props.user});
          }}
          error={checkNomeCompleto}
        />

        <Typography>Altere a sua imagem de perfil</Typography>
        <Typography  sx={{ mb: 1 }} variant="caption" display="block" gutterBottom>
          Sugerimos imagens quadradas em formato JPG. O tamanho máximo permitido para as imagens de perfil é de 2MB. Os formatos de arquivo permitidos são JPG e PNG.
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{marginBottom: '20px'}}
        >
          <Grid item xs={6} align="center">
            <FileUpload
              maxSize={props.tamanho_arquivo_picture}
              handleMessage={props.handleMessage}
              setLoading={props.setLoading}
              handleUpload={handleUpload}
            />
          </Grid>
          <Grid item xs={6} align="center">
            <Box sx={{ bgcolor: '#7b4296', p: 1, pt: 2, pb: 2, borderRadius: 2 }}>
            {
              (props.loading) ?
              <Skeleton
                variant="circular"
                width={150} height={150}
              />
              :
              <Avatar
                src={props.user.picture}
                sx={{
                  height: '150px',
                  width: '150px',
                }}
              />
            }
            </Box>
          </Grid>
        </Grid>

      </Box>
    </>
  )
}
