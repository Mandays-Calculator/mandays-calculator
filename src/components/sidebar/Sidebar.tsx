import type { ReactElement } from "react";
import type { RouteType } from "~/routes";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Divider, Box, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { SvgIcon } from "~/components";
import { routesConfig } from "~/routes";
import {
  StyledDrawer,
  DrawerHeader,
  StyledItemText,
  StyledListItemIcon,
  StyledListItem,
  StyledList,
} from ".";

const Drawer = (): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigate = (routeItem: RouteType): void => {
    navigate(`${routeItem.path}`);
  };

  const isActivePath = (path: string): boolean => {
    return location.pathname.includes(path);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <StyledDrawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ mb: 7 }} />
        <StyledList open={open}>
          {routesConfig.map((routeItem: RouteType, index: number) => {
            if (!routeItem.hideOnSidebar === true) {
              return (
                <StyledListItem
                  key={index}
                  activepath={isActivePath(routeItem.path || "")}
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
      </StyledDrawer>
    </Box>
  );
};

export default Drawer;
