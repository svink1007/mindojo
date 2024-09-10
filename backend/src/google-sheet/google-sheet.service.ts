import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class GoogleSheetService {
  private sheets;
  private spreadsheetId = process.env.GOOGLE_SHEET_ID;

  constructor() {
    this.sheets = google.sheets({
      version: 'v4',
      auth: process.env.GOOGLE_API_KEY,
    });
  }

  async getTabs() {
    const res = await this.sheets.spreadsheets.get({
      spreadsheetId: this.spreadsheetId,
    });
    const sheets = res.data.sheets.map((sheet) => sheet.properties.title);
    return sheets;
  }

  async getGridData(sheetName: string) {
    const res = await this.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: sheetName,
    });
    return res.data.values;
  }
}
