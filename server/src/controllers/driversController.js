const axios = require("axios");
require("dotenv").config();
const { Driver, Team } = require("../db.js");

const { URL_BASE } = process.env;

const getApiData = async () => {

  try {
    const { data } = await axios(`${URL_BASE}/drivers`);
        
    return await data.map((driver) => {
      let name = driver.name.forename + " " + driver.name.surname;
      let teams = driver.hasOwnProperty("teams")
        ? driver.teams.split(/\s*(?:,|$)\s*/)
        : "";

      result = {
        id: driver.id,
        name,
        image: driver.image.url,
        born: driver.dob,
        nationality: driver.nationality,
        description: driver.description,
        source: "API",
        teams,
      };
      
      return result;
      
    });

  } catch (error) {
    console.log(error.message);
    throw new Error({ msg: error.message });
  }
};

const getDbData = async () => {
  try {
        
    const data = await Driver.findAll({
      include: {
        model: Team,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      raw: true
    });

    
    const groupedData = data.reduce((acc, driver) => {
      if (!acc[driver.id]) {
        acc[driver.id] = { ...driver, Teams: [] };
      }
      acc[driver.id].Teams.push(driver['Teams.name']);
      return acc;
    }, {});

    // Convertir el objeto agrupado a un array
    const formattedData = Object.values(groupedData);

    if (formattedData.length && Array.isArray(formattedData)) {
      const dbData = formattedData.map((driver) => {
        let name = driver.name + " " + driver.surname;
        const driverData = {
          id: driver.id,
          name,
          image: driver.image,
          born: driver.born,
          nationality: driver.nationality,
          description: driver.description,
          source: "DB",
          teams: driver.Teams,
        };
        return driverData;
      });
      
      return dbData;
    } else {
      return [];
    }
  } catch (error) {
    console.log("getDbData", error.message);
    throw new Error({ msg: error.message });
  }
};

const getDrivers = async (name) => {


  const api = await getApiData();
  const db = await getDbData();
    
  const allDrivers = [...api, ...db];
  

  allDrivers.sort((a, b) => {
    return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
  });

  const names = name
    ? allDrivers.filter((driver) => {
        return driver.name.toLowerCase().includes(name.toLowerCase());
      })
    : allDrivers;

  //* return first 15 ocurrencys
  return names.length >= 15 ? names.slice(15) : names;
};

const getDriversById = async (id) => {
  try {
    const data = await getDrivers();
    const driver = data.find((d) => d.id.toString() === id.toString());
    return driver || false;
  } catch (error) {
    throw new Error({ msg: error.message });
  }
};

const createDriver = async ({
  name,
  surname,
  description,
  image,
  nationality,
  born,
  teams,
}) => {
  // console.log({ name, surname, description, image, nationality, born, teams });
  

  try {
    const newDriver = await Driver.create({
      name,
      surname,
      description,
      image,
      nationality,
      born
    });
        
    //* add teams to new Driver
    teams.length
      ? teams.map(async (name) => {
        const temp = await Team.findOne({
          attributes: ["id"],
          where: { name }
        })
        console.log(temp.dataValues.id);
        await newDriver.addTeam(temp.dataValues.id)
      })
      : []
    
    return newDriver;
    
  } catch (error) {
    console.log("Error: ", error.message);
    throw new Error({ msg: error.message });
  }
};

const deleteDriver = async (id) => {
  try {
    const response = await Driver.findByPk(id, {
      attributes: ["id", "name"]
    });
    if (!response) {
      throw new Error("ID does not match");
    } else {
      let driver = response;
      response.destroy();
      return {
        message: "Driver was deleted succesfully",
        driver
      }
    }
    
  } catch (error) {
    throw new Error({ msg: error.message });
  }
};

module.exports = {
  getDrivers,
  getDriversById,
  createDriver,
  deleteDriver
};
