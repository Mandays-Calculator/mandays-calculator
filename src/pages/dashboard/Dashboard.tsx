import { NotificationModal } from "~/components";
import { ErrorMessage } from "~/components";

function Dashboard() {
  return (
    <>
      <div>Dashboard</div>
      <NotificationModal type="error" open={true} />
      <ErrorMessage error={"error"} type="alert" />
    </>
  );
}

export default Dashboard;
