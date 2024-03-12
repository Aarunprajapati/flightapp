import React, { createContext, useContext, useState } from 'react';


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
    _id: string;
    id: string;
    fare: number;
    __v: number;
    displayData: DisplayData;
  }
  

  interface FlightContextType {
    flyData: Flight[];
    setFlyData: React.Dispatch<React.SetStateAction<Flight[]>>; 
  }

  export const FlightContext = createContext<FlightContextType | null>(null);

  export const FlightProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [flyData, setFlyData] = useState<Flight[]>([]);

    return (
      <FlightContext.Provider value={{ flyData, setFlyData  }}>
        {children}
      </FlightContext.Provider>
    );
  };
  export const useFlightContext = (): FlightContextType => {
    const context = useContext(FlightContext);
    if (!context) {
      throw new Error('useFlightContext must be used within a FlightProvider');
    }
    return context;
  };




  