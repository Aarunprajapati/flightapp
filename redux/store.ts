import { configureStore } from '@reduxjs/toolkit';
import flightsReducer from './reducers/flightsSlice';

export const store = configureStore({
  reducer: {
    flights: flightsReducer, // Ensure this key matches what you use in your useSelector hook
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
