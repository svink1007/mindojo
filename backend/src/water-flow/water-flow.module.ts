import { Module } from '@nestjs/common';
import { WaterFlowService } from './water-flow.service';

@Module({
  providers: [WaterFlowService],
  exports: [WaterFlowService], // Allow other modules to use this service
})
export class WaterFlowModule {}
