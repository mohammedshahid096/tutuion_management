const promClient = require("prom-client");

const initializePrometheusMetrics = () => {
  const collectDefaultMetrics = promClient.collectDefaultMetrics;
  collectDefaultMetrics({
    register: promClient.register,
  });
};

module.exports = {
  initializePrometheusMetrics,
  promClient,
};
