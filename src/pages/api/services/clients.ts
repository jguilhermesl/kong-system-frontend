import { GoogleSheetsDAO } from '../../../services/googleSheetsDAO';

const spreadsheetId = '1h3g41fvcJQUH4WEjjizqDC2pzCuGYgwrGG4APlmm9Ls'; // ID da planilha
const dao = new GoogleSheetsDAO(spreadsheetId);

export async function getClients(sheetName: string, range: string) {
  return await dao.readData(sheetName, range);
}

export async function createClient(sheetName: string, range: string, data: any[][]) {
  await dao.createData(sheetName, range, data);
}

export async function updateClient(sheetName: string, range: string, data: any[][]) {
  await dao.updateData(sheetName, range, data);
}

export async function deleteClient(sheetName: string, range: string) {
  await dao.deleteData(sheetName, range);
}
