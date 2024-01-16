import type { ReactElement, MouseEvent } from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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

import { ConfirmModal } from "~/components";
import { useUserAuth } from "~/hooks/user";
import renderRole from "~/utils/helpers/renderRoleHelper";

import LocalizationKey from "~/i18n/key";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AvatarImg from "~/assets/img/avatar.png";

import { StyledAppBar, StyledToolBarContainer } from ".";

const AppBarHeader = (): ReactElement => {
  const navigate = useNavigate();
  const {
    state: { user },
    logout,
  } = useUserAuth();
  const { t } = useTranslation();

  const name = `${user?.firstName} ${user?.lastName}`;
  const positions = user?.roles;

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [openLogoutModal, setOpenLogoutModal] = useState<boolean>(false);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (): void => {
    setAnchorElUser(null);
  };

  const handleLogoutUserMenu = (): void => {
    setOpenLogoutModal(true);
  };

  const userMenu = [
    {
      label: t(LocalizationKey.accountInfo.label),
      onClick: () => navigate("./account-info"),
    },
    {
      label: t(LocalizationKey.common.logout),
      onClick: handleLogoutUserMenu,
    },
  ];

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
                  <Grid item xs={7} sx={{ p: 1 }}>
                    <Typography
                      textAlign="left"
                      fontSize={14}
                      sx={{ pt: 1, fontWeight: 700 }}
                    >
                      {name}
                    </Typography>
                    <Typography textAlign="left" fontSize={9}>
                      {positions?.map((position: string) => (
                        <span style={{ display: "block" }}>
                          {renderRole(position)}
                        </span>
                      ))}
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
                {userMenu.map((menu) => (
                  <MenuItem key={menu.label} onClick={menu.onClick}>
                    <Typography textAlign="center">{menu.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </StyledToolBarContainer>
      </Container>
      <ConfirmModal
        open={openLogoutModal}
        maxWidth="lg"
        onConfirm={() => logout()}
        confirmLabel={t(LocalizationKey.common.logout)}
        onClose={() => setOpenLogoutModal(false)}
        message={t(LocalizationKey.common.idleTimeOutLabel)}
        closeLabel={t(LocalizationKey.changePassword.btnlabel.cancel)}
      />
    </StyledAppBar>
  );
};
export default AppBarHeader;
