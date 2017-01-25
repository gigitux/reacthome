import * as types from '../actions/actiontypes';
import { CALL_API } from 'redux-api-middleware';



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

export function postHouse(title,description) {
    return {
        [CALL_API]: {
            endpoint: 'http://localhost:9000/api/house',
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: title,
                description: description,
            }),
            types: [
                types.POSTHOUSE_SUCCESS,
                {
                    type: types.POSTHOUSE_SUCCESS,
                    payload: (action, state, res) => {
                        return res.json();
                    }
                },
                'FAILURE'
            ]
        }
    }
}

export function fetchoneHouse(id) {
    return {
        [CALL_API]: {
            endpoint: 'http://localhost:9000/api/house/'+ id,
            method: 'GET',
            types: [
                types.FETCHONEHOUSE_REQUEST,
                {
                    type: types.FETCHONEHOUSE_SUCCESS,
                    payload: (action, state, res) => {
                        return res.json();
                    }
                },
                'FAILURE'
            ]
        }
    }
}

export function deletehouse(id) {
    return {
        [CALL_API]: {
            endpoint: 'http://localhost:9000/api/house/'+ id,
            method: 'DELETE',
            types: [
                types.DELETEHOUSE_REQUEST,
                {
                    type: types.DELETEHOUSE_REQUEST,
                    payload: (action, state, res) => {
                        return res.json();
                    }
                },
                'FAILURE'
            ]
        }
    }
}

export function editHouse(id,title,description) {
    return {
        [CALL_API]: {
            endpoint: 'http://localhost:9000/api/house/'+ id,
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: title,
                description: description
            }),
            types: [
                types.EDITHOUSE_SUCCESS,
                {
                    type: types.EDITHOUSE_SUCCESS,
                    payload: (action, state, res) => {
                        return res.json();
                    }
                },
                'FAILURE'
            ]
        }
    }
}

export function registration(name,surname,email,password) {
  console.log("ggg")
    return {
        [CALL_API]: {
            endpoint: 'http://localhost:9000/api/registration/',
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                surname: surname,
                email : email,
                password: password
            }),
            types: [
                types.REGISTRATION,
                {
                    type: types.REGISTRATION,
                    payload: (action, state, res) => {
                        return res.json();
                    }
                },
                'FAILURE'
            ]
        }
    }
}

export function login(username,password) {
  console.log(username,password)
    return {
        [CALL_API]: {
            endpoint: 'http://localhost:9000/login/',
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username : username,
                password: password
            }),
            types: [
                types.LOGIN_REQUEST,
                {
                    type: types.LOGIN,
                    payload: (action, state, res) => {
                        return res.json();
                    }
                },
                'FAILURE'
            ]
        }
    }
}

export function user(id) {
    return {
        [CALL_API]: {
            endpoint: 'http://localhost:9000/login/',
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: id
            }),
            types: [
                types.FETCH_USER,
                {
                    type: types.FETCH_USER_SUCCESS,
                    payload: (action, state, res) => {
                        return res.json();
                    }
                },
                'FAILURE'
            ]
        }
    }
}

export function prenotation(id,startDate,endDate) {
  console.log(endDate)
    return {
        [CALL_API]: {
            endpoint: 'http://localhost:9000/api/prenotation',
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: id,
                startDate: startDate,
                endDate: endDate
            }),
            types: [
                types.PRENOTATIONHOUSE_REQUEST,
                {
                    type: types.PRENOTATIONHOUSE_SUCCESS,
                    payload: (action, state, res) => {
                        return res.json();
                    }
                },
                'FAILURE'
            ]
        }
    }
}
