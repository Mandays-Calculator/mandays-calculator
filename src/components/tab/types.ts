import { ReactNode, SyntheticEvent } from "react";

export type TabProps = {
  label: ReactNode;
  content: ReactNode;
};

export type CustomTabsProps = {
  defaultActiveTab?: number;
  tabs: TabProps[];
  onTabChange?: (event: SyntheticEvent, newValue: number) => void;
};
