import type { SvgIconsType } from "~/components/svc-icons/types";

import { render } from "@testing-library/react";
import { SvgIcon } from "~/components";

const variants: SvgIconsType[] = [
  "delete",
  "edit",
  "check",
  "add",
  "cross",
  "eyball_1",
  "odc_management",
  "people",
  "person",
  "project_management",
  "settings",
  "user_management",
];
describe("Svg Icon Component", () => {
  it("renders the svg icon", () => {
    variants.forEach((variant) => {
      const { getByTestId, unmount, asFragment } = render(<SvgIcon name={variant} />);

      const icon = getByTestId("svg-component");
      expect(icon).toBeInTheDocument();
      expect(asFragment()).toMatchSnapshot();
      unmount();
    });
  });
});
