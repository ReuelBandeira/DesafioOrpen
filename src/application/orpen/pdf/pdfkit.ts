
import PDFDocument from 'pdfkit-table';

interface TableArray {
  title: string;
  headers: string[];
  rows: string[][];
}

export function buildPDF(
  teste: string,
  data: any[], // Assuming results is an array of objects
  dataCallback: (chunk: any) => void,
  endCallback: () => void
) {
  const doc: any = new PDFDocument();

  // console.log(teste)
  // console.log(data)

  doc.on('data', dataCallback);
  doc.on('end', endCallback);

  const tableArray: TableArray = {
    title: 'Lista de Setup ',
    headers: ['CÓDIGO', 'POSTO', 'QUANTIDADE', 'DESCRIÇÃO', 'OBSERVAÇÃO'],
    rows: [
      ['378G0110567C08', 'TP01', '2', 'ALTO FALANTE  6 OHM 11W 132*34*35MM', 'OPC'],
      ['378G0110567C09', 'TP01', '2', 'ALTO FALANTE  6 OHM 11W 132*34*35MM', 'OPC'],
      ['378G0110567C10', 'TP01', '3', 'ALTO FALANTE  6 OHM 11W 132*34*35MM', 'OPC'],
    ],
  };

  // Posição final à direita na página A4
  const rightX = doc.page.width - 200; // ajuste a largura conforme necessário
  const bottomY = doc.page.height - 200; // ajuste a altura conforme necessário

  // Adiciona a imagem 'envision.png'
  doc.image('src/application/orpen/pdf/imagens/envision.png', {
    fit: [150, 150],
  });


  // Adiciona a imagem 'copiacontrolada.png' no final à direita
  doc.image('src/application/orpen/pdf/imagens/copiacontrolada.png', {
    fit: [200, 200],
    align: 'right',
    valign: 'bottom',
    x: rightX,
    y: bottomY,
  });

  // doc.table(tableArray, {
  //   width: 500,
  // }); pode chamar outra tabela junto

  doc.table(tableArray, {
    width: 500,
    prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10),
    // prepareRow: (row, i) => doc.font('Helvetica').fontSize(10),
    prepareRow: (row, indexColumn, indexRow, rectRow) => {
      doc.font("Helvetica").fontSize(8);
      indexColumn === 0 && doc.addBackground(rectRow, (indexRow % 2 ? 'blue' : 'blue'), 0.15);
    },
    border: [false, false, false, true], // Borda apenas na parte inferior
    borderColor: 'black', // Cor das bordas
    align: ['left', 'left', 'right', 'justify', 'left'], // Alinhamento justificado para a descrição
    layout: 'lightHorizontalLines', // Adiciona linhas horizontais leves
    wordBreak: true, // Permite a quebra de palavras
  });

  doc.end();
}
