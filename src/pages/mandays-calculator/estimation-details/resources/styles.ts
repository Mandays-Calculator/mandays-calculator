import { styled } from "@mui/material";

export const StyledTableContainer = styled("div")`
  & .MuiTableContainer-root {
    box-shadow: none;
  }

  & .MuiTable-root {
    background: none;
    box-shadow: none;
    outline: none;
    border: none;

    .MuiTableHead-root {
      .MuiTableRow-root {
        background: none;
      }

      .MuiTableCell-root {
        box-shadow: none;
        background: none;
        border: 0px;

        & span {
          font-weight: 700;
        }
      }
    }

    .MuiTableBody-root {
      .MuiTableRow-root {
        background: none;
      }

      .MuiTableCell-root {
        box-shadow: none;
        background: none;
        border: 0px;
      }
    }
  }
`;
