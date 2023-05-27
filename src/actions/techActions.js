import axios from 'axios';
import { GET_TECHS,  TECHS_ERROR, SET_LOADING, ADD_TECH, DELETE_TECH } from './types' 


// Get logs from server
export const getTechs = () => async dispatch => {
    try {
        setLoading();
        const res = await axios.get('/techs');
        dispatch({
            type: GET_TECHS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: TECHS_ERROR,
            payload: error.response.data
        })
    }
}

// Add new tech in DB
export const addTech = (data) => async dispatch => {
    try {
        const headers = {
            "Content-Type": "application/json"
        };

        setLoading();
        const res = await axios.post('/techs', data, headers);
        dispatch({
            type: ADD_TECH,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: TECHS_ERROR,
            payload: error.response.data
        })
    }
}

// Delete a tech from DB
export const deleteTech = id => async dispatch => {
    try {
        setLoading();
        await axios.delete(`/techs/${id}`);
        dispatch({
            type: DELETE_TECH,
            payload: id
        });
    } catch (error) {
        dispatch({
            type: TECHS_ERROR,
            payload: error.response.data
        })
    }
}


// Set loading to true
export const setLoading = () => {
    return {
        type: SET_LOADING
    };
}