import { ReactElement } from "react";

interface EstimationProps {
  mode: EstimationDetailsMode;
}
const Estimation = (props: EstimationProps): ReactElement => {
  const { mode } = props;
  return <div>{mode}</div>;
};

export default Estimation;
