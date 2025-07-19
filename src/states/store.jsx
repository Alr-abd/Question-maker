import { configureStore } from "@reduxjs/toolkit";
import featuresReducer from "./features";
import currentQContentReducer from "./currentQContent";
import mainQContentReducer from "./mainQContent";

const store = configureStore({
    reducer: {
        features: featuresReducer,
        currentQContent: currentQContentReducer,
        mainQContent: mainQContentReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export default store