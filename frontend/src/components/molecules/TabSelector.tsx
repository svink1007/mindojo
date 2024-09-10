// src/components/molecules/TabSelector.tsx

import React from 'react';
import { Tab } from '../../types';

interface TabSelectorProps {
  tabs: Tab[];
  onTabSelect: (tab: string) => void;
  selectedTab: string;
}

const TabSelector: React.FC<TabSelectorProps> = ({ tabs, onTabSelect, selectedTab }) => (
  <div className="tabs">
    {tabs.map(tab => (
      <button
        key={tab.id}
        onClick={() => onTabSelect(tab.name)}
        className={`tab ${tab.name === selectedTab ? 'active' : ''}`}
      >
        {tab.name}
      </button>
    ))}
  </div>
);

export default TabSelector;
