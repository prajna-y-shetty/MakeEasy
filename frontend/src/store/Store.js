import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer from './reducers/authReducer';

function store() {
    return configureStore({
        reducer:{
           auth: authReducer
        },
        middleware: [thunk]
    })

}

export default store;