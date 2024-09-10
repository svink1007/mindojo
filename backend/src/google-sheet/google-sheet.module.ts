import { Module } from '@nestjs/common';
import { GoogleSheetService } from './google-sheet.service';

@Module({
  providers: [GoogleSheetService],
  exports: [GoogleSheetService], // Allow other modules to use this service
})
export class GoogleSheetModule {}
