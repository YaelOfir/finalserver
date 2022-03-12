const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const { v4: uuidv4 } = require("uuid");
const dataFile = "./data/question.json";
const logger = require("../logger");
const { body, validationResult } = require("express-validator");

class reportRepo {
  async getQuestionByID(id) {
    return JSON.parse(await readFile(dataFile)).filter(
      (question) => question.id == id
    );
  }

  async getAllQuestions() {
    const data = JSON.parse(await readFile(dataFile));
    return data;
  }

  async saveTestResults(results) {
    let data = JSON.parse(await readFile(dataFile));

    let newResults = {
      id: uuidv4(),
      answer: results.answer,
      testId: results.testId,
      lastChange: new Date(Date.now()).toLocaleDateString(),
    };

    try {
      data.push(newResults);
      await writeFile(dataFile, JSON.stringify(data));
    } catch (errors) {
      logger.error(errors);
    }
    return newResults;
  }

  async editQuestion(updateQuestion) {
    let data = JSON.parse(await readFile(dataFile));

    let newdata = data.filter((question) => question.id != updateQuestion.id);
    newdata.push(updateQuestion);
    await writeFile(dataFile, JSON.stringify(newdata));
    return updateQuestion;
  }
}

module.exports = new reportRepo();
