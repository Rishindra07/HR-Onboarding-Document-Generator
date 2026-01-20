import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Use a valid model ID here (e.g., gemini-2.5-flash)
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export const generateMergedContent = async ({ employeeName, employeeEmail, clauses }) => {
  const systemPrompt = `
You are an expert HR document writer. Format onboarding documents professionally with:
- Clear headings
- Sub-headings
- Bulleted lists (if needed)
- No hallucinations
- Include employee name where meaningful
- Do not include markup or JSON, only plain formatted text
  `.trim();

  const clausesText = clauses
    .map(c => `### ${c.title.toUpperCase()}\n${c.body}`)
    .join("\n\n");

  const userPrompt = `
Create an onboarding document for employee:

Name: ${employeeName}
Email: ${employeeEmail}

Use the following clause bodies and combine them coherently:

${clausesText}

Output should be final, clean, and structured.
  `.trim();

  const prompt = `${systemPrompt}\n\n${userPrompt}`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};
