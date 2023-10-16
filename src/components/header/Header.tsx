import type { ReactElement, MouseEvent } from "react";
import { useState } from "react";
import {
  Box,
  Toolbar,
  IconButton,
  MenuItem,
  Grid,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
} from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import CompanyLogo from "~/assets/img/company-logo.png";
import AvatarImg from "~/assets/img/avatar.png";
import { StyledAppBar, StyledToolBarContainer } from ".";

const AppBarHeader = (): ReactElement => {
  const userSettings = ["Profile", "Change Password ", "Logout"];
  const name = "Dela Cruz, Juan";
  const position = "Sprint Manager";

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (): void => {
    setAnchorElUser(null);
  };

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth={false} disableGutters={true}>
        <StyledToolBarContainer style={{ padding: "0 32px" }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* Logo image template holder*/}
            <img src={CompanyLogo} width={135} height={51} alt="company-logo" />
            <Box sx={{ flexGrow: 0, alignItems: "right" }}>
              <Tooltip title="Open settings">
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={3}>
                    <Avatar alt={name} src={AvatarImg} />
                  </Grid>
                  <Grid item xs={8}>
                    <Typography textAlign="center" fontSize={14}>
                      {name}
                    </Typography>
                    <Typography textAlign="center" fontSize={10}>
                      {position}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      sx={{ p: 0, m: 0 }}
                      onClick={handleOpenUserMenu}
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                    >
                      <ArrowDropDownIcon fontSize="large" />
                    </IconButton>
                  </Grid>
                </Grid>
              </Tooltip>

              <Menu
                sx={{ mt: "50px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {userSettings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </StyledToolBarContainer>
      </Container>
    </StyledAppBar>
  );
};
export default AppBarHeader;
