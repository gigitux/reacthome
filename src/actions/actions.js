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
  console.log("ggg")
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
            endpoint: 'http://localhost:9000/api/user/',
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
  console.log("ggg")
    return {
        [CALL_API]: {
            endpoint: 'http://localhost:9000/api/login/',
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username : username,
                password: password
            }),
            types: [
                types.LOGIN,
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
