import type { ShareFormValues } from "../../types";

export const timeTypeOptions: SelectObject[] = [
  {
  label: 'Minutes',
  value: "minutes",
  },
  {
    label: 'Hours',
    value: "hours",
  },
  {
    label: 'Days',
    value: "days",
  },
]

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
  if (values?.shareBy !== 'noExpiration') {
    if (!+values?.shareBy) {
      switch (values?.timeType) {
        case 'minutes':
        return +values?.expiredIn / 60;
        case 'hours': 
        return +values?.expiredIn;
        case 'days':
        return +values?.expiredIn * 24;
      }
    } 
    return +values?.shareBy
  }
}