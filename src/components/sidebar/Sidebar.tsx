import type { ReactElement } from "react";
import type { RouteType } from "~/routes";
import { useNavigate } from "react-router-dom";

import Drawer from "@mui/material/Drawer";
import { List } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useTranslation } from "react-i18next";
import { routesConfig } from "~/routes";
import {
  StyledDrawerContent,
  StyledItemText,
  StyledListItem,
  StyledListItemIcon,
} from ".";

const Sidebar = (): ReactElement => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigate = (routeItem: RouteType): void => {
    navigate(`${routeItem.path}`);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={false}
      sx={{
        flex: 1,
        maxWidth: 390,
      }}
    >
      <StyledDrawerContent>
        <List>
          {routesConfig.map((routeItem: RouteType) => {
            if (!routeItem.hideOnSidebar === true) {
              return (
                <StyledListItem onClick={() => handleNavigate(routeItem)}>
                  <StyledListItemIcon>
                    <AccountCircleIcon />
                  </StyledListItemIcon>
                  <StyledItemText primary={t(routeItem.label || "")} />
                </StyledListItem>
              );
            }
          })}
        </List>
      </StyledDrawerContent>
    </Drawer>
  );
};

export default Sidebar;
