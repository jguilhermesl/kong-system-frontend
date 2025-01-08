import { google } from 'googleapis';
import { readFileSync } from 'fs';
import path from 'path';

const keyFilePath = path.join(process.cwd(), 'google-sheet-key.json');
const credentials = JSON.parse(readFileSync(keyFilePath, 'utf8'));

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export class GoogleSheetsDAO {
  private spreadsheetId: string;

  constructor(spreadsheetId: string) {
    this.spreadsheetId = spreadsheetId;
  }

  async readData(sheetName: string, range: string) {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: `${sheetName}!${range}`,
    });
    return response.data.values || [];
  }

  async createData(sheetName: string, range: string, values: any[][]) {
    await sheets.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: `${sheetName}!${range}`,
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });
  }

  async updateData(sheetName: string, range: string, values: any[][]) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      range: `${sheetName}!${range}`,
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });
  }

  async deleteData(sheetName: string, range: string) {
    await sheets.spreadsheets.values.clear({
      spreadsheetId: this.spreadsheetId,
      range: `${sheetName}!${range}`,
    });
  }
}
