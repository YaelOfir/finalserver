const express = require("express");
const router = express.Router();
const controller = require("../controller/report");

router.post("/save-results", async (req, res) => {
  const data = await controller.saveTestResults(req.body);
  res.status(200).send(data);
});

module.exports = router;
