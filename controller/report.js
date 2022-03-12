const db = require("../DAL/reportRepo");

class ReportController {


  saveTestResults(results) {
    return db.saveTestResults(results);
  }
}

module.exports = new ReportController();
