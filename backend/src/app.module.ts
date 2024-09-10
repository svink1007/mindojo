import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GoogleSheetService } from './google-sheet/google-sheet.service';
import { WaterFlowService } from './water-flow/water-flow.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [GoogleSheetService, WaterFlowService],
})
export class AppModule {}
