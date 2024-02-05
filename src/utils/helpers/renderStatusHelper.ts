import { Status } from "~/api/common";

function renderStatus(role: Status): string {
  switch (role) {
    case "COMPLETED":
      return "Completed";
    case "ON_GOING":
      return "On-going";
    default:
      return "In progress";
  }
}

export default renderStatus;
