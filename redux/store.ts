import { configureStore } from '@reduxjs/toolkit';
import flightsReducer from './reducers/flightsSlice';

const store = configureStore({
  reducer: {
    flights: flightsReducer,
  },
});

export default store;