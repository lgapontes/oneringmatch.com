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

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { EN_US } from './locales/enUS';
import { PT_BR } from './locales/ptBR';
import { ES_ES } from './locales/esES';
import { FR_FR } from './locales/frFR';
import { DE_DE } from './locales/deDE';

import Aniron from './fonts/aniron.ttf';
import NewBaskerville from './fonts/newbaskerville.woff';

import { rollDice, isValidIndex, clone, mergeDictionaries } from './sheet/Rules';
import { NEW_CHARACTER, HEROIC_CULTURES, STANDARDS_OF_LIVING } from './sheet/Data';

const LANGUAGES = {
  'English': {translation: EN_US},
  'Português': {translation: PT_BR},
  'Español': {translation: ES_ES},
  'Français': {translation: FR_FR},
  'Deutsch': {translation: DE_DE},
};

i18n
  .use(initReactI18next)
  .init({
    resources: LANGUAGES,
    lng: "English",
    fallbackLng: "English",
    interpolation: {
      escapeValue: false
    }
  });

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const FRONTEND_VERSION = process.env.REACT_APP_FRONTEND_VERSION;

function App() {
  const navigate = useNavigate();
  const { t, i18n, ready } = useTranslation();
  const [character,setCharacter] = useState(NEW_CHARACTER);
  const [editingCharacterSheet,setEditingCharacterSheet] = useState(true);

  const changeCharacter = (changedCharacter) => {
    setCharacter(character => ({
      ...character,
      ...changedCharacter
    }));
  };

  const changeStandardsOfLiving = (standards_of_living_index) => {
    if (isValidIndex(standards_of_living_index)) {
      let localStandardsOfLiving = clone(STANDARDS_OF_LIVING[standards_of_living_index]);
      let standards_of_living = t(`sheet.character-sheet.standards-of-living.${standards_of_living_index}`);
      let starting_treasure_rating = localStandardsOfLiving.starting_treasure_rating;

      let changedCharacter = {
        standard_of_living: standards_of_living,
        standard_of_living_index: standards_of_living_index,
        starting_treasure_rating: starting_treasure_rating,
      };
      return changedCharacter;
    } else {
      return {};
    }
  };

  const changeHeroicCulture = (indexHeroicCulture) => {
    if (isValidIndex(indexHeroicCulture)) {
      /* Heroic Culture*/
      let localHeroicCulture = t('sheet.character-sheet.heroic-cultures', { returnObjects: true })[indexHeroicCulture];

      /* Cultural Blessing */
      let culturalBlessingName = t(`heroic-cultures.${indexHeroicCulture}.cultural-blessing-name`).toUpperCase();
      let culturalBlessingRules = t(`heroic-cultures.${indexHeroicCulture}.cultural-blessing-rules`);

      /* Standards of living */
      let standards_of_living_index = HEROIC_CULTURES[indexHeroicCulture].standard_of_living;
      let standardOfLiving = changeStandardsOfLiving(standards_of_living_index);

      /* Range ages */
      let localRangeAges = clone(HEROIC_CULTURES[indexHeroicCulture].range_ages);

      let changedCharacter = mergeDictionaries(standardOfLiving,{
        heroic_culture: localHeroicCulture,
        heroic_culture_index: indexHeroicCulture,
        cultural_blessing_name: culturalBlessingName,
        cultural_blessing: culturalBlessingRules,
        treasure: standardOfLiving.starting_treasure_rating,
        range_ages: localRangeAges,
      });

      return changedCharacter;
    } else {
      return {};
    }
  };

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    let heroicCulture = changeHeroicCulture(character.heroic_culture_index);
    let changedCharacter = mergeDictionaries(heroicCulture,{language: lang});
    changeCharacter(changedCharacter);
  };

  const { pathname } = useLocation();
  const isLoginPathActive = !!matchPath("/login/*", pathname);
  const isLoggerPathActive = !!matchPath("/logger", pathname);

  const [basicData,setBasicData] = useState({
    version: '0.0-0.0 DEV',
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
    rollDice(
      false, // adversary
      false, // miserable
      false, // weary
      10, // piercingBlowLimit
      false, // shadowEqualsMaxHope
      false, // favoured
      false, // illFavored
      2, // numberOfSuccessDice
      12, // target
      (result)=>{
        console.log(result);
      }
    );

    setLoadingList(true);
    setLoadingLogin(true);

    get('api/lists',(json,message,severity)=>{
      basicData.version = `OneRing Match, v${FRONTEND_VERSION}-${json.version.version}`;
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
          main: '#CE8786',
        },
        brown: {
          main: '#877e76', //'#422300',
        },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: `
            @font-face {
              font-family: 'Aniron';
              font-style: normal;
              font-display: swap;
              font-weight: 400;
              src: local('Aniron'), local('Aniron-Regular'), url(${Aniron}) format('truetype');
            }

            @font-face {
              font-family: 'NewBaskerville';
              font-style: normal;
              font-display: swap;
              font-weight: 400;
              src: local('NewBaskerville'), local('NewBaskerville-Regular'), url(${NewBaskerville}) format('woff');
            }
          `,
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
        i18n={t}
        languages={Object.keys(LANGUAGES)}
        handleChangeLanguage={handleChangeLanguage}
        language={i18n.language}

        name={user.nome_ajustado}
        picture={user.picture}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        loadingList={loadingList}
        loadingLogin={loadingLogin}
        logged={logged}
        administrator={administrator}
      >
      </Header>
      <Main
        i18n={t}
        i18nReady={ready}
        character={character}
        changeHeroicCulture={changeHeroicCulture}
        changeStandardsOfLiving={changeStandardsOfLiving}
        changeCharacter={changeCharacter}
        editingCharacterSheet={editingCharacterSheet}

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
