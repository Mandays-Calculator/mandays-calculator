import type { ReactElement } from "react";
import Title from "~/components/title/Title";
import { PageContainer } from "~/components/page-container";

const ProjectManagement = (): ReactElement => {
  return (
    <>
      <Title title="Project Management" />
      <PageContainer>
        <p>test</p>
      </PageContainer>
    </>
  );
};

export default ProjectManagement;
