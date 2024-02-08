import PDFDocument from "pdfkit-table";

interface TableArray {
  title: string;
  headers: string[];
  rows: string[][];
}

export function buildPDF(dataCallback: (chunk: any) => void, endCallback: () => void) {

  const doc: any = new PDFDocument();

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  const tableArray: TableArray = {
    title: "Lista de Setup",
    headers: [ "CÓDIGO", "POSTO", "QUANTIDADE","DESCRIÇÃO","OBSERVAÇÃO" ],
    rows: [
      [ "378G0110567C08", "TP01", "2","ALTO FALANTE  6 OHM 11W 132*34*35MM","OPC"],
      [ "378G0110567C09", "TP01", "2","ALTO FALANTE  6 OHM 11W 132*34*35MM","OPC"],
      [ "378G0110567C10", "TP01", "3","ALTO FALANTE  6 OHM 11W 132*34*35MM","OPC"],
    ],
  };

  doc.table(tableArray, {
    width: 500,
  });

  doc.end();
}
