const { Router } = require("express");
const {
  getDrivers,
  getDriversById,
  createDriver,
  deleteDriver
} = require("../controllers/driversController");

const driversRouter = Router();

driversRouter.get("/", async (req, res) => {
  // const name = req.query["name.forename"];
  const { name } = req.query;
  
  try {
    const drivers = await getDrivers(name);
    res.status(200).json(drivers);
  } catch (error) {
    res.status(403).json({ msg: "Todo mal" });
  }
});

driversRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const drivers = await getDriversById(id);
    res.status(200).json(drivers);
  } catch (error) {
    res.status(403).json({ msg: error.message });
  }
});

driversRouter.post("/", async (req, res) => {
  const { name, surname, description, image, nationality, born, teams } = req.body;

  if (!name || !surname || !nationality || !teams) {
    return res.status(400).json({ msg: "Must complete all required fields" });
  } else {
    try {
      
      const drivers = await createDriver({
        name,
        surname,
        description,
        image,
        nationality,
        born,
        teams,
      });
      res.status(200).json(drivers);
    } catch (error) {
      res.status(403).json({ msg: error.message });
    }
  }
});

driversRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const drivers = await deleteDriver(id);
    res.status(200).json(drivers);
  } catch (error) {
    res.status(403).json({ msg: error.message });
  }
});

module.exports = driversRouter;
