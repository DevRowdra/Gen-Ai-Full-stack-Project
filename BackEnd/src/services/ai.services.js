const { GoogleGenAI, Models } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indication hwo well the candidate's  profile matches the job describe ",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The Technical question can be asked in the interview"),
        intention: z
          .string()
          .describe("The intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question,what points to cover,what approac to take etc",
          ),
      }),
    )
    .describe(
      "Technical questions that can be asked in the interview along with their intention and how to answer them ",
    ),
  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The Technical question can be asked in the interview"),
        intention: z
          .string()
          .describe("The intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question,what points to cover,what approac to take etc",
          ),
      }),
    )
    .describe(
      "Behavioral Questions that can be asked in the interview along with their intention and how to answer them ",
    ),
  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe("The severity of the skill"),
      }),
    )
    .describe("List of skill gaps in the candidate profile along with their "),
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number in the preparatrion plan start"),
        focus: z.string().describe("Main focus of this day in the preparation"),

        tasks: z
          .array(z.string())
          .describe(
            "List of task to be done on this to follow the preparation",
          ),
      }),
    )
    .describe(
      "A day wise preparation plan for the candidate to follow in order to prepare for the interview effectively",
    ),
});
async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
Generate a structured interview report in STRICT JSON format.

Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

Return ONLY valid JSON.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json", // ✅ FIX
      responseJsonSchema: zodToJsonSchema(interviewReportSchema),
    },
  });

  try {
    const parsed = JSON.parse(response.text);
    console.log(parsed);
    return parsed;
  } catch (error) {
    console.error("Raw AI Response:", response.text);
    throw new Error("Failed to parse AI response");
  }
}

async function invokeGeminiAi() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Hello! Explain what is interview in few words",
  });
  console.log(response.text);
}

module.exports = generateInterviewReport;
