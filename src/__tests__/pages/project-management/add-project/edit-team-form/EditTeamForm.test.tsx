import { fireEvent, render, screen } from '@testing-library/react';
import * as Formik from 'formik';
import ProviderWrapper from '~/__tests__/utils/ProviderWrapper';
import { addFormInitValue } from '~/pages/project-management/add-project/utils';
import EditTeamForm from '~/pages/project-management/add-project/edit-team-form/EditTeamForm';

// mocking imports should be before describe
jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => ({ t: (key: any) => key }),
}));

describe('Edit Team Form', () => {
  const useFormikContextMock = jest.spyOn(Formik, 'useFormikContext');
  const mockOnCancelEdit = jest.fn();
  const testTeamValue = addFormInitValue;
  testTeamValue.teams.push({ teamName: 'test-team-name', teamLead: 'test-team-lead', teamMembers: [] });

  beforeAll(() => {
    mockOnCancelEdit.mockImplementation((teamIndex: number) => {
      console.log(teamIndex);
    });
  });

  beforeEach(() => {
    useFormikContextMock.mockReturnValue({
      values: testTeamValue,
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      setValues: jest.fn(),
    } as any);

    render(
      <ProviderWrapper>
        <EditTeamForm teamIndex={0} onCancel={() => mockOnCancelEdit(0)} />
      </ProviderWrapper>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render the Edit Team Form', () => {
    expect(screen.getByText('Edit Team')).toBeInTheDocument();
  });

  it('Edit team form text fields should trigger onChange event and be able to click done edit team', () => {
    const projectTeamInput = screen.getByTestId('test-project-name');
    const teamNameInput = screen.getByTestId('test-team-name');
    const teamLeadInput = screen.getByTestId('test-team-lead');
    const doneBtn = screen.getByTestId('test-done-edit-btn');

    const mockOnChangeProjectTeam = jest.fn();
    const mockOnChangeTeamName = jest.fn();
    const mockOnChangeTeamLead = jest.fn();
    const mockOnClickDoneEdit = jest.fn();

    projectTeamInput.onchange = (params: any) => mockOnChangeProjectTeam(params.target.value);
    teamNameInput.onchange = (params: any) => mockOnChangeTeamName(params.target.value);
    teamLeadInput.onchange = (params: any) => mockOnChangeTeamLead(params.target.value);
    doneBtn.onclick = () => mockOnClickDoneEdit();

    fireEvent.change(projectTeamInput, { target: { value: 'demo-project-name' } });
    fireEvent.change(teamNameInput, { target: { value: 'test-team-name' } });
    fireEvent.change(teamLeadInput, { target: { value: 'test-team-lead' } });
    fireEvent.click(doneBtn);

    expect(mockOnChangeProjectTeam).toHaveBeenCalledWith('demo-project-name');
    expect(mockOnChangeTeamName).toHaveBeenCalledWith('test-team-name');
    expect(mockOnChangeTeamLead).toHaveBeenCalledWith('test-team-lead');
    expect(mockOnClickDoneEdit).toHaveBeenCalledTimes(1);
  });

  it('should be able to call add member btn', () => {
    const addMemberBtn = screen.getByTestId('test-add-members-btn');
    const mockOnClickAddMember = jest.fn();

    addMemberBtn.onclick = () => mockOnClickAddMember();

    fireEvent.click(addMemberBtn);

    expect(mockOnClickAddMember).toHaveBeenCalledTimes(1);
  });

  it('should be able to call done edit button that shows validation', () => {
    const doneBtn = screen.getByTestId('test-done-edit-btn');
    const mockOnClickDoneEdit = jest.fn();

    doneBtn.onclick = () => mockOnClickDoneEdit();

    fireEvent.click(doneBtn);

    expect(mockOnClickDoneEdit).toHaveBeenCalledTimes(1);
  });

  it('should be able to call cancel edit button', () => {
    const cancelBtn = screen.getByTestId('test-cancel-edit-btn');

    fireEvent.click(cancelBtn);

    expect(mockOnCancelEdit).toHaveBeenCalledTimes(1);
    expect(mockOnCancelEdit).toHaveBeenCalledWith(0);
  });
});
