const logger = require("../Config/logger.config");
const { STUDENT } = require("../Constants/roles.constants");
const attendanceModel = require("../Schema/attendance/attendance.model");
const userModel = require("../Schema/users/user.model");
const batchModel = require("../Schema/batches/batch.model");
const LiveClassServiceClass = require("../Services/createLiveClass.service");
const errorHandling = require("../Utils/errorHandling");
const moment = require("moment");
const { USER_ACCOUNT_ID } = require("../Config/index.config");

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
        USER_ACCOUNT_ID
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
