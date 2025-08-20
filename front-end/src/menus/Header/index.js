import React, { useState } from "react";
import { useNavigate } from "react-router";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import Checkbox from '@mui/material/Checkbox';
import Skeleton from '@mui/material/Skeleton';

import MenuIcon from '@mui/icons-material/Menu';
import GoogleIcon from '@mui/icons-material/Google';
import LoginIcon from '@mui/icons-material/Login';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LanguageIcon from '@mui/icons-material/Language';

import MenuActions from '../../menus/MenuActions';

export const DRAWER_WIDTH = 240;

//{name, picture, handleLogin, handleLogout}
export default function Header(props) {
  const navigate=useNavigate();

  const photo = (props.logged && props.picture) ? props.picture : 'img/user.jpg';

  /* Language Menu */
  const [anchorElLanguageMenu, setAnchorElLanguageMenu] = React.useState(null);

  const handleOpenLanguageMenu = (event) => {
    setAnchorElLanguageMenu(event.currentTarget);
  };
  const handleCloseLanguageMenu = (event) => {
    setAnchorElLanguageMenu(null);
  };
  /* Language Menu */

  /* Menu do Usuário */
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogger = () => {
    setAnchorElUser(null);
    navigate("/logger");
  };

  const handleUser = () => {
    setAnchorElUser(null);
    navigate("/user");
  };

  const handleLogout = (event) => {
    setAnchorElUser(null);
    props.handleLogout(event);
  };
  /* Menu do Usuário */

  /* Menu */
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const container = window !== undefined ? () => window().document.body : undefined;
  /* Menu */

  const arrayAdministratorMenuItem = [];

  if (props.administrator) {
    arrayAdministratorMenuItem.push(
      <MenuItem key="Log do Sistema" onClick={handleLogger}>
        <Stack direction="row" alignItems="center" gap={1}>
          <FormatListBulletedIcon sx={{ fontSize: 30, marginTop: 0 }} />
          <Typography>Log do Sistema</Typography>
        </Stack>
      </MenuItem>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className="primary-color"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/" className="img-logo">
            <img src="img/appbar.png" alt="Logo" />
          </Link>

          <Box
            component="nav"
            sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onTransitionEnd={handleDrawerTransitionEnd}
              onClose={handleDrawerClose}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
              }}
            >
              {
                <MenuActions />
              }
            </Drawer>
          </Box>

          <Button
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
            }}
            color="inherit"
            onClick={handleOpenLanguageMenu}
            startIcon={<LanguageIcon />}>
            {props.i18n('menu.header.button.language')}
          </Button>
          <IconButton
            sx={{
              display: { xs: 'inline-flex', sm: 'none' },
            }}
            color="inherit"
            onClick={handleOpenLanguageMenu}
          >
            <LanguageIcon />
          </IconButton>

          <Menu
            sx={{ mt: '45px' }}
            id="menu-language"
            anchorEl={anchorElLanguageMenu}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElLanguageMenu)}
            onClose={handleCloseLanguageMenu}
            disableScrollLock={true}
          >
            {props.languages.map((entry,index)=>(
              <MenuItem key={entry} onClick={(event)=>{
                props.handleChangeLanguage(entry);
                handleCloseLanguageMenu(event);
              }}>
                {entry}
              </MenuItem>
            ))}
          </Menu>

          {
            (!props.logged) ?
              (props.loadingLogin) ?
                <Skeleton
                  sx={{ bgcolor: 'grey.900' }}
                  variant="circular"
                  width={40} height={40}
                />
              :
              <>
                <Button
                  sx={{
                    display: { xs: 'none', sm: 'inline-flex' },
                  }}
                  color="inherit"
                  onClick={props.handleLogin}
                  startIcon={<LoginIcon />}>
                  {props.i18n('menu.header.button.login')}
                </Button>
                <IconButton
                  sx={{
                    display: { xs: 'inline-flex', sm: 'none' },
                  }}
                  color="inherit"
                  onClick={props.handleLogin}
                >
                  <LoginIcon />
                </IconButton>
              </>
            :
            <Box sx={{ flexGrow: 0, marginLeft: 3 }}>
              <Tooltip title={props.name}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src={photo} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                disableScrollLock={true}
              >
                <MenuItem key="Name">
                  <Typography variant="h6">{props.name}</Typography>
                </MenuItem>
                <Divider />
                <MenuItem key="Minha Conta" onClick={handleUser}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <AccountBoxIcon sx={{ fontSize: 30, marginTop: -0.5 }} />
                    <Typography>Minha Conta</Typography>
                  </Stack>
                </MenuItem>
                <MenuItem key="Biblioteca" onClick={handleLogout}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <MenuBookIcon sx={{ fontSize: 30, marginTop: -0.5 }} />
                    <Typography>Biblioteca</Typography>
                  </Stack>
                </MenuItem>
                {arrayAdministratorMenuItem}
                <MenuItem key="Logout" onClick={handleLogout}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <LogoutIcon sx={{ fontSize: 30, marginTop: -0.5 }} />
                    <Typography>Logout</Typography>
                  </Stack>
                </MenuItem>
              </Menu>
            </Box>
          }
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          flexShrink: 0,
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          zIndex: (theme) => theme.zIndex.appBar - 1,
        }}
        open
      >
        <Toolbar />
        <Box sx={{
          overflow: 'auto',
        }}>
          {
            <MenuActions />
          }
        </Box>
      </Drawer>
    </Box>
  );
}
