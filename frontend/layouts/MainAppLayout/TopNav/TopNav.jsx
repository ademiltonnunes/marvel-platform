import * as React from "react";
import { useRouter } from "next/router";
import ROUTES from "@/constants/routes";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "@/redux/store";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

import IconLogo from "@/assets/svg/Logo.jsx";
import IconLogout from "@/assets/svg/Logout.jsx";
import IconNavHome from "@/assets/svg/NavIconHome";
import IconNcavDiscovery from "@/assets/svg/NavIconDiscovery";
import IconNavChat from "@/assets/svg/NavIconChat";
import Button from "@mui/material/Button";

import styles, { colorMap } from "./styles";

function TopNavBar() {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const { pathname } = router;
  const {
    data: { fullName },
  } = user;

  const pages = [
    {
      name: "Home",
      icon: IconNavHome,
      path: ROUTES.HOME,
      active: pathname === "/" || pathname === "/welcome-screen",
      disabled: false,
    },
    {
      name: "Discovery",
      icon: IconNcavDiscovery,
      path: ROUTES.CHAT, // todo
      active: false,
      disabled: true,
    },
    {
      name: "Chat",
      icon: IconNavChat,
      path: ROUTES.CHAT,
      active: pathname === "/chat",
      disabled: false,
    },
  ];

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
            {pages.map((page, index) => (
              <Button
                key={page.name}
                onClick={() => handleNavMenu(page)}
                startIcon={page.icon({
                  color: page.disabled
                    ? colorMap.default
                    : colorMap[page.active ? "active" : "default"],
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
            <Avatar src={user.ProfilePhotoUrl} />
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
