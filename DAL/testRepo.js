const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const jsonTestFileName = "./data/test.json";
const logger = require("../logger");
class testRepo {
  async getTestByID(id) {
    const data = JSON.parse(await readFile(jsonTestFileName)).filter(
      (test) => test.id == id
    );
    return data;
  }

  async getAllTests() {
    const data = JSON.parse(await readFile(jsonTestFileName));
    return data;
  }

  async addTest(test) {
    let data = JSON.parse(await readFile(jsonTestFileName));
    let biggestId = 0;
    if (data.length)
      biggestId = Math.max.apply(
        Math,
        data.map((test) => test.id)
      );

    let testToAdd = {
      id: biggestId + 1,
      title: test.title,
      topic: test.topic,
      questions: test.questions,
      noteToPass: test.noteToPass,
      showAnswer: test.showAnswer,
      textSucceeded: test.textSucceeded,
      textFailed: test.textFailed,
      time: test.time,
      date: new Date(Date.now()).toLocaleDateString(),
    };

    try {
      data.push(testToAdd);
      await writeFile(jsonTestFileName, JSON.stringify(data));
    } catch (error) {
      logger.error(error);
    }
    return testToAdd;
  }

  async editTest(updateTest) {
    let data = JSON.parse(await readFile(jsonTestFileName));

    let newdata = data.filter((test) => test.id != updateQuestion.id);
    newdata.push(updateTest);
    await writeFile(jsonTestFileName, JSON.stringify(newdata));
    return updateTest;
  }
}

module.exports = new testRepo();
