import type { ReactElement } from "react";

import { useState, SyntheticEvent, ChangeEvent } from "react";

import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  OutlinedInput,
  Stack,
  Tabs,
  Typography,
} from "@mui/material";

import { CustomButton } from "~/components/form/button";
import Modal from "~/components/modal/Modal";
import { SvgIcon } from "~/components";

import {
  BulkUploadWrapper,
  CustomTab,
  CustomTabPanel,
  CustomUploadFile,
  RequirementContainer,
} from "./styles";

interface BulkModalProps {
  onBulkConfirm: () => void;
  open: boolean;
  onClose: () => void;
  message?: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export const BulkUserModal: React.FC<BulkModalProps> = ({
  onBulkConfirm,
  open,
  onClose,
}): ReactElement => {
  const [status, setStatus] = useState("ready");
  const [value, setValue] = useState(0);
  const [placeholder, setPlaceholder] = useState("Files to be upload");

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const fileHandleChange = (event: ChangeEvent) => {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const fileName = input.files[0].name;
    console.log("fileName", fileName);
    setPlaceholder(fileName);
  };

  const handleClose = () => {
    setStatus("ready");
    setValue(0);
    setPlaceholder("Files to be upload");
    onClose();
  };

  return (
    <Modal
      open={open}
      title="Bulk User Upload"
      maxWidth="sm"
      onClose={handleClose}
    >
      <BulkUploadWrapper>
        {status === "ready" ? (
          <>
            <Stack
              direction="row"
              alignItems="left"
              justifyContent="left"
              spacing={2}
            >
              <p>
                Before proceeding, kindly ensure that the file to upload meet
                the following requirements:
              </p>
            </Stack>

            <RequirementContainer container>
              <Grid item xs={12}>
                <ul>
                  <li>File Formats: .xls, .xlsx, .csv, .json</li>
                  <li>Each object should have the following fields:</li>
                </ul>
              </Grid>
              <Grid item xs={6}>
                <ul>
                  <li>MANDATORY</li>
                  <li>LastName</li>
                  <li>FirstName</li>
                  <li>Gender</li>
                  <li>Email</li>
                  <li>Joining Date</li>
                  <li>Career Step</li>
                  <li>Roles (separated by commas)</li>
                  <li>ODC</li>
                </ul>
              </Grid>
              <Grid item xs={6}>
                <ul>
                  <li>OPTIONAL</li>
                  <li>Prefix</li>
                  <li>Suffix</li>
                </ul>
              </Grid>
            </RequirementContainer>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Update existing records"
              />
            </FormGroup>
            <FormGroup>
              <CustomUploadFile variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-password"
                  type="file"
                  startAdornment={<span>{placeholder}</span>}
                  endAdornment={
                    <SvgIcon name="upload" $size={2} color="primary" />
                  }
                  onChange={fileHandleChange}
                />
              </CustomUploadFile>
            </FormGroup>

            <Box display="flex" justifyContent="end" my={2}>
              <CustomButton
                variant="contained"
                colorVariant="neutral"
                onClick={handleClose}
                style={{ marginRight: 16 }}
              >
                Cancel
              </CustomButton>
              <CustomButton
                variant="contained"
                color="primary"
                onClick={() => {
                  setStatus("success");
                }}
              >
                Upload
              </CustomButton>
            </Box>
          </>
        ) : (
          <>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <CustomTab label="Summary" {...a11yProps(0)} />
              <CustomTab label="Added" {...a11yProps(1)} />
              <CustomTab label="Update" {...a11yProps(2)} />
              <CustomTab label="Failed" {...a11yProps(3)} />
            </Tabs>

            <CustomTabPanel value={value} index={0}>
              <span>100 out of 110 records successfully synched</span>
              <ul>
                <li>80 users were added to the database</li>
                <li>20 user profiles were updated</li>
              </ul>
              <span>10 out of 110 records failed to be processed.</span>
              <span>Process completed after 1000ms</span>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
              <span>80 users were added to the database</span>
              <span>Process completed after 1000ms</span>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={2}>
              <span>20 user profiles were updated</span>
              <span>Process completed after 1000ms</span>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={3}>
              <span>10 out of 110 records failed to be processed.</span>
              <span>Process completed after 1000ms</span>
            </CustomTabPanel>

            <Box display="flex" justifyContent="end" my={2}>
              <CustomButton
                variant="contained"
                color="primary"
                onClick={() => {
                  onBulkConfirm();
                  handleClose();
                }}
              >
                Done
              </CustomButton>
            </Box>
          </>
        )}
      </BulkUploadWrapper>
    </Modal>
  );
};

export default BulkUserModal;
