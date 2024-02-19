/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
import {
  GET_DRIVERS,
  GET_TEAMS,
  POST_DRIVER,
  GET_DRIVER_DETAIL,
  DRIVER_CLEAN_DETAIL,
  GET_NAME,
  FILTER_BY_SOURCE,
  FILTER_BY_TEAM,
  ORDER_BY_NAME,
  ORDER_BY_DOB
} from "./actions";

const initialState = {
  drivers: [],
  allDrivers: [],
  driverDetail: {},
  teams: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DRIVERS:
      return {
        ...state,
        drivers: payload,
        allDrivers: payload,
      };

    case GET_TEAMS:
      return {
        ...state,
        teams: payload,
      };

    case POST_DRIVER:
      return {
        ...state,
        drivers: [ ...state.drivers, payload ],
        allDrivers: [ ...state.allDrivers, payload]
      }
    
    case GET_DRIVER_DETAIL:
      return {
        ...state,
        driverDetail: payload
      }

    case DRIVER_CLEAN_DETAIL:
      return {
        ...state,
        driverDetail: {}
      }

    case GET_NAME:
      return {
        state,
        allDrivers: payload
      }
      
    case FILTER_BY_SOURCE:
      let drivers = [];

      if (payload === "ALL") {
        drivers = [...state.drivers];
      } else {
        if (state.drivers) {
          drivers = [...state.drivers].filter(
            (driver) => driver.source === payload
          );
        } else {
          drivers = [];
        }
      }

      return {
        ...state,
        allDrivers: drivers,
      };

    case FILTER_BY_TEAM:
      const driversByTeam = [...state.drivers].filter((driver) =>
        driver.teams.includes(payload)
      );

      return {
        ...state,
        allDrivers: driversByTeam,
      };

    case ORDER_BY_NAME:
      const orderDriversByName =
        payload === "ASC"
          ? state.drivers.slice().sort(function (a, b) {
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
              }
              if (b.name.toLowerCase() < a.name.toLowerCase()) {
                return 1;
              }
              return 0;
            })
          : state.drivers.slice().sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        allDrivers: orderDriversByName
      };

      case ORDER_BY_DOB:
        const orderDriversByDOB =
          payload === "ASC"
            ? state.drivers.slice().sort((a, b) => {
                const dateA = new Date(a.born);
                const dateB = new Date(b.born);
                
                return (dateA - dateB) * 1;
            })
            : state.drivers.slice().sort((a, b) => {
              const dateA = new Date(a.born);
              const dateB = new Date(b.born);
              
              return (dateA - dateB) * -1;
          })
  
        return {
          ...state,
          allDrivers: orderDriversByDOB
        };

    default:
      return state;
  }
};

export default rootReducer;
