"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import axios from "axios";

//* icons
import { ArrowLeftRight, Plane, Check } from "lucide-react";
import React, { useEffect, useState } from "react";

//* custom components
import RadioButton from "./RadioButton";
import HeroContent from "./HeroContent";
import HeroContentSecond from "./HeroContentSecond";

import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

//* shadcn ui

import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import toast from 'react-hot-toast'
import axiosinstance from "@/axiosinstance";

//* Var
const datas = [
  {
    icon: Plane,
    label: "Flights",
    color: "text-blue-500",
    bgColor: "text-blue-900/10",
  },
];
const labels = [
  {
    label: "One way",
  },
  {
    label: "Round trip",
  },
];

const heroLabel = [
  {
    label: "Regular Fares ",
  },
  {
    label: "Armed Forces Fares ",
  },
  {
    label: "Student Fares",
  },
  {
    label: "Senior Citizen Fares",
  },
  {
    label: "Doctors & Nurses Fares",
  },
  {
    label: "Double Seat Fares",
  },
];

interface City {
  cityName: string;
  AirPortcode: string;
  AirportName: string;
}

const HeroPage = () => {
  const [select, setSelect] = useState<string>("One way");
  const [selectdown, setSelectdown] = useState<string>(" Regular Fares");

  //* HeroContentSecond functionality
  const today = new Date();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: today,
    to: today || addDays(today, 20),
  });
  const disabledDays = { before: new Date() };

  const getDayOfWeek = (date: Date): string => {
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };
  const fromDateString = date?.from
    ? date.from.toLocaleDateString("en-US")
    : "";
  const toDateString = date?.to ? date.to.toLocaleDateString("en-US") : "";

  //* popover open and close
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  //*   Arrival city select
  const [FromCity, setCity] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City>({
    cityName: "Delhi",
    AirPortcode: "DEL",
    AirportName: "Indira Gandhi Airport",
  });

  //* Destination city select
  const [ToCity, setToCity] = useState<City[]>([]);
  const [destinationcity, setdestinationcity] = useState<City>({
    cityName: "Mumbai",
    AirPortcode: "BOM",
    AirportName: "Mumbai Airport India",
  });

  const stateChange = () => {
    setSelectedCity({ ...destinationcity });
    setdestinationcity({ ...selectedCity });
  };

  //* arrival city select function
  const handleCitySelection = (city: City) => {
    setSelectedCity(city);
    setOpen(false);
  };
  // * destination city select function
  const handleCityDestinationSelection = (city: City) => {
    setdestinationcity(city);
    setOpen1(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosinstance.get('/displaydata');  
        console.log(response.data,">>>>>>>>>>.")
        const FromData = response.data.source;
        const ToData = response.data.destination;
        const FromAirlines = FromData?.map((value: any) => ({
          cityName: value.airport.cityName,
          AirPortcode: value.airport.airportCode,
          AirportName: value.airport.airportName,
        }));
        const ToAirlines = ToData?.map((value: any) => ({
          cityName: value.airport.cityName,
          AirPortcode: value.airport.airportCode,
          AirportName: value.airport.airportName,
        }));
        setCity(FromAirlines);
        setToCity(ToAirlines)
        toast.success("Welcome, Search Your Flights")
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  return (
    <div className="flex items-center flex-col relative w-full bg-white mx-auto px-20 space-y-2 ">
      <div className="relative top-12 w-fit rounded-md flex items-center justify-center p-4 shadow-2xl gap-x-2">
        {datas?.map((data) => (
          <div
            key={data.label}
            className={cn("flex flex-col items-center", data.bgColor)}
          >
            <Plane className={cn("w-24 lg:w-28 h-14 rounded-md", data.color)} />
            <p className="text-md lg:text-lg font-semibold text-blue-400">
              {data.label}
            </p>
          </div>
        ))}
      </div>
      <div className="relative bottom-5 shadow-2xl w-full">
        <RadioButton
          labels={labels}
          className="mt-10"
          sidelabel="Book International and Domestic Flights"
          setSelect={setSelectdown}
        />
        <div className="flex items-center">
          {/* From City */}
          <Popover open={open} onOpenChange={setOpen}>
            <div className="flex items-center">
              <PopoverTrigger asChild>
                <div className="flex items-center">
                  {/* HeroContent  */}
                  <HeroContent value={selectedCity} label="From" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0  z-50 relative">
                <div className="scroll-container overflow-hidden items-center fixed -top-20 -left-[125px] h-auto w-[230px] bg-white">
                  <Command>
                    <CommandInput placeholder="Search arrival..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    {FromCity?.map((city, index) => (
                      <CommandGroup key={index}>
                        <div
                          
                          className=" flex items-center"
                          onClick={() => handleCitySelection(city)}
                        >
                          <CommandItem
                            key={city.cityName}
                            value={city.cityName}
                          >
                            {city.cityName}
                          </CommandItem>

                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedCity.cityName === city.cityName
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </div>
                      </CommandGroup>
                    ))}
                  </Command>
                </div>
              </PopoverContent>
            </div>
          </Popover>

          {/* To City */}
          <Popover open={open1} onOpenChange={setOpen1}>
            <div className="flex items-center">
              <PopoverTrigger asChild>
                <div className="flex items-center">
                  {/* HeroContent  */}
                  <HeroContent value={destinationcity} label="To" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0  z-[50] relative">
                <div className="scroll-container overflow-hidden items-center fixed -top-20 -left-[110px] h-auto w-[230px] bg-white">
                  <Command>
                    <CommandInput placeholder="Search arrival..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {ToCity?.map((city, index) => (
                        <div
                          className=" flex items-center  "
                          key={index}
                          onClick={() => handleCityDestinationSelection(city)}
                        >
                          <CommandItem
                            key={city.cityName}
                            value={city.cityName}
                            className=" my-1"
                          >
                            {city.cityName}
                          </CommandItem>

                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              destinationcity.cityName === city.cityName
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </div>
                      ))}
                    </CommandGroup>
                  </Command>
                </div>
              </PopoverContent>
            </div>
          </Popover>

          <HeroContentSecond
            date={date}
            setDate={setDate}
            disabledDates={disabledDays}
            getDayOfWeek={getDayOfWeek}
            today={today}
          />
        </div>

        <div className="relative bottom-[90px] left-[270px] inline-block">
          <button
            type="button"
            onClick={stateChange}
            className="rounded-full bg-white shadow-lg z-[100] "
          >
            <ArrowLeftRight className="text-blue-500 w-full h-full p-2" />
          </button>
        </div>

        <RadioButton
          labels={heroLabel}
          title="Select A Fare Type"
          className="bg-blue-50 w-fit p-2 mx-5 text-xs mb-10"
          setSelect={setSelect}
        />
      </div>

      <div className="hidden relative bottom-12 w-full md:flex items-center justify-center">
        <Link
          href={`/flights?selectedcity=${selectedCity.cityName}&destinationcity=${destinationcity.cityName}&fromdatastring=${fromDateString}&todatastring=${toDateString}&selectdown=${selectdown}&select=${select}`}
        >
          <Button
            className="px-14 rounded-full text-2xl font-semibold py-3 bg-blue-400"
            size={"lg"}
          >
            Search
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroPage;
