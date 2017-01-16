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

export function postHouse(id,title,andress,photo,category,location) {
    return {
        [CALL_API]: {
            endpoint: 'http://localhost:9000/api/house',
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: id,
                title: title,
                andress: andress,
                photo: photo
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
                    type: types.FETCHONEHOUSE_REQUEST,
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
