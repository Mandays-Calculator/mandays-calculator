import {
  type ReactElement,
  type Dispatch,
  type SetStateAction,
  useState,
} from "react";
import type { IntValues } from "../utils/interface";

import { useTranslation } from "react-i18next";

import { Grid, Box } from "@mui/material";
import { useFormikContext } from "formik";

import { PageContainer } from "~/components/page-container";
import { CustomButton } from "~/components/form/button";
import { Table } from "~/components";
import { ControlledTextField } from "~/components/form/controlled";

import { HolidayColumn } from "../utils/columns";
import { InitialODCValues, HolidayData } from "../utils/data";

type AddProps = {
  setAddODC: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean;
  idx: number;
};

const AddODC = (props: AddProps): ReactElement => {
  const { t } = useTranslation();
  const { idx, isEdit, setAddODC } = props;

  const { values, resetForm } = useFormikContext<IntValues>();
  const formikContext = useFormikContext<IntValues>();

  const handleClose = () => {
    if (isEdit) {
      const obj: IntValues = values;
      obj.odcList[idx] = InitialODCValues.odcList[idx];
      resetForm({ values: obj });
    } else {
      resetForm();
    }
    setAddODC(false);
  };

  const [fieldValues, setFieldValues] = useState({
    odcName: isEdit ? values.odcList[idx].odcName : "",
    abbreviation: isEdit ? values.odcList[idx].abbreviation : "",
    location: isEdit ? values.odcList[idx].location : "",
  });

  const handleFieldChange = (fieldName: string, value: string) => {
    setFieldValues({ ...fieldValues, [fieldName]: value });
  };

  const handleAddODC = () => {
    const updatedValues = { ...values };
    const newODC = {
      odcName: fieldValues.odcName,
      abbreviation: fieldValues.abbreviation,
      location: fieldValues.location,
      noHolidays: 0,
    };

    updatedValues.odcList = [...updatedValues.odcList, newODC];
    formikContext.setValues(updatedValues);
    setAddODC(false);
  };

  return (
    <>
      <PageContainer sx={{ background: "#FFFFFF" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <ControlledTextField
              name={`odcList.${idx}.odcName`}
              label={t("odc.form.odcName")}
              id="odcName"
              value={fieldValues.odcName}
              onChange={(event) =>
                handleFieldChange("odcName", event.target.value)
              }
            />
          </Grid>
          <Grid item xs={6}>
            <ControlledTextField
              name={`odcList.${idx}.abbreviation`}
              label={t("odc.form.abbr")}
              id="abbreviation"
              value={fieldValues.abbreviation}
              onChange={(event) =>
                handleFieldChange("abbreviation", event.target.value)
              }
            />
          </Grid>
          <Grid item xs={6}>
            <ControlledTextField
              name={`odcList.${idx}.location`}
              label={t("odc.form.loc")}
              id="location"
              value={fieldValues.location}
              onChange={(event) =>
                handleFieldChange("location", event.target.value)
              }
            />
          </Grid>
        </Grid>

        <Box marginTop="14px">
          <Table
            name="HolidayTable"
            columns={HolidayColumn}
            data={HolidayData}
          />
        </Box>

        <Grid container spacing={2} alignItems="center" mt={1}>
          <Grid item xs={12} container justifyContent="flex-end">
            {isEdit ? (
              <>
                <CustomButton
                  type="button"
                  sx={{ mr: 2 }}
                  onClick={() => setAddODC(false)}
                >
                  Save
                </CustomButton>
                <CustomButton type="button" onClick={handleClose}>
                  Cancel
                </CustomButton>
              </>
            ) : (
              <CustomButton type="button" onClick={handleAddODC}>
                Add ODC
              </CustomButton>
            )}
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
};

export default AddODC;
