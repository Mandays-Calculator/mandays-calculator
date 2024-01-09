import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from "@mui/material";
import theme from "~/theme";
import { NumberInput } from '~/components/form';

describe('NumberInput Component', () => {
  test('renders without errors', () => {
    const { getByTestId, asFragment } = render(
      <ThemeProvider theme={theme}>
        <NumberInput name="test" />
      </ThemeProvider>
    );
    
    const numberInput = getByTestId("number-input-component");
    expect(numberInput).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test('handles onChange correctly', async () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <NumberInput 
          name="test" 
          onChange={mockOnChange} 
        />
      </ThemeProvider>
    );
    
    const numberInput = getByTestId("number-input-component");
    await userEvent.type(numberInput, '123');
    waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(123);
    })
  });

  test('applies width correctly', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <NumberInput 
          name="test" 
          width={5} 
        />
      </ThemeProvider>
    );
    const input = getByTestId("number-input-component");
    
    expect(input).toHaveStyle({ width: '5rem' });
  });
});
