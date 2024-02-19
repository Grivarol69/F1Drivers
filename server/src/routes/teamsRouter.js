const { Router } = require('express');
const { getTeams } = require('../controllers/teamsController.js');

const teamsRouter = Router();

teamsRouter.get("/", async (req, res) => {
  try {
    const teams = await getTeams();
    res.status(200).json(teams);
  } catch (error) {
    res.status(403).json({ msg: error.message });
  }
});

module.exports = teamsRouter;