import type { ReactElement, Dispatch, SetStateAction } from "react";
import type { HolidayType } from "~/api/odc";
import type { IntValues } from "../utils/interface";

import { useTranslation } from "react-i18next";

import { Grid, Box } from "@mui/material";
import { useFormikContext } from "formik";

import { PageContainer } from "~/components/page-container";
import { CustomButton } from "~/components/form/button";
import { Table } from "~/components";
import { ControlledTextField } from "~/components/form/controlled";

import { HolidayColumn } from "../utils/columns";

type AddProps = {
  setIsAdd: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean;
  idx: number;
};

const AddODC = (props: AddProps): ReactElement => {
  const { t } = useTranslation();
  const { idx, isEdit, setIsAdd } = props;

  const { values, resetForm } = useFormikContext<IntValues>();
  const holidays: HolidayType[] = values?.odcList[idx]?.holidays || [];

  const handleClose = () => {
    resetForm();
    setIsAdd(false);
  };

  return (
    <>
      <PageContainer sx={{ background: "#FFFFFF" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <ControlledTextField
              name={`odcList.${idx}.name`}
              label={t("odc.form.odcName")}
              id="name"
            />
          </Grid>
          <Grid item xs={6}>
            <ControlledTextField
              name={`odcList.${idx}.abbreviation`}
              label={t("odc.form.abbr")}
              id="abbreviation"
            />
          </Grid>
          <Grid item xs={12}>
            <ControlledTextField
              name={`odcList.${idx}.location`}
              label={t("odc.form.loc")}
              id="location"
            />
          </Grid>
        </Grid>

        <Box margin="14px 0px">
          <Table name="HolidayTable" columns={HolidayColumn} data={isEdit ? holidays : []} />
          <Grid container spacing={2} alignItems="center"mt={1}>
            <Grid item xs={12} container justifyContent="flex-end">
              {isEdit ? (
                <>
                  <CustomButton
                    type="button"
                    sx={{ mr: 2 }}
                    onClick={() => setIsAdd(false)}
                  >{t('odc.button.save')}</CustomButton>
                  <CustomButton type="button" onClick={handleClose}>{t('odc.button.cancel')}</CustomButton>
                </>
              ) : (
                <CustomButton type="button" onClick={() => setIsAdd(false)}>{t('odc.button.add')}</CustomButton>
              )}
            </Grid>
          </Grid>
        </Box>
      </PageContainer>
    </>
  );
};

export default AddODC;
