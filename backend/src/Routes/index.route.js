const express = require("express");
const UserRoutes = require("./users/user.routes");
const BoardRoutes = require("./board/board.routes");
const SubjectRoutes = require("./subject/subject.routes");
const BatchRoutes = require("./batch/batch.routes");
const EnrollmentRoutes = require("./enrollment-progress/enrollment.routes");
const AttendanceRoutes = require("./attendance/attendance.route");

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

// ----------------------------------------
//  Attendance  routes
// ----------------------------------------
IndexRoutes.use("/attendance", AttendanceRoutes);

// export the routes
module.exports = IndexRoutes;
