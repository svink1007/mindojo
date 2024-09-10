import React, { useState, useEffect } from "react";
import MainPageTemplate from "../templates/MainPageTemplate";
import { fetchTabs, calculateFlow } from "../../api/sheetAPI";
import { Tab, FlowResult } from "../../types";

const HomePage: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [result, setResult] = useState<FlowResult | null>(null);

  useEffect(() => {
    fetchTabs().then((data) => {
      setTabs(
        data.map((item, index) => {
          return { id: item + index, name: item };
        })
      );
    });
  }, []);

  const handleTabSelect = async (tab: string) => {
    setSelectedTab(tab);
    const data = await calculateFlow(tab);
    setResult(data);
  };

  return (
    <div className="app-container">
      <header className="header">
        Island Water Flow Analysis
      </header>
      <MainPageTemplate
        tabs={tabs}
        onTabSelect={handleTabSelect}
        selectedTab={selectedTab}
        result={result!} // using non-null assertion here, handle with caution
      />
    </div>
  );
};

export default HomePage;
