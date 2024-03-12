import React, { createContext, useContext, useState } from "react";



interface FilterContextType {
    stops: any; // Define a more specific type if possible
    setStops: React.Dispatch<React.SetStateAction<any>>; // Adjust the type according to what you store in 'stops'
  }

  export const FilterContext = createContext<FilterContextType | undefined>(undefined);

  export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [stops, setStops] = useState({});
    return (
      <FilterContext.Provider value={{ stops, setStops }}>
        {children}
      </FilterContext.Provider>
    );
  };
export const  useStopContext =()=>useContext(FilterContext)
