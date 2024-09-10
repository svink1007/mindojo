import { Test, TestingModule } from '@nestjs/testing';
import { WaterFlowService } from './water-flow.service';

describe('WaterFlowService', () => {
  let service: WaterFlowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaterFlowService],
    }).compile();

    service = module.get<WaterFlowService>(WaterFlowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate water flow correctly', () => {
    const grid = [
      [1, 2, 2],
      [2, 3, 3],
      [3, 4, 5],
    ];

    const result = service.calculateWaterFlow(grid);

    expect(result.count).toBeGreaterThan(0);
    expect(result.coordinates.length).toBe(result.count);
    expect(result.grid).toEqual(grid);
  });

  it('should return all the cells', () => {
    const grid = [
      [5, 5, 5],
      [5, 5, 5],
      [5, 5, 5],
    ];

    const result = service.calculateWaterFlow(grid);

    expect(result.count).toBe(9);
    expect(result.coordinates).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 2],
      [1, 1],
      [1, 0],
      [2, 0],
      [2, 1],
      [2, 2],
    ]);
    expect(result.grid).toEqual(grid);
  });
});
