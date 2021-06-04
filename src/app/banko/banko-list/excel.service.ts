import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(json1: any, json2: any, length , excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([{A: ''}, json1], { skipHeader: true});
    let k = 3;

    XLSX.utils.sheet_add_json(worksheet, [{A: 'NO'}], {skipHeader: true, origin: `A2`});
    for (let i = 1; i <= length; i++) {
    XLSX.utils.sheet_add_json(worksheet, [{A: `col${i}`}], {skipHeader: true, origin: `A${k}`});
    XLSX.utils.sheet_add_json(worksheet, [json2[`col${i}`]], {skipHeader: true, origin: `B${k}`});
    k++;
    }

    console.log(json2);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
