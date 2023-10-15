import type { ReactElement } from "react";
import { SvgIcon } from "~/components";
import Title from "~/components/title/Title";
import { PageContainer } from "~/components/page-container";

const ProjectManagement = (): ReactElement => {
  return (
    <>
      <Title title="Project Management" />
      <SvgIcon name="settings" $size={4} color="primary" />
      <PageContainer>
        <p>test</p>
      </PageContainer>
    </>
  );
};

export default ProjectManagement;
