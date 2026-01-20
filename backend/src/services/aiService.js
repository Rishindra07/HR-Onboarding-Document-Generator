import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Generates a merged, formatted onboarding document using AI.
 * 
 * @param {Object} data
 * @param {String} data.employeeName
 * @param {String} data.employeeEmail
 * @param {Array} data.clauses  // [{ title, type, body }]
 * 
 * @returns {String} formatted merged content
 */
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

  // Build clause text for the model
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

  const response = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    temperature: 0.3
  });

  return response.choices[0].message.content;
};
