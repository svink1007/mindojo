import { fetchTabs, calculateFlow } from './sheetAPI';

global.fetch = jest.fn();

describe('sheetAPI', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should fetch tabs successfully', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify(['Sheet1', 'Sheet2']), { status: 200 })
    );

    const tabs = await fetchTabs();
    expect(tabs).toEqual(['Sheet1', 'Sheet2']);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/get-tabs');
  });

  it('should handle error when fetching tabs fails', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce(
      new Response(null, { status: 500 })
    );

    const tabs = await fetchTabs();
    expect(tabs).toEqual([]);
  });

  it('should calculate flow correctly', async () => {
    const flowResult = {
      count: 2,
      coordinates: [[0, 1], [1, 2]] as [number, number][],
      grid: [[1, 2], [3, 4]],
    };

    (fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify(flowResult), { status: 200 })
    );

    const result = await calculateFlow('Sheet1');
    expect(result).toEqual(flowResult);
  });

  it('should handle error when calculating flow fails', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce(
      new Response(null, { status: 500 })
    );

    const result = await calculateFlow('Sheet1');
    expect(result).toEqual({ count: 0, coordinates: [], grid: [] });
  });
});
