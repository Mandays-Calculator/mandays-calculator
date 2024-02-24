import { Avatar, Box, Divider, Grid, Stack, Typography } from "@mui/material";
import _ from "lodash";
import { toUpperCaseNames } from "~/utils/helpers";
import { ErrorMessage, Select, TextField } from "~/components";
import { Modal } from "~/components/modal";
import { CustomButton } from "~/components/form/button";
import { useState } from "react";
import { useCommonOption } from "~/queries/common/options";
import { UserListData } from "~/api/user-management/types";
import { useTimeout } from "~/hooks/timeout";
import {
  CardContainer,
  CardInfoContainer,
  StyledNoDataFoundLabel,
} from "./styles";

type UserModal = {
  open: boolean;
  toggleOpen: (value: boolean) => void;
  onSelectUser: (value: SelectObject) => void;
};

const UserModal = (props: UserModal) => {
  const { open, toggleOpen, onSelectUser } = props;

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<UserListData | null>(null);
  const [filterValues, setFilterValues] = useState<{
    odc: string;
    careerStep: string;
  }>({ odc: "", careerStep: "" });

  const users = useCommonOption("user", { keyword: inputValue }, true);
  const careerSteps = useCommonOption("career_step");
  const odc = useCommonOption("odc");

  const [triggerTimeout] = useTimeout();
  const handleSelectUser = (): void => {
    if (selectedUser === null) {
      setErrorMessage("Please select a user");
      triggerTimeout(() => setErrorMessage(""));
    } else {
      onSelectUser({
        label: (selectedUser as unknown as SelectObject).label,
        value: (selectedUser as unknown as SelectObject).value,
      });
      toggleOpen(false);
    }
  };

  const filterUsers = (
    users: UserListData[],
    filterValues: {
      odc: string;
      careerStep: string;
    },
  ): UserListData[] => {
    const uniqUsers = _.uniqBy(
      users,
      (user) =>
        (user as unknown as UserListData).firstName.toLocaleLowerCase() +
        (user as unknown as UserListData).lastName.toLocaleLowerCase(),
    ) as unknown as UserListData[];
    if (filterValues.careerStep || filterValues.odc) {
      return uniqUsers.filter(
        (user) =>
          (user.careerStep === filterValues.careerStep && user) ||
          (user.odc?.id === filterValues.odc && user),
      );
    }
    return uniqUsers;
  };

  return (
    <>
      <Modal
        open={open}
        title="Search User"
        maxWidth={"lg"}
        onClose={() => toggleOpen(false)}
      >
        <Box sx={{ width: "auto", minWidth: 500 }}>
          <Stack direction="column">
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <TextField
                  name="team-lead-search"
                  placeholder="Type any user to search."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={4}>
                <Select
                  name="team-lead-filter-odc"
                  value={filterValues.odc}
                  options={odc}
                  onChange={(_, value: any) => {
                    setFilterValues({
                      ...filterValues,
                      odc: value.props.value,
                    });
                  }}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={3}>
                <Select
                  name="team-lead-filter-career-step"
                  value={filterValues.careerStep}
                  options={careerSteps}
                  onChange={(_, value: any) => {
                    setFilterValues({
                      ...filterValues,
                      careerStep: value.props.value,
                    });
                  }}
                  fullWidth={true}
                />
              </Grid>
            </Grid>
          </Stack>
          <Divider sx={{ m: "1rem 1rem 0" }} />
          <Stack direction={"row"} sx={{ p: "1rem" }}>
            <Grid container>
              {filterUsers(users as unknown as UserListData[], filterValues)
                .length > 0 ? (
                filterUsers(
                  users as unknown as UserListData[],
                  filterValues,
                ).map((user, index) => (
                  <Grid item xs={6} key={index}>
                    <CardContainer
                      onClick={() => setSelectedUser(user)}
                      selected={selectedUser?.id === user.id}
                    >
                      <Avatar alt={`${user.lastName} ${user.firstName}`} />
                      <CardInfoContainer>
                        <Typography>
                          {toUpperCaseNames(user.lastName)},{" "}
                          {toUpperCaseNames(user.firstName)}{" "}
                          {toUpperCaseNames(user.middleName ?? "")}
                        </Typography>
                        <Typography>{user.email ?? "-"}</Typography>
                        <Typography>
                          <strong>{user.careerStep}</strong> - {user.employeeId}
                        </Typography>
                      </CardInfoContainer>
                    </CardContainer>
                  </Grid>
                ))
              ) : (
                <StyledNoDataFoundLabel>No user found</StyledNoDataFoundLabel>
              )}
            </Grid>
          </Stack>

          <Stack
            direction="row"
            display="flex"
            justifyContent="flex-end"
            gap={1}
          >
            <CustomButton
              type="button"
              colorVariant="secondary"
              onClick={() => toggleOpen(false)}
              data-testid="test-cancel-btn"
            >
              Cancel
            </CustomButton>
            <CustomButton
              type="button"
              colorVariant="primary"
              onClick={handleSelectUser}
              data-testid="test-select-btn"
            >
              Select
            </CustomButton>
          </Stack>
        </Box>
      </Modal>
      <ErrorMessage error={errorMessage} type={"alert"} />
    </>
  );
};

export default UserModal;
