import type { ReactElement } from "react";

import AddEstimation from "./add-estimation";
import SummaryContent from "./summary-content";

import { inputView } from "../utils/constants";

interface SummaryProps {
  mode: EstimationDetailsMode;
}

const Summary = (props: SummaryProps): ReactElement => {
  const { mode } = props;

  const isInput = inputView.includes(mode);
  return isInput ? <AddEstimation /> : <SummaryContent type="view" />;
};

export default Summary;
