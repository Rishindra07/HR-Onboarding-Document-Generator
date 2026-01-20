import PDFDocument from "pdfkit";
import fs from "fs";

/**
 * Generates a professional PDF file from formatted content.
 * @param {String} content - The formatted text to write into the PDF
 * @param {String} filePath - The output file path e.g. "./generated/amit_12345.pdf"
 * @returns {Promise<void>}
 */
export const generatePDF = (content, filePath) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        margin: 40,
        size: "A4"
      });

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // Set default font
      doc.font("Helvetica");

      // Process content with proper formatting
      const lines = content.split("\n");
      let currentY = doc.y;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmedLine = line.trim();

        if (trimmedLine.length === 0) {
          // Blank line
          doc.moveDown(0.5);
        } else if (trimmedLine.startsWith("###")) {
          // Main heading (size 18)
          const heading = trimmedLine.replace(/^###\s*/, "").trim();
          doc.fontSize(18);
          doc.font("Helvetica-Bold");
          doc.text(heading, { lineGap: 5 });
          doc.moveDown(0.3);
          doc.font("Helvetica");
          doc.fontSize(11);
        } else if (trimmedLine.startsWith("##")) {
          // Sub-heading (size 14)
          const subHeading = trimmedLine.replace(/^##\s*/, "").trim();
          doc.fontSize(14);
          doc.font("Helvetica-Bold");
          doc.text(subHeading, { lineGap: 4 });
          doc.moveDown(0.2);
          doc.font("Helvetica");
          doc.fontSize(11);
        } else if (trimmedLine.startsWith("*") || trimmedLine.startsWith("-")) {
          // Bullet point
          const bulletText = trimmedLine.replace(/^[\*\-]\s*/, "").trim();
          doc.fontSize(11);
          doc.font("Helvetica");
          doc.text("• " + bulletText, { 
            lineGap: 3,
            indent: 15
          });
        } else if (trimmedLine.startsWith("**") && trimmedLine.endsWith("**")) {
          // Bold text
          const boldText = trimmedLine.replace(/\*\*/g, "").trim();
          doc.fontSize(12);
          doc.font("Helvetica-Bold");
          doc.text(boldText, { lineGap: 4 });
          doc.moveDown(0.1);
        } else {
          // Regular paragraph text
          doc.fontSize(11);
          doc.font("Helvetica");
          doc.text(trimmedLine, { 
            lineGap: 4,
            width: 500,
            align: "justify"
          });
        }
      }

      doc.end();

      stream.on("finish", resolve);
      stream.on("error", reject);

    } catch (err) {
      reject(err);
    }
  });
};
