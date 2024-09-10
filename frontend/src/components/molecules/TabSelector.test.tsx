import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TabSelector from './TabSelector';

describe('TabSelector', () => {
  it('should render tabs and handle tab selection', () => {
    const tabs = [{ id: 'tab1', name: 'Tab 1' }, { id: 'tab2', name: 'Tab 2' }];
    const handleTabSelect = jest.fn();
    const { getByText } = render(
      <TabSelector tabs={tabs} onTabSelect={handleTabSelect} selectedTab="Tab 1" />
    );

    fireEvent.click(getByText('Tab 1'));
    expect(handleTabSelect).toHaveBeenCalledWith('Tab 1');
  });
});
