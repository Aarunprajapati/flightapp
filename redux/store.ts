import { configureStore } from '@reduxjs/toolkit';
import flightsReducer from './reducers/flightsSlice';

const store = configureStore({
  reducer: {
    flight: flightsReducer,
  },
});

export default store;