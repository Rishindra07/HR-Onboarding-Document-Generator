import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Use a valid model ID here (e.g., gemini-2.5-flash)
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export const generateMergedContent = async ({ employeeName, employeeEmail, clauses }) => {
  const systemPrompt = `
You are an expert HR document writer creating professional onboarding documents.

FORMATTING RULES:
- Use ### for main headings (Title, Key Information, etc.)
- Use ## for sub-headings (Working Hours, Leave Policy, etc.)
- Use * for bullet points
- Use ** for bold text (for emphasis like "Important:", "Note:")
- Keep paragraphs short and readable
- Use proper spacing and indentation
- NO markdown symbols in the output except as specified above
- Professional tone throughout
- Include the employee name naturally in the document
- Ensure proper line breaks between sections

STRUCTURE:
1. Welcome heading with employee name
2. Brief introduction paragraph
3. Key sections with sub-headings
4. Conclusion with contact information

Generate a complete, ready-to-use onboarding document.
  `.trim();

  const clausesText = clauses
    .map(c => `## ${c.title}\n${c.body}`)
    .join("\n\n");

  const userPrompt = `
Create a professional onboarding document for:
Name: ${employeeName}
Email: ${employeeEmail}

Include these sections in the document:

${clausesText}

Make it look like a real onboarding PDF with:
- Professional main heading
- Welcome message
- Clear section headings and sub-headings
- Bullet points where appropriate
- Proper spacing and alignment
- Professional closing

Do NOT include any markdown code blocks, JSON, or comments. Output ONLY the formatted text.
  `.trim();

  const prompt = `${systemPrompt}\n\n${userPrompt}`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};
