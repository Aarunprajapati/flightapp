
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Airport {
  cityCode: string;
  cityName: string;
  terminal: string;
  airportCode: string;
  airportName: string;
  countryCode: string;
  countryName: string;
}

interface DisplayData {
  source: {
    airport: Airport;
    depTime: string;
  };
  destination: {
    airport: Airport;
    arrTime: string;
  };
  airlines: {
    airlineCode: string;
    airlineName: string;
    flightNumber: string;
    _id: string;
  }[];
  stopInfo: string;
  totalDuration: string;
}

interface Flight {
  map(arg0: (flight: any, index: any) => import("react").JSX.Element): unknown;
  // map(arg0: (flight: any, innerIndex: any) => import("react").JSX.Element): import("react").ReactNode;
  _id: string;
  id: string;
  fare: number;
  __v: number;
  displayData: DisplayData;
}

interface FlightsState {
  flights: Flight[];
  bookingFlights: Flight[]
}

const initialState: FlightsState = {
  flights: [],
  bookingFlights: []
};

const flightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    setFlights: (state, action: PayloadAction<Flight[]>) => {
      state.flights = action.payload;
    },
    setBookingFlights: (state, action: PayloadAction<Flight[]>) => {
      state.bookingFlights = action.payload;
    },
  },
});

export const { setFlights,setBookingFlights } = flightsSlice.actions;
export default flightsSlice.reducer;
