const express = require("express");
const router = express.Router();
const controller = require("../Controller/reportsController");
const authorization = require("../Middleware/authorization");

router.route("/counteradminreport").get(authorization.checkBasicAdmin,controller.getAdminCounts);
router.route("/counterempreport").get(authorization.checkBasicAdmin,controller.getEmployeeCounts);
router.route("/countermemberreport").get(authorization.checkBasicAdmin,controller.getMemberCounts);
router.route("/counterbookreport").get(authorization.checkBasicAdmin,controller.getBooksCounts);

router.route("/bookreports").get(authorization.checkBasicAdmin,controller.getBookOperations);

module.exports = router;