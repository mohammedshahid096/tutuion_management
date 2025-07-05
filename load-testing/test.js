const autocannon = require("autocannon");

const url = [
  //   "http://localhost:8000/health",
  // "http://localhost:8000/api/v1/user/profile",
  "http://localhost:8000/api/v1/graph/admin/dashboard",
];

const duration = 10; // Duration of the test in seconds

url.forEach((singleUrl) => {
  const instance = autocannon(
    {
      url: singleUrl,
      //   connections: , // Number of concurrent connections
      duration,
    },
    (err, result) => {
      if (err) {
        console.log(`Error during load test: ${err.message}`);
      } else {
        console.log(result);
      }
    }
  );

  autocannon.track(instance);
});
// instance.on("response", (statusCode, res, context) => {
//   console.log(
//     `Response received: ${statusCode} for ${context.url} with body length ${res.length}`
//   );
// });
