import type { ReactElement } from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Box, Typography, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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

import { getSidebarConfig, SideBarItemType } from "./config";

const Drawer = (): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { common } = LocalizationKey;
  const handleNavigate = (routeItem: SideBarItemType): void => {
    navigate(`${routeItem.path}`);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <StyledDrawer variant="permanent" open={open}>
        <StyledList open={open} sx={{ mt: 7 }}>
          {getSidebarConfig("sprint_manager").map(
            (routeItem: SideBarItemType, index: number) => {
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
                          name={routeItem.icon}
                          $size={3}
                          color="primary"
                        />
                      ) : (
                        <AccountCircleIcon fontSize="large" />
                      )}
                    </StyledListItemIcon>
                    {open && (
                      <StyledItemText primary={t(routeItem.label || "")} />
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
};

export default Drawer;
