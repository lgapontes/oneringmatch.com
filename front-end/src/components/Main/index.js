import React from "react";
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Navigate, Routes, Route } from "react-router-dom";

import { DRAWER_WIDTH } from '../../menus/Header';
import NotFound from '../../utils/NotFound';
import Error from '../../utils/Error';
import Unauthorized from '../../utils/Unauthorized';
import Logger from '../../components/Logger';

import WaitingLogin from '../../utils/WaitingLogin';
import ChangeUser from '../../components/ChangeUser';
import CharacterSheet from '../../sheet/CharacterSheet';

const left = (DRAWER_WIDTH / 8) + 2;

export default function Main(props) {

  const main = (
    <>
      <Routes>
        <Route path='/error' element={<Error />} />
        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route path='/logger' element={
          <Logger
            setLoading={props.setLoading}
          />
        } />

        <Route
          exact
          path="/login"
          element={
            <WaitingLogin
              user={props.user}
              setLoading={props.setLoading}
            />
          }
        />

        <Route
          exact
          path="/user"
          element={
            <ChangeUser
              user={props.user}
              onUserChanged={props.onUserChanged}
              setLoading={props.setLoading}
              loading={props.loading}
              handleMessage={props.handleMessage}
              tamanho_arquivo_picture={props.tamanho_arquivo_picture}
            />
          }
        />

        <Route exact path="/" element={
          <CharacterSheet
            i18n={props.i18n}
            i18nReady={props.i18nReady}
            character={props.character}
            changeHeroicCulture={props.changeHeroicCulture}
            changeStandardsOfLiving={props.changeStandardsOfLiving}
            changeCharacter={props.changeCharacter}
            editingCharacterSheet={props.editingCharacterSheet}
          />
        } />

        <Route path="notfound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notfound" replace />} />
      </Routes>
    </>
  );

  return (
    <>
      {/* PC */}
      <Box
        sx={{
          ml: left,
          mt: 2,
          mr: 2,
          mb: 2,
          display: { xs: 'none', sm: 'block' },
        }}
      >
        <Toolbar />
        {main}
      </Box>

      {/* Mobile */}
      <Box
        sx={{
          m: 1, mt: 3,
          display: { xs: 'block', sm: 'none' },
        }}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={3}>
            <Toolbar />
            {main}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
