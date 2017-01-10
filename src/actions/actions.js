import * as types from '../actions/actiontypes';
import { CALL_API } from 'redux-api-middleware';


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

export function fetchHouse() {
  console.log("sto dentro fetchHouse")
  return {
    [CALL_API]: {
      endpoint: 'http://localhost:9000/api/house',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      types: [
        types.FETCHHOUSE_REQUEST,
        {
          type: types.FETCHHOUSE_SUCCESS,
          payload: (action, state, res) => {
            const contentType = res.headers.get('Content-Type');
            if (contentType && ~contentType.indexOf('json')) {
              // Just making sure res.json() does not raise an error
              return res.json();
            }
          }
        },
        types.FETCHHOUSE_FAILURE
      ]
    }
  }
}
