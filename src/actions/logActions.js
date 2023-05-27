import axios from "axios";
import { GET_LOGS, ADD_LOG, LOGS_ERROR, SET_LOADING, DELETE_LOG, SET_CURRENT, CLEAR_CURRENT, UPDATE_LOG, SEARCH_LOGS } from "./types"

// Get logs
export const getLogs = () => async dispatch => {
    try {
        setLoading();
        const res = await axios.get('/logs');
        dispatch({
            type: GET_LOGS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: LOGS_ERROR,
            payload: error.response.data
        })
    }
}

// Add new log
export const addLog = (data) => async dispatch => {
    try {
        const headers = {
            "Content-Type": "application/json"
        };

        setLoading();
        const res = await axios.post('/logs', data, headers);
        dispatch({
            type: ADD_LOG,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: LOGS_ERROR,
            payload: error.response.data
        })
    }
}

// Delete a log
export const deleteLog = id => async dispatch => {
    try {
        setLoading();
        await axios.delete(`/logs/${id}`);
        dispatch({
            type: DELETE_LOG,
            payload: id
        });
    } catch (error) {
        dispatch({
            type: LOGS_ERROR,
            payload: error.response.data
        })
    }
}

// Update a log
export const updateLog = log => async dispatch => {
    const headers = {
        "Content-Type": "application/json"
    };
    try {
        setLoading();
        const res = await axios.put(`/logs/${log.id}`, log, headers);
        dispatch({
            type: UPDATE_LOG,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: LOGS_ERROR,
            payload: error.response.data
        })
    }
}

// Search logs
export const searchLogs = text => async dispatch => {
    try {
        setLoading();
        const res = await axios.get(`/logs?q=${text}`);
        dispatch({
            type: SEARCH_LOGS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: LOGS_ERROR,
            payload: error.response.data
        })
    }
}

// Set current log 
export const setCurrent = (log) => {
    return {
        type: SET_CURRENT,
        payload: log
    };
}

// Clear current log 
export const clearCurrent = () => {
    return {
        type: CLEAR_CURRENT
    };
}


// Set loading to true
export const setLoading = () => {
    return {
        type: SET_LOADING
    };
}