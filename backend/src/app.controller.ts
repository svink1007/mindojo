import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { GoogleSheetService } from './google-sheet/google-sheet.service';
import { WaterFlowService } from './water-flow/water-flow.service';

@Controller()
export class AppController {
  constructor(
    private readonly googleSheetService: GoogleSheetService,
    private readonly waterFlowService: WaterFlowService
  ) {}

  @Get('get-tabs')
  async getTabs() {
    return await this.googleSheetService.getTabs();
  }

  @Post('calculate-flow')
  async calculateFlow(@Body() body: { tab: string }) {
    const grid = await this.googleSheetService.getGridData(body.tab);
    const result = this.waterFlowService.calculateWaterFlow(grid);
    return result;
  }
}
