import type { PropsWithChildren, ReactElement } from "react";
import type { FormikInstance } from "formik";
import { FormikProvider } from "formik";
interface FormProps<FormValues extends object> extends PropsWithChildren {
  instance: FormikInstance<FormValues>;
}

export const Form = <FormValues extends object>(props: FormProps<FormValues>): ReactElement => {
  const { instance, children, ...rest } = props;
  return (
    <FormikProvider value={instance}>
      <form
        {...rest}
        onSubmit={instance.handleSubmit}
      >
        {children}
      </form>
    </FormikProvider>
  );
};

export default Form;
