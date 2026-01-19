import PDFDocument from "pdfkit";
import fs from "fs";

/**
 * Generates a PDF file from plain text content.
 * @param {String} content - The formatted text to write into the PDF
 * @param {String} filePath - The output file path e.g. "./generated/amit_12345.pdf"
 * @returns {Promise<void>}
 */
export const generatePDF = (content, filePath) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        margin: 50,
        size: "A4"
      });

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // Basic formatting
      doc.font("Times-Roman");
      doc.fontSize(12);

      // Split lines to avoid overflow
      const lines = content.split("\n");
      lines.forEach(line => {
        if (line.trim().length === 0) {
          doc.moveDown(1);  // blank line spacing
        } else {
          doc.text(line, { lineGap: 4 });
        }
      });

      doc.end();

      stream.on("finish", resolve);
      stream.on("error", reject);

    } catch (err) {
      reject(err);
    }
  });
};
