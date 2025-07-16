import React, { useState } from "react";

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import Checkbox from '@mui/material/Checkbox';
import Skeleton from '@mui/material/Skeleton';

import CasinoIcon from '@mui/icons-material/Casino';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ImageIcon from '@mui/icons-material/Image';
import LandscapeIcon from '@mui/icons-material/Landscape';
import MapIcon from '@mui/icons-material/Map';
import FortIcon from '@mui/icons-material/Fort';
import Grid4x4Icon from '@mui/icons-material/Grid4x4';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import HowToVoteIcon from '@mui/icons-material/HowToVote';

import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';

const obterIconePorCategoria = (categoria) => {
  switch(categoria) {
    case 'RPG': return <CasinoIcon />; break;
    case 'Aventuras': return <LandscapeIcon />; break;
    case 'Cenários': return <FortIcon />; break;
    case 'Livro Jogo': return <LocalLibraryIcon />; break;
    case 'Boardgame': return <ViewQuiltIcon />; break;
    case 'Cardgame': return <HowToVoteIcon />; break;
    case 'Grids': return <Grid4x4Icon />; break;
    case 'Mapas': return <MapIcon />; break;
    case 'Artes': return <ImageIcon />; break;
    case 'Literatura': return <AutoStoriesIcon />; break;
    default: return <CasinoIcon />; break;
  }
};

const obterIconePorModalidade = (modalidade) => {
  switch(modalidade) {
    case 'Gratuito': return <MoneyOffIcon />; break;
    case 'Quanto quiser': return <PriceCheckIcon />; break;
    case 'Com valor': return <AttachMoneyIcon />; break;
    default: return <MoneyOffIcon />; break;
  }
};

export default function Filters(props) {

  const [modalidadesChecked, setModalidadesChecked] = React.useState([]);

  const handleToggleModalidades = (value) => () => {
    const currentIndex = modalidadesChecked.indexOf(value);
    const newChecked = [...modalidadesChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    console.log(newChecked);
    setModalidadesChecked(newChecked);
  };

  const [categoriasChecked, setCategoriasChecked] = React.useState([]);

  const handleToggleCategorias = (value) => () => {
    const currentIndex = categoriasChecked.indexOf(value);
    const newChecked = [...categoriasChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    console.log(newChecked);
    setCategoriasChecked(newChecked);
  };

  return (
    <div>
      <Box
        sx={{
          display: { xs: 'block', sm: 'none' },
          my: 2,
          textAlign: 'center',
        }}
      >
        <Box
          component="img"
          sx={{ maxWidth: 150 }}
          alt="Lootbook"
          src="img/logo-menu.png"
        />
      </Box>
      <Divider sx={{ display: { xs: 'block', sm: 'none' } }}/>
      {
        props.loadingList ? (
          <List>
            {[...Array(10).keys()].map((entry, index) => (
              <ListItem key={entry} disablePadding>
                <ListItemText sx={{ pl: 1, pr: 1, m: 0 }}>
                  <Skeleton height="50px" />
                </ListItemText>
              </ListItem>
            ))}
          </List>
        ) : (
          <>
            <List
              subheader={
                <ListSubheader
                  component="div"
                  id="nested-list-subheader"
                  sx={{ pt: 1, pb: 0, m: 0, lineHeight: 2 }}
                >
                  Modalidades
                </ListSubheader>
              }
            >

              {props.modalidades.map((entry, index) => (
                <ListItem
                  key={entry.nome}
                  disablePadding
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={(e) => {
                        e.stopPropagation();
                        handleToggleModalidades(entry.nome);
                      }}
                      checked={modalidadesChecked.indexOf(entry.nome) !== -1}
                      inputProps={{ 'aria-labelledby': entry.nome }}
                    />
                  }
                  onClick={handleToggleModalidades(entry.nome)}
                >
                  <ListItemButton
                    sx={{ pt: 0.6, pb: 0.6, m: 0 }}
                  >
                    <ListItemIcon sx={{ minWidth: '40px', }}>
                      {obterIconePorModalidade(entry.nome)}
                    </ListItemIcon>
                    <ListItemText primary={entry.nome} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            <List
              subheader={
                <ListSubheader
                  component="div"
                  id="nested-list-subheader"
                  sx={{ pt: 0, pb: 0, m: 0, lineHeight: 2 }}
                >
                  Categorias
                </ListSubheader>
              }
            >
              {props.categorias.map((entry, index) => (
                <ListItem
                  key={entry.nome}
                  disablePadding
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={(e) => {
                        e.stopPropagation();
                        handleToggleCategorias(entry.nome);
                      }}
                      checked={categoriasChecked.indexOf(entry.nome) !== -1}
                      inputProps={{ 'aria-labelledby': entry.nome }}
                    />
                  }
                  onClick={handleToggleCategorias(entry.nome)}
                >
                  <ListItemButton
                    sx={{ pt: 0.6, pb: 0.6, m: 0 }}
                  >
                    <ListItemIcon sx={{ minWidth: '40px', }}>
                      {obterIconePorCategoria(entry.nome)}
                    </ListItemIcon>
                    <ListItemText primary={entry.nome} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </>
        )
      }
    </div>
  );  
}
