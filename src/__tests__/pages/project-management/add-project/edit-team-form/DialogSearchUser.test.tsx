import { fireEvent, render, screen } from '@testing-library/react';
import ProviderWrapper from '~/__tests__/utils/ProviderWrapper';
import DialogSearchUser from '~/pages/project-management/add-project/edit-team-form/DialogSearchUser';

describe('Dialog Search User', () => {
  const mockOnToggleDialog = jest.fn();

  beforeEach(() => {
    render(
      <ProviderWrapper>
        <DialogSearchUser showMemberDialog={true} toggleDialog={() => mockOnToggleDialog()} />
      </ProviderWrapper>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('search user dialog component should be in the document', () => {
    expect(screen.getByText('Search User')).toBeInTheDocument();
  });

  it('dialog search user should be able to click cancel button', () => {
    const cancelBtn = screen.getByTestId('test-cancel-btn');
    const mockOnCancelSearchUser = jest.fn();

    cancelBtn.onclick = () => mockOnCancelSearchUser();

    fireEvent.click(cancelBtn);

    expect(mockOnCancelSearchUser).toHaveBeenCalledTimes(1);
  });

  it('dialog search user should be able to click select button', () => {
    const selectBtn = screen.getByTestId('test-select-btn');
    const mockOnSelectSearchUser = jest.fn();

    selectBtn.onclick = () => mockOnSelectSearchUser();

    fireEvent.click(selectBtn);

    expect(mockOnSelectSearchUser).toHaveBeenCalledTimes(1);
  });
});
