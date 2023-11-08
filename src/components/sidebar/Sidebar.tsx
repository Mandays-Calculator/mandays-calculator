import type { ReactElement } from "react";
import type { RouteType } from "~/routes";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Divider, Box, Typography, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { SvgIcon } from "~/components";
import { routesConfig } from "~/routes";
import LocalizationKey from "~/i18n/key";

import {
  StyledDrawer,
  DrawerHeader,
  StyledCollapsibleItem,
  StyledItemText,
  StyledListItemIcon,
  StyledListItem,
  StyledList,
} from ".";

const Drawer = (): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { common } = LocalizationKey;
  const handleNavigate = (routeItem: RouteType): void => {
    navigate(`${routeItem.path}`);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <StyledDrawer variant="permanent" open={open}>
        <DrawerHeader></DrawerHeader>
        <Divider sx={{ mb: 7 }} />
        <StyledList open={open}>
          {routesConfig.map((routeItem: RouteType, index: number) => {
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
                        $size={4}
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
          })}
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
