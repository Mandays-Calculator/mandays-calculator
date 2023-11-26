import type {
  RenderStripedRowProps,
  DataRowType,
  CellParamType,
} from "../types";

import React, { ReactElement } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import {
  StyledCell,
  StyledStripeRow,
  StyledHeaderStripeRow,
  StyledIconButton,
} from "../styles";

const StripedRowRenderer = <T extends object>({
  row,
  onRowClick,
  type,
  toggleCollapse,
  rowId,
  isCollapsed,
}: RenderStripedRowProps<T>): ReactElement | null => {
  const renderCells = (dataRow: DataRowType) => {
    return Object.keys(dataRow).map((key) => (
      <StyledCell key={`${rowId}-${key}`}>{dataRow[key]}</StyledCell>
    ));
  };

  switch (type) {
    case "collapse":
      return (
        <React.Fragment key={rowId}>
          <StyledHeaderStripeRow>
            <StyledCell
              colSpan={row.cells.length}
              sx={{ position: "relative" }}
            >
              {row.original.label}
              <StyledIconButton
                size="small"
                onClick={() => toggleCollapse(rowId)}
              >
                {isCollapsed ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </StyledIconButton>
            </StyledCell>
          </StyledHeaderStripeRow>
          {!isCollapsed &&
            row.original.data.map((dataRow: any, index: any) => (
              <StyledStripeRow key={`${rowId}-${index}`}>
                {renderCells(dataRow)}
              </StyledStripeRow>
            ))}
        </React.Fragment>
      );
    default:
      return (
        <StyledStripeRow
          key={rowId}
          {...row.getRowProps({
            onClick: onRowClick ? () => onRowClick(row.original) : undefined,
            style: { cursor: onRowClick ? "pointer" : "default" },
          })}
        >
          {row.cells.map((cell: CellParamType) => (
            <StyledCell {...cell.getCellProps()}>
              {cell.render("Cell")}
            </StyledCell>
          ))}
        </StyledStripeRow>
      );
  }
};

export default StripedRowRenderer;
