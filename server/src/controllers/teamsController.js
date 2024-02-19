const axios = require('axios');
require('dotenv').config();
const { Team } = require('../db.js');

const getTeams = async () => {

  const { URL_BASE } = process.env;

  try {
    const teamsDb = await Team.findAll();
    if (teamsDb.length) {
      return [ ...teamsDb].sort();
      
    } else {
      let teams = [];
      
      const { data } = await axios(`${URL_BASE}/drivers`);
        
      data.map((reg) => {
        let team = reg.hasOwnProperty("teams")
          ? reg.teams.split(",")
          : []
        
        const trimmed = team.map((t) => t.trim());
          
        teams = [ ...teams, ...trimmed ]
      });
        
      const tempSet = new Set([ ...teams ]);
        
      const sorted = [ ...tempSet ].sort();
        
      const bulk = sorted.map((t) => {
        return { name: t }
      });
        
      const teamsInserted = await Team.bulkCreate(bulk);
      return teamsInserted;
    }
    
  } catch (error) {
    console.log(error.message);
    throw new Error({ msg: error.message });

  }
}

module.exports = {
  getTeams
}