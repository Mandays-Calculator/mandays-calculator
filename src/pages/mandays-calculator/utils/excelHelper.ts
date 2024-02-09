import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { SummaryListColumns } from "./columns";
import { withTFunctionProps, SummaryListColumnsType } from "./types";
import { estimationDetailsData } from "./tableData";

interface SheetData {
  name: string;
  columns: ExcelJS.Column[];
  data: any[][];
}

/**
 * Creates an Excel file with specified sheets, columns, and data.
 * @param sheets Array of sheets with their respective columns and data.
 */
export async function createExcel(
  sheets: SheetData[],
  sprintName: string,
): Promise<void> {
  const now = new Date();
  const date = now.toLocaleDateString("en-CA").replaceAll("/", "-");
  const time = now.toLocaleTimeString("en-GB").replaceAll(":", "-");

  const fileName = `SPRINT_${sprintName}_details_${date}_${time}.xlsx`;

  const workbook = new ExcelJS.Workbook();
  sheets.forEach((sheet) => {
    const worksheet = workbook.addWorksheet(sheet.name);
    worksheet.columns = sheet.columns;

    sheet.data.forEach((row) => {
      worksheet.addRow(row);
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, fileName);
}

export const generateEstimationData = ({ t }: withTFunctionProps): any => {
  const smWidth = 10;

  // will reconstruct once the data has been integrated
  const sheets = [
    {
      name: "Summary",
      columns: SummaryListColumns({ t }).map(
        (column: SummaryListColumnsType) => ({
          header: column.Header,
          key: column.accessor,
          width: smWidth,
        }),
      ),
      data: estimationDetailsData,
    },
  ];

  return sheets;
};
