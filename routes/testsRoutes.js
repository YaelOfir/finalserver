const express = require("express");
const router = express.Router();
const controller = require("../controller/test");
const asyncHandler = require("../helpers/asyncHandler");
const logger = require("../logger");
const { body, validationResult } = require("express-validator");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get(
  "/test/:id",
  asyncHandler(async (req, res) => {
    const Id = req.params.id;
    const tests = await controller.getAllTests();
    const data = tests.filter((question) => question.id == Id);
    if (!data) {
      res.status(400).send("no");
    }
    res.send(data);
    console.log(data);
  })
);
router.get(
  "/list",
  asyncHandler(async (req, res) => {
    const data = await controller.getAllTests();

    res.send(data);
  })
);

router.post(
  "/add",
  body("title").notEmpty(),
  body("topic").notEmpty(),
  body("textSucceeded").notEmpty(),
  body("textFailed").notEmpty(),
  body("time").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      res.status(401).json({ errors: errors.array() });
      logger.error(errors);
    } else {
      const data = await controller.addTest(req.body);
      res.status(201).send(data);
      console.log(req.body);
      console.log(req.params);
    }
  }
);

router.put(
  "/editTest",
  asyncHandler(async (req, res) => {
    try {
      const data = await controller.editTest(req.body);
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  })
);

module.exports = router;
