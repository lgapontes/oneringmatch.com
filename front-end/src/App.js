import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, matchPath } from "react-router";
import Backdrop from '@mui/material/Backdrop';
import Skeleton from '@mui/material/Skeleton';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import './App.css';
import Header from './menus/Header';
import Main from './components/Main';

import Snackbar, { SEVERITY } from './utils/Snackbar';

import { get } from './utils/Api';

import { useTheme } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const FRONTEND_VERSION = process.env.REACT_APP_FRONTEND_VERSION;

function App() {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const isLoginPathActive = !!matchPath("/login/*", pathname);
  const isLoggerPathActive = !!matchPath("/logger", pathname);

  const [basicData,setBasicData] = useState({
    version: '0.0-0.0 DEV',
    categorias: [],
    modalidades: [],
    tamanho_arquivo_picture: 2,
  });

  const DEFAULT_USER = {
    login: null,
    email: null,
    nome_completo: '',
    nome_social: '',
    nome_ajustado: '',
    status: null,
    perfil: '',
    picture: 'img/user.jpg',
    url_original_existe: true,
    arquivo_carregado: false,
    data_cadastro: null,
    ultima_alteracao: null,
    atualizado_pelo_usuario: false,
    vezes_acessado: 0,
    total_curtidas: 0,
    total_seguidores: 0,
    logado: false,
    data_login: null,
    segundos_login: -1,
    data_refresh: null,
    segundos_refresh: -1,
    esta_logado: false,
  };

  const [user,setUser] = useState(DEFAULT_USER);

  const logged =
    (user != undefined) &&
    (user != null) &&
    (user.nome_ajustado !== undefined) &&
    (user.nome_ajustado !== null) &&
    (user.nome_ajustado !== '');

  const administrator = logged && (user.perfil == 'Administrador');

  const [snackbar,setSnackbar] = useState({
    open: false,
    message: '',
    severity: SEVERITY.INFO.toString(),
  });

  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const handleMessage = (message,severity,error) => {
    snackbar.open = true;
    snackbar.message = message;
    snackbar.severity = severity.toString();
    setSnackbar({...snackbar});

    if (error) console.error(error);
  };

  const handleCloseMessage = (event, reason) => {
    snackbar.open = false;
    setSnackbar({...snackbar});
  };

  const handleLogin = (e) => {
    e.preventDefault();
    get('api/auth',(json,message,severity)=>{
      window.location.assign(json.auth_url);
    },(error,message,severity)=>{
      handleMessage(message,severity,error);
    });
  };

  const handleLogout = ()=>{
    get('api/logout',(json,message,severity)=>{
      handleMessage(message,severity);
      localStorage.removeItem('JWT');
      setUser(DEFAULT_USER);
      return navigate("/");
    },(error,message,severity)=>{
      handleMessage(message,severity,error);
    });
  }

  const closeLoading = ()=>{
    setLoading(false);
    setLoadingList(false);
    setLoadingLogin(false);
  }

  useEffect(()=>{
    setLoadingList(true);
    setLoadingLogin(true);

    get('api/lists',(json,message,severity)=>{
      basicData.version = `Lootbook, v${FRONTEND_VERSION}-${json.version.version}`;
      basicData.categorias = json.categorias;
      basicData.modalidades = json.modalidades;
      basicData.tamanho_arquivo_picture = json.tamanho_arquivo_picture;

      /* Versão do sistema */
      console.log(basicData.version);

      setBasicData({...basicData});

      /* LOGIN */
      if (isLoginPathActive) {
        // Está realizando login
        setLoading(true);

        // Verifica se existe na URL
        const query = new URLSearchParams(window.location.search);
        const token=query.get('jwt');

        // Se existir na URL
        if (token) {
          localStorage.setItem('JWT',token);
          get('api/session',(json,message,severity)=>{
            handleMessage('Login realizado com sucesso!',severity);

            setUser(user => ({
              ...user,
              ...json
            }));

            closeLoading();

            return navigate("/");
          },(error,message,severity)=>{
            closeLoading();
            handleMessage(message,severity,error);
          });
        } else {
          closeLoading();
        }
      } else {
        // Não está realizando login
        if (localStorage.getItem('JWT') !== null) {
          get('api/session',(json,message,severity)=>{
            handleMessage('Login realizado com sucesso!',severity);

            setUser(user => ({
              ...user,
              ...json
            }));

            closeLoading();
          },(error,message,severity)=>{
            closeLoading();
            handleMessage(message,severity,error);
          });
        } else {
          closeLoading();
        }
      }
      /* LOGIN */

    },(error,message,severity)=>{
      closeLoading();
      handleMessage(message,severity,error);
    });

  },[]);

  const breakpointOverrides = {
    xs: 0,
    sm: 900,
    md: 900,
    lg: 1200,
    xl: 1536,
  };

  const getCustomTheme = (theme) =>
    createTheme({
      ...theme,
      breakpoints: { values: { ...breakpointOverrides } },
      palette: {
        secondary: {
          main: '#7b4296',
        },
      },
    });

  const theme = useTheme();

  return (
    <ThemeProvider theme={getCustomTheme(theme)}>

      <Snackbar
        message={snackbar.message}
        severity={snackbar.severity}
        opened={snackbar.open}
        handleClose={handleCloseMessage}
      />

      <Header
        name={user.nome_ajustado}
        picture={user.picture}
        categorias={basicData.categorias}
        modalidades={basicData.modalidades}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        loadingList={loadingList}
        loadingLogin={loadingLogin}
        logged={logged}
        administrator={administrator}
      >
      </Header>
      <Main
        user={user}
        onUserChanged={setUser}
        setLoading={setLoading}
        loading={loading}
        handleMessage={handleMessage}
        tamanho_arquivo_picture={basicData.tamanho_arquivo_picture}
      />
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <Box
          component="img"
          sx={{ maxWidth: 200 }}
          src="img/loading.gif"
        />
      </Backdrop>

    </ThemeProvider>
  );
}

export default App;


/*

<Box className="primary-color" sx={{
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  borderRadius: 0,
  height: 40,
  textAlign: 'center',
  zIndex: (theme) => theme.zIndex.drawer + 1,
}} elevation={3}>
  <Typography color="#ffffff" sx={{ mt: 1 }}>Flecha Mágica</Typography>
  <Typography color="#ffffff" sx={{ fontSize: 10, mt: 1 }}>{basicData.version}</Typography>
</Box>

*/
