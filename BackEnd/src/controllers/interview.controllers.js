const pdfParse = require("pdf-parse");

const interviewReportModel = require("../models/interViewReport.model");
const sendResponse = require("../utils/response");
const { generateInterviewReport } = require("../services/ai.services");
async function generateInterViewReportController(req, res) {
  const resumeContent = await new pdfParse.PDFParse(
    Uint8Array.from(req.file.buffer),
  ).getText();
  const { selfDescription, jobDescription } = req.body;

  const interViewReportByAi = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });

  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...interViewReportByAi,
  });

  res.status(201).json({
    message: "Interview report generated successfully.",
    interviewReport,
  });
}
// async function generateInterViewReportController(req, res) {
//   try {
//     let resumeText = "";

//     if (req.file) {
//       const pdf = new PDFParse(Uint8Array.from(req.file.buffer));
//       const result = await pdf.getText();
//       resumeText = result.text;
//     }

//     const { selfDescription, jobDescription } = req.body;

//     if (!selfDescription || !jobDescription) {
//       return res.status(400).json({
//         message: "selfDescription and jobDescription are required",
//       });
//     }

//     const interViewReportByAi = await generateInterviewReport({
//       resume: resumeText,
//       selfDescription,
//       jobDescription,
//     });

//     console.log("AI:", interViewReportByAi);

//     const mappedData = {
//       matchScore: interViewReportByAi.overall_score
//         ? interViewReportByAi.overall_score * 10
//         : 0,

//       technicalQuestions: (interViewReportByAi.follow_up_questions || []).map(
//         (q) => ({
//           question: q,
//           intention: "Evaluate technical understanding",
//           answer: "Provide structured explanation with examples",
//         }),
//       ),

//       behavioralQuestions: [],

//       skillGaps: (interViewReportByAi.potential_gaps || []).map((gap) => ({
//         skill: gap,
//         severity: "medium",
//       })),

//       preparationPlan: [],
//     };

//     const interviewReport = await interviewReportModel.create({
//       user: req.user.id,
//       resume: resumeText,
//       selfDescription,
//       jobDescription,
//       ...mappedData,
//     });

//     return res.status(201).json({
//       message: "Interview report generated successfully",
//       interviewReport,
//     });
//   } catch (error) {
//     console.error("❌ CONTROLLER ERROR:", error);
//     return res.status(500).json({
//       message: "Something went wrong",
//     });
//   }
// }

module.exports = { generateInterViewReportController };
