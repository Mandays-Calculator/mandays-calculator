import type { ReactElement, MouseEvent } from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

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

import { ConfirmModal } from "~/components";
import { useUserAuth } from "~/hooks/user";
import renderRole from "~/utils/helpers/renderRoleHelper";

import LocalizationKey from "~/i18n/key";
import AvatarImg from "~/assets/img/avatar.png";

import {
  StyledAppBar,
  StyledToolBarContainer,
  StyledSearchSelect,
  popperStyle,
  StyledProjectTitle,
} from ".";
import { getProjectOptions } from "./utils";

import { updateSelectedProject } from "~/redux/reducers/user";

const AppBarHeader = (): ReactElement => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    state: { user, projects, selectedProject },
    logout,
  } = useUserAuth();

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

  const { common } = LocalizationKey;

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth={false} disableGutters={true}>
        <StyledToolBarContainer>
          <Toolbar>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Box sx={{ flexGrow: 0, alignItems: "left" }}>
                  {getProjectOptions(projects).length > 1 ? (
                    <StyledSearchSelect
                      multiple={false}
                      name="selectedProject"
                      value={selectedProject}
                      placeholder={t(common.header.projectPlaceholder)}
                      popperSX={popperStyle}
                      onChange={(_: React.SyntheticEvent, value: any) => {
                        dispatch(updateSelectedProject(value));
                      }}
                      options={getProjectOptions(projects)}
                    />
                  ) : (
                    <Grid container>
                      <Grid item>
                        <StyledProjectTitle>
                          {selectedProject?.label}
                        </StyledProjectTitle>
                      </Grid>
                      <Grid item>
                        <ArrowDropDownIcon
                          fontSize="large"
                          sx={{ color: "#414145" }}
                        />
                      </Grid>
                    </Grid>
                  )}
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box sx={{ flexGrow: 0, alignItems: "right" }}>
                  <Tooltip title={t(common.header.toolTipTitle)}>
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
                          {positions?.map((position: string, index: number) => (
                            <span style={{ display: "block" }} key={index}>
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
              </Grid>
            </Grid>
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
