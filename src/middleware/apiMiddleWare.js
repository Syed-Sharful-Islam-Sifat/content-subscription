const ensureDBConeection = require("../config/db");
const authenticateUser = require("./authenticateUser");
module.exports = (handler) => {
  return async (req, res) => {
    try {
      await ensureDBConeection();

      const url = req.originalUrl;
      console.log(url);
      if (url.startsWith("/api/p")) {
      } else if (url.startsWith("/api/a")) {
        await authenticateUser(req);
      }

      const response = await handler(req, res);
      const statusCode = res.statusCode || 200;
      res.status(statusCode).json({
        type: "RESULT",
        message: res.message || "OK",
        result: response || {},
        error: null,
      });
    } catch (error) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({
        type: "ERROR",
        message: error.message,
        result: null,
        error: error.stack,
      });
    }
  };
};
