import { Test, TestingModule } from '@nestjs/testing';
import { GoogleSheetService } from './google-sheet.service';
import { google } from 'googleapis';

jest.mock('googleapis', () => ({
  google: {
    sheets: jest.fn().mockReturnValue({
      spreadsheets: {
        get: jest.fn().mockResolvedValue({
          data: { sheets: [{ properties: { title: 'Sheet1' } }] },
        }),
        values: {
          get: jest.fn().mockResolvedValue({
            data: { values: [[1, 2], [3, 4]] },
          }),
        },
      },
    }),
  },
}));

describe('GoogleSheetService', () => {
  let service: GoogleSheetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleSheetService],
    }).compile();

    service = module.get<GoogleSheetService>(GoogleSheetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get tabs from the spreadsheet', async () => {
    const tabs = await service.getTabs();
    expect(tabs).toEqual(['Sheet1']);
  });

  it('should get grid data from the spreadsheet', async () => {
    const gridData = await service.getGridData('Sheet1');
    expect(gridData).toEqual([[1, 2], [3, 4]]);
  });
});
