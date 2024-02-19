import axios from 'axios';

export const GET_DRIVERS = 'GET_DRIVERS';
export const GET_TEAMS = 'GET_TEAMS';
export const POST_DRIVER = 'POST_DRIVER';
export const GET_DRIVER_DETAIL = 'GET_DRIVER_DETAIL';
export const DRIVER_CLEAN_DETAIL = 'DRIVER_CLEAN_DETAIL';
export const GET_NAME = 'GET_NAME';
export const FILTER_BY_SOURCE = 'FILTER_BY_SOURCE';
export const FILTER_BY_TEAM = 'FILTER_BY_TEAM';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_DOB = 'ORDER_BY_DOB'

export const getDrivers = () => {
  return async function(dispatch) {
    
    try {
      let drivers = (await axios("http://localhost:3001/drivers")).data;
      
      return dispatch({
        type: GET_DRIVERS,
        payload: drivers
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export const getTeams = () => {
  return async function(dispatch) {
    try {
      let teams = (await axios("http://localhost:3001/teams")).data;
      return dispatch({
        type: GET_TEAMS,
        payload: teams
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export const postDriver = (payload) => {
  console.log('action payload: ', payload);
  return async function(dispatch) {
    try {
      await axios.post("http://localhost:3001/drivers", payload);
      return dispatch({
        type: POST_DRIVER,
        payload
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export const getDriverDetail = (id) => {
  return async function(dispatch) {
    
    try {
      let driver = (await axios(`http://localhost:3001/drivers/${id}`)).data;
      
      return dispatch({
        type: GET_DRIVER_DETAIL,
        payload: driver
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export const driverCleanDetail = () => {
  return { type: DRIVER_CLEAN_DETAIL }
}

export const getName = (name) => {
  return async function(dispatch) {
    try {
      let drivers = (await axios(`http://localhost:3001/drivers?name=${name}`)).data;
      let driver = drivers.length <= 15 ? drivers : drivers.slice(14)
      console.log(driver);
      return dispatch({
        type: GET_NAME,
        payload: driver
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export const filterDriversBySource = (payload)  => {
  return async function(dispatch) {
    return dispatch({
      type: FILTER_BY_SOURCE,
      payload
    });
  }
}

export const filterDriversByTeam = (payload)  => {
  return async function(dispatch) {
    return dispatch({
      type: FILTER_BY_TEAM,
      payload
    });
  }
}

export const orderByName = (payload) => {
  return async function(dispatch) {
    return dispatch({
      type: ORDER_BY_NAME,
      payload
    });
  }
}

export const orderByDOB = (payload) => {
  return async function(dispatch) {
    return dispatch({
      type: ORDER_BY_DOB,
      payload
    });
  }
}