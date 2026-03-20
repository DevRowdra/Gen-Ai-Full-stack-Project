const mongoose = require("mongoose");
/**
 * - Job description schema: string
 * - Self description:string
 * - resume text:string
 *
 * - matchScore: number
 * -Technical quation: [
 *                  {  quation:"",
 *                     intention:"",
 *                     answer:""
 *   }
 * ]
 * -Behavioral quation: [
 *                  {  quation:"",
 *                     intention:"",
 *                     answer:""
 *   }
 * ]
 *
 *- skill gaps:[{
            skill: string
            severity:{ 
            type:string,
            enum:["low","medium","high"]
            }
 }]
 *
 */
const technicalQuationSchema = new mongoose.Schema(
  {
    quation: {
      type: String,
      required: [true, "Technical quation is required"],
    },
    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  {
    _id: false,
  },
);
const behavioralQuationSchema = new mongoose.Schema(
  {
    quation: {
      type: String,
      required: [true, "Technical quation is required"],
    },
    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  {
    _id: false,
  },
);
const skillGapsSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "Skill is required"],
    },
    severity: {
      type: string,
      required: [true, "severity is required"],
      enum: ["low", "medium", "high"],
    },
  },
  { _id: false },
);

const preparationPlanSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: [true, "day is required "],
  },
  focus: {
    type: string,
    required: [true, "Focus is Required"],
  },
  tasks: [{ type: String, required: [true, "Tasks is Required"] }],
});
const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "job description required"],
    },
    selfDescription: {
      type: String,
    },
    resume: {
      type: String,
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    technicalQuation: [technicalQuationSchema],
    behavioralQuation: [behavioralQuationSchema],
    skillGaps: [skillGapsSchema],
    preparationPlan: [preparationPlanSchema],
  },
  { timestamps: true },
);
const interviewReportModel = new mongoose.model(
  "InterviewReport",
  interviewReportSchema,
);
module.exports = interviewReportModel;
