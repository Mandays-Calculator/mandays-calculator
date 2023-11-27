import type { ReactElement, MouseEvent } from "react";

import { useState } from "react";
import { useAuth } from "react-oidc-context";
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

import AvatarImg from "~/assets/img/avatar.png";
import ChangePasswordModal from "~/pages/auth/ChangePasswordModal";
import { getUser } from "~/utils/oidc-utils";

import { StyledAppBar, StyledToolBarContainer } from ".";

const AppBarHeader = (): ReactElement => {
  const auth = useAuth();
  const user = getUser();
  const name = user?.profile.name;
  const position = "Sprint Manager";

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [changePasswordModalOpen, setChangePasswordModalOpen] =
    useState<boolean>(false);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (): void => {
    setAnchorElUser(null);
  };

  const handleChangePasswordUserMenu = (): void => {
    setAnchorElUser(null);
    setChangePasswordModalOpen(true);
  };

  const handleLogoutUserMenu = (): void => {
    auth.removeUser();
  };
  return (
    <StyledAppBar position="sticky">
      <Container maxWidth={false} disableGutters={true}>
        <StyledToolBarContainer>
          <Toolbar sx={{ justifyContent: "right" }}>
            <Box sx={{ flexGrow: 0, alignItems: "right" }}>
              <Tooltip title="Open settings">
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  columnSpacing={1}
                >
                  <Grid item xs={4}>
                    <Avatar alt={name} src={String(AvatarImg)} />
                  </Grid>
                  <Grid item xs={7}>
                    <Typography textAlign="left" fontSize={14}>
                      {name}
                    </Typography>
                    <Typography textAlign="left" fontSize={10}>
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
                <MenuItem key="Profile" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem
                  key="Change Password"
                  onClick={handleChangePasswordUserMenu}
                >
                  <Typography textAlign="center">Change Password</Typography>
                </MenuItem>
                <MenuItem key="Logout" onClick={handleLogoutUserMenu}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </StyledToolBarContainer>
      </Container>

      <ChangePasswordModal
        open={changePasswordModalOpen}
        onClose={() => setChangePasswordModalOpen(false)}
      />
    </StyledAppBar>
  );
};
export default AppBarHeader;
