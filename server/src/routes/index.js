const { Router } = require("express");

const driversRouter = require('./driversRouter.js');
const teamsRouter = require('./teamsRouter.js');

const router = Router();

router.use("/drivers", driversRouter );
router.use("/teams", teamsRouter);

module.exports = router;
