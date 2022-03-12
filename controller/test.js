const db = require("../DAL/testRepo");

class TestController {
  getTestById(id) {
    return db.getTestByID(id);
  }

  getAllTests() {
    return db.getAllTests();
  }

  addTest(test) {
    return db.addTest(test);
  }

  editTest(newTest) {
    return db.editTest(newTest);
  }
}

module.exports = new TestController();
