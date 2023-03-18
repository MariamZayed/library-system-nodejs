const express = require("express");
const router = express.Router();
const controller = require("../Controller/reportsController");

router.route("/counteradminreport").get(controller.getAdminCounts);
router.route("/counterempreport").get(controller.getEmployeeCounts);
router.route("/countermemberreport").get(controller.getMemberCounts);
router.route("/counterbookreport").get(controller.getBooksCounts);

// router.route("/bookreports").get(controller);

module.exports = router;
