import { fetchGridData } from './gridAPI';

describe('gridAPI', () => {
  it('should fetch grid data correctly', async () => {
    const tab = 'Sheet1';
    const gridData = await fetchGridData(tab);

    expect(gridData).toEqual([
      [3, 1, 2, 4],
      [3, 1, 3, 4],
      [4, 2, 1, 3],
      [4, 2, 3, 2]
    ]);
  });
});
