const logger = require("../Config/logger.config");
const { STUDENT } = require("../Constants/roles.constants");
const attendanceModel = require("../Schema/attendance/attendance.model");
const userModel = require("../Schema/users/user.model");
const batchModel = require("../Schema/batches/batch.model");
const LiveClassServiceClass = require("../Services/createLiveClass.service");
const errorHandling = require("../Utils/errorHandling");
const moment = require("moment");

// const { studentId } = req.params;
// let { summary, description } = req.body;

// let studentDetails = await userModel.findById(studentId).lean();

// if (!studentDetails) {
//   return next(httpErrors.NotFound(userConstants.USER_NOT_FOUND));
// }
// const currentDay = moment().format("dddd").toLowerCase();
// const currentDate = moment().format("LLL");

// let studentAvailableOnThisDay = studentDetails?.days?.[currentDay] || false;

// if (!studentAvailableOnThisDay) {
//   return next(
//     httpErrors.BadRequest("Student is not available to create a live class")
//   );
// }
// summary = summary ?? currentDay + " " + currentDate + "";
// description =
//   description ??
//   "A live is schedule " + currentDay + " " + currentDate + "";
// let startDate = moment(studentDetails?.timings?.startTimeHHMM, "HH:mm");
// let endDate = moment(studentDetails?.timings?.endTimeHHMM, "HH:mm");

// let details = {
//   student: studentId,
//   summary,
//   description,
//   startDate,
//   endDate,
//   day: currentDay,
//   class: studentDetails?.class,
//   board: studentDetails?.boardType.toString(),
//   batch: req.batch._id.toString(),
//   createdBy: req.user._id,
//   updatedBy: req.user._id,
// };

// const existingRecord = await attendanceModel.findOne({
//   student: studentId,
//   startDate: startDate,
// });

// if (existingRecord) {
//   return next(
//     httpErrors.Conflict(
//       "Attendance already created for this student on this date."
//     )
//   );
// }

// const googleCalendarService = await new GoogleCalendarServiceClass(
//   req.user._id
// );
// await googleCalendarService.initialize();

// let googleEventDetails = {
//   summary: details.summary,
//   description: details.description,
//   startDate,
//   endDate,
//   timezone: "Asia/Kolkata",
//   location: "Google Meet" || "",
//   attendees: [{ email: studentDetails?.email }],
// };

// let eventResponseDetails = await googleCalendarService.createEvent(
//   "primary",
//   googleEventDetails
// );

// if (eventResponseDetails) {
//   details.googleMeet = {
//     enabled: true,
//     meetLink: eventResponseDetails.hangoutLink,
//     conferenceId: eventResponseDetails.conferenceData.conferenceId,
//     details: eventResponseDetails,
//   };
// }

// const data = new attendanceModel(details);
// await data.save();

// let mailDetails = {
//   student_name: studentDetails?.name,
//   session_summary: details?.summary,
//   session_description: details.description,
//   session_date: moment(details.startDate).format("LLL"),
//   session_time:
//     moment(details.startDate).format("hh:mm A") +
//     " - " +
//     moment(details.endDate).format("hh:mm A"),
//   session_meet_link: details.googleMeet.meetLink,
// };

// const nodeMailerService = new NodeMailerServiceClass();
// await nodeMailerService.sendMail(
//   studentDetails.email,
//   "liveSessionReminderTemplate",
//   null,
//   mailDetails
// );

const createNewLiveClassUtility = async () => {
  try {
    logger.info(
      "Utils - classReminder.cron -  createNewLiveClassController - Start"
    );
    console.log("Running daily job at 6 AM");

    const currentDay = moment().format("dddd").toLowerCase();

    let dayQuery = "days." + currentDay;

    let currentBatch = await batchModel.findOne({ isActive: true }).lean();

    let studentsList = await userModel
      .find({
        [dayQuery]: true,
        role: STUDENT,
      })
      .lean();

    studentsList?.forEach(async (singleStudent, index) => {
      let studentId = singleStudent._id.toString();
      let startTime = singleStudent.timings.startTimeHHMM;
      let endTime = singleStudent.timings.endTimeHHMM;
      let currentDate = moment(startTime, "HH:mm").format("LLL");
      let summary = currentDay + " " + currentDate + "";
      let description =
        "A live is schedule " + currentDay + " " + currentDate + "";

      const createLiveClass = new LiveClassServiceClass(
        studentId,
        singleStudent,
        startTime,
        endTime,
        summary,
        description,
        currentBatch._id.toString(),
        "672493276aa409505ecd9b43"
      );

      let enrollmentDetailsAvailable = await createLiveClass.getEnrollmentId();
      let isClassAvailable = await createLiveClass.checkAvailabilityMethod();
      // console.log("isAvailable", isClassAvailable);

      if (isClassAvailable === null && enrollmentDetailsAvailable) {
        let meetDetails = await createLiveClass.createGoogleMeetMethod();
        // console.log("meetDetails", meetDetails);
        if (meetDetails) {
          let attendanceData = await createLiveClass.createMeetDocument();
          // console.log("attendanceData", attendanceData);
          if (attendanceData) {
            await createLiveClass.sendMailMethod();
            // console.log("mail send ");
          }
        }
      }
    });

    logger.info(
      "Utils - classReminder.cron -  createNewLiveClassController   - End"
    );
  } catch (error) {
    logger.error(
      "Utils - classReminder.cron -  createNewLiveClassController   - Error",
      error
    );
    return error;
  }
};

module.exports = {
  createNewLiveClassUtility,
};
