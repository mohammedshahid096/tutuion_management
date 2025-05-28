const express = require("express");
const UserRoutes = require("./users/user.routes");
const BoardRoutes = require("./board/board.routes");
const SubjectRoutes = require("./subject/subject.routes");
const BatchRoutes = require("./batch/batch.routes");
const EnrollmentRoutes = require("./enrollment-progress/enrollment.routes");
const AttendanceRoutes = require("./attendance/attendance.route");
const GraphRoutes = require("./graphs/grahph.route");
const ContactFormRoutes = require("./contact/contact.route");
const StudentAttendanceRoutes = require("./attendance/studentAttendance.route");
const StudentEnrollmentRoutes = require("./enrollment-progress/studentEnrollment.routes");
const AiRoutes = require("./ai/ai.routes");
const NoteRoutes = require("./notes/notes.routes");

// Route config
const IndexRoutes = express.Router();

// ----------------------------------------
//  user  routes
// ----------------------------------------
IndexRoutes.use("/user", UserRoutes);

// ----------------------------------------
//  board  routes
// ----------------------------------------
IndexRoutes.use("/board", BoardRoutes);

// ----------------------------------------
//  subject  routes
// ----------------------------------------
IndexRoutes.use("/subject", SubjectRoutes);

// ----------------------------------------
//  Batches  routes
// ----------------------------------------
IndexRoutes.use("/batch", BatchRoutes);

// ----------------------------------------
//  Enrollment- Progress  routes
// ----------------------------------------
IndexRoutes.use("/enrollment", EnrollmentRoutes);
IndexRoutes.use("/student-enrollment", StudentEnrollmentRoutes);

// ----------------------------------------
//  Attendance  routes
// ----------------------------------------
IndexRoutes.use("/attendance", AttendanceRoutes);
IndexRoutes.use("/student-attendance", StudentAttendanceRoutes);

// ----------------------------------------
//  Graph routes
// ----------------------------------------
IndexRoutes.use("/graph", GraphRoutes);

// ----------------------------------------
//  Contact-Forms routes
// ----------------------------------------
IndexRoutes.use("/contact", ContactFormRoutes);

// ----------------------------------------
//  Ai routes
// ----------------------------------------
IndexRoutes.use("/ai", AiRoutes);

// ----------------------------------------
//  Ai routes
// ----------------------------------------
IndexRoutes.use("/notes", NoteRoutes);

// export the routes
module.exports = IndexRoutes;
