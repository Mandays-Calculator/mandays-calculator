import { ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledDrawerContent = styled("div")`
  padding: 66px 10px;
  display: flex;
  flex-direction: column;
  max-width: 390px;
`;

const StyledListItemIcon = styled(ListItemIcon)`
  min-width: 22px;
  margin-right: 15px;
`;

const StyledListItem = styled(ListItem)`
  width: 370px;
  margin: 10px 0;
  cursor: pointer;

  :hover {
    & span,
    div {
      color: ${({ theme }) => theme.palette.background.default};
    }

    border-radius: 10px;
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const StyledItemText = styled(ListItemText)`
  & span {
    color: #414145;
    font-size: 18px;
    font-weight: normal;
  }
`;

export {
  StyledItemText,
  StyledListItem,
  StyledDrawerContent,
  StyledListItemIcon,
};
