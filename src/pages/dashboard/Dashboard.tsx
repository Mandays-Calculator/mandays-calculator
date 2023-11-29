import Steppers from "~/components/stepper/Stepper";

function Dashboard() {
  return (
    <div>
      <Steppers
        activeStep={0}
        steps={[
          {
            label: "Summary",
            icon: "mandays_estimation_tool",
            content: <>Miss u</>,
          },
          {
            label: "Resource",
            icon: "mandays_estimation_tool",
            content: <>Test</>,
          },
        ]}
      />
    </div>
  );
}

export default Dashboard;
