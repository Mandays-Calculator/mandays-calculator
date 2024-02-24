import type { ShareFormValues } from "../estimation-details/types";

export const timeTypeOptions: SelectObject[] = [
  {
    label: "Minutes",
    value: "minutes",
  },
  {
    label: "Hours",
    value: "hours",
  },
  {
    label: "Days",
    value: "days",
  },
];

export const expiryOptions: SelectObject[] = [
  {
    label: "12 hours",
    value: "12",
  },
  {
    label: "24 hours",
    value: "24",
  },
  {
    label: "48 hours",
    value: "48",
  },
  {
    label: "Custom",
    value: "custom",
  },
  {
    label: "No Expiration",
    value: "noExpiration",
  },
];

export const hrsNo = (values: ShareFormValues): number | undefined => {
  if (values?.shareBy !== "noExpiration") {
    if (!+values?.shareBy) {
      switch (values?.timeType) {
        case "minutes":
          return +values?.expiredIn / 60;
        case "hours":
          return +values?.expiredIn;
        case "days":
          return +values?.expiredIn * 24;
      }
    }
    return +values?.shareBy;
  }
};

export const convertToSeconds = (
  value: number | string,
  unit: string,
): number => {
  switch (unit.toLowerCase()) {
    case "hours":
      return Number(value) * 3600;
    case "minutes":
      return Number(value) * 60;
    case "seconds":
      return Number(value);
    case "days":
      return Number(value) * 24 * 3600;
    default:
      throw new Error(
        "Invalid unit. Please use 'hours', 'minutes', or 'seconds'.",
      );
  }
};

export const validateEstimationExpiryLink = (
  createdDate: number,
  expirationInSec: number,
): boolean => {
  const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
  const expirationTimestamp = createdDate / 1000 + expirationInSec;
  const expiryDateTime = new Date(expirationTimestamp * 1000);
  console.log(expiryDateTime, "expiry");
  const isValid = currentTimestampInSeconds <= expirationTimestamp;
  return isValid;
};
