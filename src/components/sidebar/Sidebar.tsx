import type { ReactElement } from "react";
import type { Permission } from "~/api/user";
import type { UserPermissionState } from "~/redux/reducers/user/types";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { Box, Typography, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { selectUser } from "~/redux/reducers/user";

import { SvgIcon } from "~/components";
import LocalizationKey from "~/i18n/key";

import {
  StyledDrawer,
  StyledCollapsibleItem,
  StyledItemText,
  StyledListItemIcon,
  StyledListItem,
  StyledList,
} from ".";
import { SvgIconsType } from "../svc-icons/types";

const Drawer = (): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const userState: UserPermissionState = useSelector(selectUser);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { common } = LocalizationKey;

  const handleNavigate = (routeItem: Permission): void => {
    navigate(`${routeItem.path}`);
  };

  if (!userState.loading)
    return (
      <Box sx={{ display: "flex" }}>
        <StyledDrawer variant="permanent" open={open}>
          <StyledList open={open} sx={{ mt: 7 }}>
            {userState.permissions.map(
              (routeItem: Permission, index: number) => {
                if (routeItem.icon) {
                  return (
                    <StyledListItem
                      key={index}
                      onClick={() => handleNavigate(routeItem)}
                      open={open}
                    >
                      <StyledListItemIcon>
                        {routeItem.icon ? (
                          <SvgIcon
                            name={routeItem.icon as SvgIconsType}
                            $size={3}
                            color="primary"
                          />
                        ) : (
                          <AccountCircleIcon fontSize="large" />
                        )}
                      </StyledListItemIcon>
                      {open && (
                        <StyledItemText primary={routeItem.displayName} />
                      )}
                    </StyledListItem>
                  );
                }
              }
            )}
          </StyledList>
          <StyledCollapsibleItem open={open}>
            <IconButton onClick={() => setOpen(!open)}>
              <SvgIcon name={open ? "collapse_left" : "collapse_right"} />
            </IconButton>
            {open && <Typography>{t(common.collapse)}</Typography>}
          </StyledCollapsibleItem>
        </StyledDrawer>
      </Box>
    );

  return <></>;
};

export default Drawer;
