import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmModal } from '~/components';

describe('ConfirmModal Component', () => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
  };

  test('renders without errors', () => {
    render(<ConfirmModal message="Delete" {...defaultProps} />);
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  test('calls onClose when "No Thanks" button is clicked', () => {
    render(<ConfirmModal closeLabel="No Thanks" {...defaultProps} />);
    
    const noThanksButton = screen.getByText("No Thanks");
    fireEvent.click(noThanksButton);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  test('calls onConfirm when "Yes Please" button is clicked', () => {
    const mockOnConfirm = jest.fn();
    render(<ConfirmModal confirmLabel="Yes Please" {...defaultProps} onConfirm={mockOnConfirm} />);
    
    const yesPleaseButton = screen.getByText("Yes Please");
    fireEvent.click(yesPleaseButton);
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  test('calls onConfirmWithIndex with the correct argument when "Yes Please" button is clicked', () => {
    const mockOnConfirmWithIndex = jest.fn();
    const selectedRow = 42;
    render(
      <ConfirmModal
        confirmLabel="Yes Please"
        onConfirmWithIndex={mockOnConfirmWithIndex}
        selectedRow={selectedRow}
        {...defaultProps}
      />
    );

    const yesPleaseButton = screen.getByText("Yes Please");
    fireEvent.click(yesPleaseButton);
    expect(mockOnConfirmWithIndex).toHaveBeenCalledWith(selectedRow);
  });

  test("pass confirmIcon property", () => {
    render(<ConfirmModal confirmIcon="delete" {...defaultProps} />);  
    
    const svgIcon = screen.getByTestId("svg-component");
    expect(svgIcon).toBeInTheDocument();
  })
});
