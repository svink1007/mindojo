import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { GoogleSheetService } from './google-sheet/google-sheet.service';
import { WaterFlowService } from './water-flow/water-flow.service';

describe('AppController', () => {
  let appController: AppController;
  let googleSheetService: GoogleSheetService;
  let waterFlowService: WaterFlowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: GoogleSheetService,
          useValue: {
            getTabs: jest.fn().mockResolvedValue(['Sheet1']),
            getGridData: jest.fn().mockResolvedValue([[1, 2], [3, 4]]),
          },
        },
        {
          provide: WaterFlowService,
          useValue: {
            calculateWaterFlow: jest.fn().mockReturnValue({
              count: 2,
              coordinates: [[0, 1], [1, 2]],
              grid: [[1, 2], [3, 4]],
            }),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    googleSheetService = module.get<GoogleSheetService>(GoogleSheetService);
    waterFlowService = module.get<WaterFlowService>(WaterFlowService);
  });

  it('should return spreadsheet tabs', async () => {
    const tabs = await appController.getTabs();
    expect(tabs).toEqual(['Sheet1']);
  });

  it('should calculate water flow based on the grid', async () => {
    const result = await appController.calculateFlow({ tab: 'Sheet1' });
    expect(result.count).toBe(2);
    expect(result.coordinates).toEqual([[0, 1], [1, 2]]);
  });
});
