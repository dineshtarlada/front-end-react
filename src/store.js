import { configureStore } from "@reduxjs/toolkit";

import employee from "./store/reducers/employee";

export default configureStore({
    reducer: {employee} //all reducers go here 
})