import type { ReactElement } from "react";
import type { Permission } from "~/api/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Box, Typography, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { SvgIcon } from "~/components";
import { useUserAuth } from "~/hooks/user";
import LocalizationKey from "~/i18n/key";
import { SvgIconsType } from "../svc-icons/types";

import {
  StyledDrawer,
  StyledCollapsibleItem,
  StyledItemText,
  StyledListItemIcon,
  StyledListItem,
  StyledList,
} from ".";

const Drawer = (): ReactElement => {
  const [open, setOpen] = useState<boolean>(true);
  const {
    state: { permissions, loading },
  } = useUserAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { common } = LocalizationKey;

  const handleNavigate = (routeItem: Permission): void => {
    navigate(`${routeItem.path}`);
  };

  if (!loading)
    return (
      <Box sx={{ display: "flex" }}>
        <StyledDrawer variant="permanent" open={open}>
          <StyledList
            open={open}
            permissionsLength={permissions.length}
            sx={{ mt: 7 }}
          >
            {permissions.map((routeItem: Permission, index: number) => {
              if (routeItem.icon) {
                return (
                  <StyledListItem
                    key={index}
                    onClick={() => handleNavigate(routeItem)}
                    open={open}
                  >
                    <StyledListItemIcon open={open}>
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
                    {open && <StyledItemText primary={routeItem.displayName} />}
                  </StyledListItem>
                );
              }
            })}
          </StyledList>
        </StyledDrawer>
        <StyledCollapsibleItem open={open}>
          <IconButton onClick={() => setOpen(!open)}>
            <SvgIcon name={open ? "collapse_left" : "collapse_right"} />
          </IconButton>
          {open && <Typography>{t(common.collapse)}</Typography>}
        </StyledCollapsibleItem>
      </Box>
    );

  return <></>;
};

export default Drawer;
