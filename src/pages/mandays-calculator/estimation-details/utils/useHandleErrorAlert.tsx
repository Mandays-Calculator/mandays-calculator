import type { MandaysForm } from "..";
import { useFormikContext } from "formik";
import { ReactNode, useEffect, useState } from "react";
import { Alert, ErrorMessage } from "~/components";

import { useTimeout } from "~/hooks/timeout";
import { isUndefined } from "lodash";

/**
 * Custom hook for handling resource-related error alerts based on Formik context.
 * Monitors changes in Formik errors and displays corresponding error alerts for a specific key.
 * Utilizes a timeout to clear the error alert after a brief period.
 * @param {string} key - The key indicating the specific section of MandaysForm errors to monitor.
 * @returns {ReactNode} - ReactNode representing the error alert component.
 */
export const useResourceErrorAlert = (
  key: "summary" | "resources" | "legends" | "tasks" | "phases",
): ReactNode => {
  const [timeout] = useTimeout();
  const { errors, isValidating } = useFormikContext<MandaysForm>();

  const [IsError, setIsError] = useState<boolean>(false);
  useEffect(() => {
    if (errors[key] && typeof errors[key] === "string") {
      setIsError(true);
    } else if (typeof errors[key] === "object") {
      setIsError(false);
    }
    timeout(() => setIsError(false));
  }, [isValidating, errors[key]]);

  const getError = (): string | undefined => {
    if (errors[key]) {
      if (typeof errors[key] === "string") {
        return errors[key] as string;
      }
    }
  };

  return (
    <>
      {IsError && !isUndefined(getError()) && (
        <Alert open={true} type="error" message={getError()} />
      )}
    </>
  );
};

export const renderErrorResource = (error: string | undefined): ReactNode => {
  if (typeof error !== "object" && typeof error === "string") {
    return <ErrorMessage type="field" error={error} />;
  }
  return <></>;
};
