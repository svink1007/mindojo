import React from 'react';
import { render } from '@testing-library/react';
import MainPageTemplate from './MainPageTemplate';
import { Tab, FlowResult } from '../../types';

describe('MainPageTemplate', () => {
  it('should render the TabSelector and GridDisplay components', () => {
    // Mock data for tabs
    const tabs: Tab[] = [
      { id: 'tab1', name: 'Tab 1' },
      { id: 'tab2', name: 'Tab 2' }
    ];

    // Mock flow result, ensure coordinates are typed as [number, number][]
    const result: FlowResult = {
      count: 2,
      coordinates: [
        [0, 1], 
        [1, 2]
      ] as [number, number][],  // This ensures it's a tuple type
      grid: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ]
    };

    const handleTabSelect = jest.fn();

    const { getByText } = render(
      <MainPageTemplate
        tabs={tabs}
        onTabSelect={handleTabSelect}
        selectedTab="Tab 1"
        result={result}
      />
    );

    // Check that the tabs are rendered
    expect(getByText('Tab 1')).toBeInTheDocument();
    expect(getByText('Tab 2')).toBeInTheDocument();

    // Check if grid cells are rendered and highlighted
    const gridCell1 = getByText('2'); // Cell in coordinates [0, 1]
    const gridCell2 = getByText('6'); // Cell in coordinates [1, 2]

    expect(gridCell1).toHaveClass('in-flow');
    expect(gridCell2).toHaveClass('in-flow');
  });
});
