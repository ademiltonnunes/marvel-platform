import React, { useCallback, useContext, useState } from 'react';

import { Brightness4, Brightness7 } from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { signOut } from 'firebase/auth';

import { useRouter } from 'next/router';

import { useDispatch, useSelector } from 'react-redux';

import IconLogo from '@/assets/svg/Logo.jsx';
import IconLogout from '@/assets/svg/Logout.jsx';
import IconNavChat from '@/assets/svg/NavIconChat';
import IconNcavDiscovery from '@/assets/svg/NavIconDiscovery';
import IconNavHome from '@/assets/svg/NavIconHome';

import ROUTES from '@/constants/routes';

import styles, { colorMap } from './styles';

import { updateUserTheme } from '@/redux/slices/userSlice';

import { auth } from '@/redux/store';
import { ColorModeContext } from '@/theme/theme';

function TopNavBar() {
  const dispatch = useDispatch();
  const { toggleColorMode } = useContext(ColorModeContext);
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const { pathname } = router;
  const fullName = user?.data?.fullName || 'User';
  const [colorMode, setColorMode] = useState(
    user?.data?.systemConfig?.theme || false
  );
  const ProfilePhotoUrl = user?.data?.ProfilePhotoUrl || '';

  const pages = [
    {
      name: 'Home',
      icon: IconNavHome,
      path: ROUTES.HOME,
      active: pathname === '/' || pathname === '/welcome-screen',
      disabled: false,
    },
    {
      name: 'Discovery',
      icon: IconNcavDiscovery,
      path: ROUTES.CHAT, // todo
      active: false,
      disabled: true,
    },
    {
      name: 'Chat',
      icon: IconNavChat,
      path: ROUTES.CHAT,
      active: pathname === '/chat',
      disabled: false,
    },
  ];

  const handleThemeToggle = useCallback(() => {
    const newTheme = !colorMode;
    setColorMode(newTheme);
    toggleColorMode();
    dispatch(updateUserTheme(newTheme));
  }, [colorMode, toggleColorMode, dispatch]);

  const handleNavMenu = (item) => {
    if (item.disabled) return;

    router.push(item.path);
  };

  const handleSignOutUser = () => {
    signOut(auth);
  };

  const goHome = () => {
    router.push(ROUTES.HOME);
  };

  return (
    <AppBar {...styles.mainGridProps}>
      <Container>
        <Toolbar disableGutters>
          <Box onClick={goHome} {...styles.leftBoxProps}>
            <IconLogo />
            <Typography {...styles.iconTitleProps}>
              AI Teaching Assistant
            </Typography>
          </Box>

          <Box {...styles.menuBoxProps}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleNavMenu(page)}
                startIcon={page.icon({
                  color: page.disabled
                    ? colorMap.default
                    : colorMap[page.active ? 'active' : 'default'],
                })}
                {...styles.menuButtonProps(page)}
              >
                <Typography {...styles.menuButtonTextProps(page)}>
                  {page.name}
                </Typography>
              </Button>
            ))}
          </Box>

          <Box {...styles.rightSectionBoxProps}>
            <IconButton onClick={handleThemeToggle} color="inherit">
              {colorMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            &emsp;
            <Avatar src={ProfilePhotoUrl} />
            &emsp;
            <Typography {...styles.rightSectionBoxTextProps}>
              {fullName}
            </Typography>
            <IconButton onClick={handleSignOutUser} sx={{ p: 0 }}>
              <IconLogout alt="logout" />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopNavBar;
