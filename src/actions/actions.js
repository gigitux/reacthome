import * as types from '../actions/actiontypes';


function addHouse(id,title,andress,photo,category,location) {
  return {
    type: type.ADD_HOUSE
    id,
    title,
    andress,
    photo,
    category,
    location
  }
};

function removeHouse(id) {
  return {
    type: type.REMOVE_HOUSE
    id
  }
};

function
