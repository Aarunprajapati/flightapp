"use client";
import Link from "next/link";

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
} from "@/components/ui/popover";
import toast from "react-hot-toast";
import axiosinstance from "@/axiosinstance";
import { useSession } from "next-auth/react";

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
  const { data: session, status } = useSession();
  // console.log(session, "HeroPage")

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
        const response = await axiosinstance.get("/displaydata");
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
        setToCity(ToAirlines);
        toast.success("Welcome, Search Your Flights");
      } catch (error) {
        toast.error("Failed to fetch cities");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (session?.user) {
          const response = await axiosinstance.post(
            "/googleUser",
            session.user,
          );
          if (response.data.success) {
            toast.success("user successfully created");
          } else if (response.data.error) {
            toast.error(response.data.error);
          }
        }
      } catch (error: any) {
        console.error(error.message);
      }
    })();
  }, [status, session]);

  return (
    <div className="flex flex-col items-center relative w-full bg-white mx-auto px-4 sm:px-6 lg:px-20 space-y-2">
      <div className="top-12 w-fit rounded-md flex items-center justify-center p-4 shadow-2xl gap-x-2">
        {datas?.map((data) => (
          <div
            key={data.label}
            className={`flex flex-col items-center ${data.bgColor}`}
          >
            <Plane
              className={`w-16 sm:w-24 lg:w-28 h-10 sm:h-14 rounded-md ${data.color}`}
            />
            <p className="text-sm sm:text-md lg:text-lg font-semibold text-blue-400">
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
        <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className=" flex">
            {/* From City */}
            <Popover open={open} onOpenChange={setOpen}>
              <div className="flex items-center">
                <PopoverTrigger asChild>
                  <div className="flex items-center">
                    <HeroContent value={selectedCity} label="From" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 z-50 relative">
                  <div className="scroll-container overflow-hidden items-center fixed top-[-42px] left-[-85px] w-[153px] h-auto lg:w-[230px] bg-white">
                    <Command>
                      <CommandInput placeholder="Search arrival..." />
                      <CommandEmpty>No framework found.</CommandEmpty>
                      {FromCity?.map((city, index) => (
                        <CommandGroup key={index}>
                          <div
                            className="flex items-center"
                            onClick={() => handleCitySelection(city)}
                          >
                            <CommandItem
                              key={city.cityName}
                              value={city.cityName}
                            >
                              {city.cityName}
                            </CommandItem>

                            <Check
                              className={`mr-2 h-4 w-4 ${selectedCity.cityName === city.cityName ? "opacity-100" : "opacity-0"}`}
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
                    <HeroContent value={destinationcity} label="To" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 z-50 relative">
                  <div className="scroll-container overflow-hidden items-center fixed top-[-41px] left-[-90px]  w-[153px] h-auto lg:w-[230px] bg-white">
                    <Command>
                      <CommandInput placeholder="Search arrival..." />
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {ToCity?.map((city, index) => (
                          <div
                            className="flex items-center"
                            key={index}
                            onClick={() => handleCityDestinationSelection(city)}
                          >
                            <CommandItem
                              key={city.cityName}
                              value={city.cityName}
                              className="my-1"
                            >
                              {city.cityName}
                            </CommandItem>

                            <Check
                              className={`mr-2 h-4 w-4 ${destinationcity.cityName === city.cityName ? "opacity-100" : "opacity-0"}`}
                            />
                          </div>
                        ))}
                      </CommandGroup>
                    </Command>
                  </div>
                </PopoverContent>
              </div>
            </Popover>
          </div>

          <HeroContentSecond
            date={date}
            setDate={setDate}
            disabledDates={disabledDays}
            getDayOfWeek={getDayOfWeek}
            today={today}
          />
        </div>

        <div className=" absolute hidden bottom-[500px]  left-[150px] md:bottom-[427px] md:left-[338px]  lg:bottom-[216px] lg:left-[264px] md:inline-block lg:inline-block">
          <button
            type="button"
            onClick={stateChange}
            className="rounded-full bg-white shadow-lg"
          >
            <ArrowLeftRight className="text-blue-500 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 p-2" />
          </button>
        </div>
        <div className="bg-blue-50 w-full px-4 py-3 mx-auto my-4 sm:w-auto sm:mx-6 sm:my-6 md:px-6 md:py-4 md:mb-8 text-xs sm:text-sm md:text-base lg:text-sm">
          <RadioButton
            labels={heroLabel}
            title="Select A Fare Type"
            setSelect={setSelect}
          />
        </div>
      </div>

      <div className="relative bottom-12 w-full flex justify-center">
        <Link
          href={`/flights?selectedcity=${selectedCity.cityName}&destinationcity=${destinationcity.cityName}&fromdatastring=${fromDateString}&todatastring=${toDateString}&selectdown=${selectdown}&select=${select}`}
        >
          <Button
            className="px-10 lg:px-14 rounded-full text-lg lg:text-2xl font-semibold py-2 lg:py-3 bg-blue-400"
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
