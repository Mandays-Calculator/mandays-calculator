import { numberInputClasses } from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";

export const StyledInputRoot = styled("div")`
  font-weight: 400;
  border-radius: 8px;
  border: 1px solid #979292;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  display: grid;
  grid-template-columns: 1fr 28px;
  grid-template-rows: 1fr 1fr;
  overflow: hidden;
  column-gap: 8px;

  &.${numberInputClasses.focused} {
    border-color: #;
    box-shadow: 0 0 0 3px #80bfff;
  }

  &:hover {
    border-color: ${({ theme }) => theme.palette.primary.main};
  }

  &:focus-visible {
    outline: 0;
  }
`;

export const StyledInputElement = styled("input")`
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  grid-column: 1/2;
  grid-row: 1/3;
  color: #1c2025;
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
`;

export const StyledButton = styled("button")`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  appearance: none;
  padding: 0;
  width: 28px;
  height: 28px;
  font-size: 0.875rem;
  line-height: 1;
  box-sizing: border-box;
  background: transparent;
  border: 0;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;
  text-align: center;

  &:hover {
    cursor: pointer;

    & img {
      transform: scale(1.2);
    }
  }

  &.${numberInputClasses.incrementButton} {
    grid-column: 2/3;
    grid-row: 1/2;
    border-left: 1px solid #979292;
    padding: 0 8px;
    border-bottom: 1px solid #979292;
  }

  &.${numberInputClasses.decrementButton} {
    grid-column: 2/3;
    grid-row: 2/3;
    border-left: 1px solid #979292;
  }
`;
