import { ChangeEvent, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { OdcParam } from "~/api/odc/types";
import { UserListData } from "~/api/user-management/types";
import { useODCList } from "~/queries/odc/ODC";
import { useUserList } from "~/queries/user-management/UserManagement";
import { ErrorMessage, Select, TextField } from "~/components";
import { Modal } from "~/components/modal";
import { CustomButton } from "~/components/form/button";

type Members = UserListData & { isSelected: boolean; fullName: string };
type OdcDropdown = OdcParam & { value: string; label: string };

type UserModal = {
  open: boolean;
  toggleOpen: (value: boolean) => void;
  selectedTeamLead: SelectObject | null | undefined;
  showMemberDialog: boolean;
  toggleDialog: ($event?: any) => void;
};

const UserModal = (props: UserModal) => {
  const { selectedTeamLead, open, toggleOpen } = props;
  const { data: listOfUsers } = useUserList();
  const { data: listOfOdc } = useODCList();
  const [odcList, setOdcList] = useState<OdcDropdown[]>([] as any[]);
  const [userList, setUserList] = useState<Members[]>([]);
  const [originUserList, setOriginUserList] = useState<Members[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");
  const [searchOdc, setSearchOdc] = useState<string>("");

  const renderUserList = (user: Members, index: number) => {
    return (
      <Grid item xs={2} sm={4} md={4} key={index}>
        <Grid
          display={"flex"}
          alignItems={"center"}
          sx={{
            width: "100%",
            borderRadius: "7px",
            padding: "0.4rem",
            cursor: "pointer",
            backgroundColor: user.isSelected ? "#ecebeb" : "",
          }}
          onClick={() => onSelectUser(user)}
        >
          <Avatar alt="Remy Sharp" />
          <div style={{ marginLeft: "10px" }}>
            <Typography>
              {user.lastName}, {user.firstName} {user.middleName ?? ""}
            </Typography>
            <Typography>{user.odc?.abbreviation ?? "-"}</Typography>
            <Typography>{user.careerStep}</Typography>
          </div>
        </Grid>
      </Grid>
    );
  };

  const onSelectUser = (selectedUser: Members) => {
    setUserList(
      userList.map((user) => {
        const newUser = user;
        if (newUser.id == selectedUser.id) {
          newUser.isSelected = !newUser.isSelected;
        }
        return newUser;
      })
    );
  };

  const onChangeOdc = (e: SelectChangeEvent<any>) => {
    const searchedOdc = e.target.value;
    setSearchOdc(searchedOdc);

    setUserList(filteredUserList(searchName, searchedOdc));
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const searchedName = e.target.value;
    setSearchName(searchedName);

    setUserList(filteredUserList(searchedName, searchOdc));
  };

  const filteredUserList = (
    searchedName: string,
    searchedOdc?: string
  ): Members[] => {
    return originUserList.filter((user) => {
      const name = user?.fullName
        .toLowerCase()
        .includes(searchedName.toLowerCase());
      const odc = user?.odc?.abbreviation
        .toLowerCase()
        .includes(searchedOdc?.toLowerCase() ?? "");

      return name && odc;
    });
  };

  const onSubmit = () => {
    let selectedUsers = userList.filter((user) => user.isSelected);

    if (!selectedUsers.length) {
      setErrorMessage("Select at least 1(one) user to proceed");

      return;
    }
    toggleDialog(selectedUsers);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result =
          listOfUsers && Array.isArray(listOfUsers?.data)
            ? listOfUsers.data
            : [];

        const newUsers = result
          .map((user) => {
            const fullName = `${user.lastName}, ${user.firstName} ${
              user.middleName ?? ""
            }`.trim();
            return { ...user, fullName, isSelected: false };
          })
          .filter((user) => user.id !== selectedTeamLead?.value);

        setUserList(newUsers);
        setOriginUserList(newUsers);

        if (listOfOdc) {
          setOdcList(
            listOfOdc.data.map((odc) => ({
              ...odc,
              value: odc.abbreviation,
              label: odc.abbreviation,
            }))
          );
        }
      } catch (error) {
        setUserList([]);
      }
    };

    fetchData().catch((e) => {
      console.log(e);
    });
  }, [listOfUsers, listOfOdc]);

  return (
    <>
      <Modal
        open={open}
        title="Search User"
        maxWidth={"lg"}
        onClose={() => toggleOpen(false)}
      >
        <Box sx={{ minWidth: "550px" }}>
          <Stack direction="column">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  name="name"
                  label="Name"
                  fullWidth
                  value={searchName}
                  onChange={onChangeName}
                />
              </Grid>
              <Grid item xs={6}>
                <Stack direction="column" gap={1}>
                  <Typography>ODC</Typography>
                  <Select
                    name="odc"
                    placeholder="ODC"
                    fullWidth
                    value={searchOdc}
                    onChange={onChangeOdc}
                    options={odcList}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Stack>
          <Divider sx={{ m: "10px 1rem 0" }} />

          <Stack direction={"row"} sx={{ p: "1rem" }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {userList.map((user, index) => renderUserList(user, index))}
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
              onClick={onSubmit}
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
