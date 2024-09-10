import React from 'react';
import { render, waitFor } from '@testing-library/react';
import HomePage from './HomePage';
import * as sheetAPI from '../../api/sheetAPI';

jest.mock('../../api/sheetAPI');  // Mock the entire sheetAPI module

describe('HomePage', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should render tabs and grid when flow data is fetched', async () => {
    // Mock the fetchTabs and calculateFlow functions
    (sheetAPI.fetchTabs as jest.Mock).mockResolvedValue(['Sheet1', 'Sheet2']);
    (sheetAPI.calculateFlow as jest.Mock).mockResolvedValue({
      count: 2,
      coordinates: [
        [0, 1], 
        [1, 2]
      ] as [number, number][],
      grid: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
    });

    const { getByText } = render(<HomePage />);

    // Wait for the component to fetch tabs and render them
    await waitFor(() => {
      expect(getByText('Sheet1')).toBeInTheDocument();
      expect(getByText('Sheet2')).toBeInTheDocument();
    });
  });
});
