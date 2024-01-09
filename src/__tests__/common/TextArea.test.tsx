import { render } from '@testing-library/react';
import { ThemeProvider } from "@mui/material";
import theme from "~/theme";
import { TextArea } from "~/components/form";


describe('TextArea Component', () => {
  test('renders without errors', () => {
    const {getByTestId, asFragment} = render(
      <TextArea 
        name="test" 
        label="Text Area Label"
      />
    );
    const textarea = getByTestId("text-area-component");
    expect(textarea).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test('handles input and triggers events', () => {
    const { getByTestId, asFragment} = render(<TextArea name="test" />);
    const textarea = getByTestId("text-area-component");
    expect(textarea).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test('render with error', () => {
    const { getByTestId, asFragment, unmount} = render(
      <ThemeProvider theme={theme}>
        <TextArea 
          name="test" 
          error
        />
      </ThemeProvider>
    );
    const textarea = getByTestId("text-area-component");
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveStyle({
      borderColor: theme.palette.error.main,
    });
    expect(asFragment()).toMatchSnapshot();
    unmount();
  })
});