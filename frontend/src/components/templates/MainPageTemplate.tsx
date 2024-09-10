// src/components/templates/MainPageTemplate.tsx

import React from "react";
import TabSelector from "../molecules/TabSelector";
import GridDisplay from "../organisms/GridDisplay";
import { Tab, FlowResult } from "../../types";

interface MainPageTemplateProps {
  tabs: Tab[];
  onTabSelect: (tab: string) => void;
  selectedTab: string;
  result: FlowResult;
}

const MainPageTemplate: React.FC<MainPageTemplateProps> = ({
  tabs,
  onTabSelect,
  selectedTab,
  result,
}) => (
  <div>
    <TabSelector
      tabs={tabs}
      onTabSelect={onTabSelect}
      selectedTab={selectedTab}
    />
    {result && <GridDisplay result={result} />}
  </div>
);

export default MainPageTemplate;
