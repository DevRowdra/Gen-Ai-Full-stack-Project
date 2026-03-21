const express = require("express");
const { authUser } = require("../middleware/auth.middleware");
const {
  generateInterViewReportController,
} = require("../controllers/interview.controllers");

const interviewRouter = express.Router();
/**
 * @route post /api/interview/
 * @description generate interview report on the basis of user self descrioption resume pdf and job description
 * @access private
 */
interviewRouter.post("", authUser, generateInterViewReportController);

module.exports = interviewRouter;
