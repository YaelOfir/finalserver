const db = require("../DAL/questionRepo.js");

class QuestionsController {
  getAllQuestions() {
    return db.getAllQuestions();
  }

  getQuestionById(id) {
    return db.getQuestionByID(id);
  }

  editQuestion(newQuestion) {
    return db.editQuestion(newQuestion);
  }

  addQuestion(question) {
    return db.addQuestion(question);
  }
}

module.exports = new QuestionsController();
