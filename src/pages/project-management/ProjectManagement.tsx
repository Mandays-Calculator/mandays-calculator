import type { ReactElement } from "react";
import { SvgIcon } from "~/components";
import Title from "~/components/title/Title";

const ProjectManagement = (): ReactElement => {
  return (
    <>
      <Title title="Project Management" />
      <SvgIcon
        name="settings"
        $size={4}
        color="primary"
      />
    </>
  );
};

export default ProjectManagement;
