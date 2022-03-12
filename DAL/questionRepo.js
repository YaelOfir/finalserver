const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const { v4: uuidv4 } = require("uuid");
const dataFile = "./data/question.json";
const logger = require("../logger");
const { body, validationResult } = require("express-validator");

class questionsRepo {
  async getQuestionByID(id) {
    return JSON.parse(await readFile(dataFile)).filter(
      (question) => question.id == id
    );
  }

  async getAllQuestions() {
    const data = JSON.parse(await readFile(dataFile));
    return data;
  }

  async addQuestion(question) {
    let data = JSON.parse(await readFile(dataFile));

    let newQuestion = {
      id: uuidv4(),
      questionName: question.question.questionName,
      answers: question.question.answers,
      correctAnswer: question.question.correctAnswer,
      topic: question.question.topic,
      lastChange: new Date(Date.now()).toLocaleDateString(),
    };

    try {
      data.push(newQuestion);
      await writeFile(dataFile, JSON.stringify(data));
    } catch (errors) {
      logger.error(errors);
    }
    return newQuestion;
  }

  async editQuestion(updateQuestion) {
    let data = JSON.parse(await readFile(dataFile));

    let newdata = data.filter((question) => question.id != updateQuestion.id);
    newdata.push(updateQuestion);
    await writeFile(dataFile, JSON.stringify(newdata));
    return updateQuestion;
  }
}

module.exports = new questionsRepo();
