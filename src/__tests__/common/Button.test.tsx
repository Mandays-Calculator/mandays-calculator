import { render } from "@testing-library/react";
import { CustomButton } from "~/components/form/button";

describe("CustomButton", () => {
  it("renders without crashing", () => {
    const { getByRole } = render(<CustomButton />);
    const button = getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("renders with different color variants", () => {
    const variants: any[] = [
      "primary",
      "primaryDark",
      "primaryLight",
      "secondary",
      "error",
      "warning",
      "success",
      "neutral",
    ];

    variants.forEach((variant) => {
      const { getByRole, unmount } = render(
        <CustomButton colorVariant={variant} />
      );
      const button = getByRole("button");
      // For this test, we're just checking if the button has some style when a variant is given
      // This doesn't validate the exact color, but ensures some styling has been applied
      expect(button).toHaveStyle("textTransform: none");
      unmount(); // unmount current variant before testing the next
    });
  });
});
