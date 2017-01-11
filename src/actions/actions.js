import * as types from '../actions/actiontypes';
import { CALL_API } from 'redux-api-middleware';
import fetch from 'isomorphic-fetch';



export function addHouse(id, title, andress, photo, category, location) {
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

export function removeHouse(id) {
    return {
        type: types.REMOVE_HOUSE,
        id
    }
};

// export function prova1() {
//       return fetch ("http://localhost:9000/api/house")
//       .then(req => req.json())
//     }
//
//     return {
//       [CALL_API]: {
//         types: [
//           {
//             type: 'REQUEST',
//             payload: (action, state) => ({ action: state })
//           },
//           {
//             type: 'SUCCESS',
//               payload:  (action, state, response) => {
//                  return response
//                 }
//            },
//           'FAILURE'
//         ]
//       }
//     }
// }

// export function fetchHouse() {
//   return {
//     [CALL_API]: {
//       endpoint: `http://localhost:9000/api/house`,
//       method: 'GET',
//       types: [types.FETCHHOUSE_REQUEST, types.FETCHHOUSE_SUCCESS, types.FETCHHOUSE_FAILURE]
//     }
//   }
// }

export function fetchHouse() {
  return {
[CALL_API]: {
  endpoint: 'http://localhost:9000/api/house',
  method: 'GET',
  types: [
    types.FETCHHOUSE_REQUEST,
    {
      type: types.FETCHHOUSE_SUCCESS,
      payload: (action, state, res) => {
          return res.json();
      }
    },
    'FAILURE'
  ]
  }
 }
}
