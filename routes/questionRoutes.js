const express = require("express");
const router = express.Router();
const controller = require("../controller/question");
const asyncHandler = require("../helpers/asyncHandler");
const logger = require("../logger");
const { body, validationResult } = require("express-validator");
const bodyParser = require("body-parser");
const { error } = require("../logger");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get(
  "/list",
  asyncHandler(async (req, res) => {
    const data = await controller.getAllQuestions();

    res.send(data);
  })
);

router.get(
  "/question/:id",
  asyncHandler(async (req, res) => {
    const Id = req.params.id;

    try {
      const data = await controller.getQuestionById(Id);

      res.status(200).send(data);
      logger.info(data);
    } catch (err) {
      res.status(401).logger.error(err);
    }
  })
);

router.post(
  "/add",
  body("questionName").notEmpty(),
  body("topic").notEmpty(),
  body("correctAnswer").notEmpty(),
  body("answers").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      res.status(401).json({ errors: errors.array() });
      logger.error(errors);
    } else {
      const data = await controller.addQuestion(req.body);
      res.status(201).send(data);
      console.log(req.body);
      console.log(req.params);
    }
  }
);

router.put(
  "/editQuestion",
  asyncHandler(async (req, res) => {
    // const Id = req.params.id;
    try {
      console.log(req.body);
      const data = await controller.editQuestion(req.body);

      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  })
);

module.exports = router;
