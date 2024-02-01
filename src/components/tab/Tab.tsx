import type { CustomTabsProps } from ".";
import { useState, ReactElement, SyntheticEvent, useEffect } from "react";

import { Divider } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

/* *
  Sample usage of Tabs:
  <CustomTab
      defaultActiveTab={1}
      tabs={[
        {
          label: "Test 1",
          content: <h1>Tab 1</h1>,
        },
        {
          label: "Test 2",
          content: <h1>Tab 2</h1>,
        },
      ]}
    />
  *
*/

const CustomTabs = ({
  defaultActiveTab = 0,
  onTabChange,
  tabs,
}: CustomTabsProps): ReactElement => {
  const [value, setValue] = useState<number>(defaultActiveTab);

  const handleChange = (event: SyntheticEvent, newValue: number): void => {
    setValue(newValue);
    if (onTabChange) {
      onTabChange(event, newValue);
    }
  };

  useEffect(() => {
    setValue(defaultActiveTab);
  }, [defaultActiveTab]);

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="custom tabs"
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          "& .MuiTabs-flexContainer": {
            justifyContent: "space-between",
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            label={tab.label}
            key={index}
            value={index}
            sx={{ justifyContent: "center", minWidth: 220 }}
          />
        ))}
      </Tabs>
      <Divider sx={{ borderWidth: 2 }} />
      {tabs.map((tab, index) =>
        value === index ? (
          <Box key={index} py={3} id={`tab-${index}`}>
            {tab.content}
          </Box>
        ) : null,
      )}
    </Box>
  );
};

export default CustomTabs;
