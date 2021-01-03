import axios from "axios";
import * as constants from "./constants";
import { logoutUser } from "./actions/authActions"

export const apiMiddleware = ({ dispatch, getState }) => next => action => {
    if(action.type !== constants.API) return next(action);

    const BASE_URL = "http://localhost:5000";
    const AUTH_TOKEN = getState().user.token;

    if (AUTH_TOKEN) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${AUTH_TOKEN}`
    }

    const { url, method, success, data, postProcessSuccess, postProcessError } = 
    action.payload;
    
    console.log(url);
    console.log(method);

    axios({
        method,
        url: BASE_URL + url,
        data: data ? data : null
    })
    .then(response => { 
   
        if(success) dispatch(success(response.data));
        if(postProcessSuccess) postProcessSuccess(response.data)
    }).catch(err => {
        
        if(!err.response) console.warn(err);
        else{
            if(err.response && err.response.status === 403)
                dispatch(logoutUser());
            if(err.response.data.error.message) {
                if(postProcessError) postProcessError(err.response.data.error.message);
            }
        }
    })
}