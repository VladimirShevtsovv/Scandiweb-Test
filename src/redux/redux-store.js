import {combineReducers, configureStore, createStore} from "@reduxjs/toolkit";
import toolkitSlice from "./toolkitSlice";

// assume that the counter slice will be combined with other slices
const rootReducer = combineReducers({
    toolkit: toolkitSlice
});

// create the store from the combined reducer
const store = configureStore({
    reducer: rootReducer
})

export default store;

// // typescript type for the combined state
// export type State = ReturnType<typeof reducer>;
