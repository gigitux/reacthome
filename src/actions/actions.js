import * as types from '../actions/actiontypes';


function addHouse(id,title,andress,photo,category,location) {
  return {
    type: types.ADD_HOUSE,
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
    type: types.REMOVE_HOUSE,
    id
  }
};
