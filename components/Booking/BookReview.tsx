"use client";
import React, { useEffect, useState } from "react";
//* icons
import {
  ArrowRight,
  Backpack,
  Briefcase,
  CalendarDays,
  ChevronDown,
  Clock5,
  Sofa,
  TvIcon,
  Utensils,
  WifiIcon,
  XSquare,
} from "lucide-react";
//* shadcn ui
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useSearchParams } from "next/navigation";
import instance from "@/axiosinstance";
import { useForm } from "react-hook-form";
import { useFormContext } from "./context/formcontext";
import toast from "react-hot-toast";

const BookReview = () => {
  const { handleFormNext, setFormData } = useFormContext();

  const [flights, setFlight] = useState<any>([]);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const handleNext = async (id: any) => {
    const prise = await instance.get(`/allflight/?id=${id}`);
    const fare = prise.data.flight[0].fare;
    handleFormNext();
    setFormData((prevFormData) => ({ ...prevFormData, id: id, fare: fare }));
  };

  const Bookreview = async () => {
    if (!id) return;

    try {
      const response = await instance.get(`/allflight/?id=${id}`);
      const res = Object.values(response.data);
      setFlight(res[0]);
    } catch (error) {
      toast.error("Flights not found");
    }
  };
  useEffect(() => {
    Bookreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!flights || flights.length === 0) {
    return (
      <div className=" text-2xl font-bold bg-gray-600 text-white p-4 my-10 rounded-md">
        No flights found
      </div>
    );
  }

  return (
    <>
      <div className="w-full p-4 my-8">
        {flights.map((flight: any, index: number) => (
          <div className="grid gap-4" key={index}>
            <div className="flex items-center gap-2 my-2">
              <div className="flex items-center">
                <h2 className="text-sm font-semibold">
                  {flight.displayData.source.airport.cityName}
                </h2>
                <ArrowRight className="w-4 h-4 text-foreground mx-1" />
                <h2 className="text-sm font-semibold">
                  {flight.displayData.destination.airport.cityName}
                </h2>
              </div>
              <p className="text-[10px] font-semibold bg-orange-100 text-black p-1 rounded-lg">
                ARRIVES NEXT DAY
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-5">
              <div>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="24" height="24" rx="4" fill="#FFF2EC" />
                  <path
                    d="M13.8347 14.1876C14.6034 15.358 15.5948 15.6892 16.5372 15.6892C17.0332 15.6892 17.5539 15.6449 18 15.5124V17.3232C17.4794 17.4336 16.9093 17.5 16.339 17.5C14.3305 17.5 13.2894 16.8376 12.0991 15.2476L12 15.1151L13.0167 13.0613L13.0505 13L13.091 13.0613L13.8347 14.1876Z"
                    fill="#FF6423"
                  />
                  <path
                    d="M12.0991 8.52593L12 8.65853L13.0122 10.6821C13.0153 10.6882 13.0186 10.6943 13.0219 10.7002L13.0507 10.75L13.091 10.6914L13.8347 9.60866C14.628 8.45973 15.5948 8.06193 16.5372 8.06193C17.0332 8.06193 17.5539 8.1062 18 8.2388V6.40474C17.4794 6.29406 16.9093 6.25 16.339 6.25C14.3305 6.25 13.2892 6.93514 12.0991 8.52593Z"
                    fill="#FF6423"
                  />
                  <path
                    d="M11.4 8.92743C10.4325 6.78986 9.21755 6.25 7.50735 6.25C6.99001 6.25 6.42739 6.33994 6 6.45242V8.25254C6.31491 8.13985 6.71997 8.09498 7.12482 8.09498C8.11484 8.09498 8.83481 8.47772 9.48737 9.78262L10.5313 11.8863L9.48737 13.9901C8.83481 15.2952 8.11484 15.655 7.12482 15.655C6.71997 15.655 6.31491 15.5876 6 15.4749V17.2974C6.31491 17.3873 6.76505 17.5 7.50735 17.5C9.21733 17.5 10.4548 16.9374 11.4 14.8449L12.75 11.8751L11.4 8.92743Z"
                    fill="#FF6423"
                  />
                </svg>
                <p className="w-20 text-xs text-foreground">
                  {flight.displayData.airlines[0].airlineCode}
                  {flight.displayData.airlines[0].airlineName}
                  {flight.displayData.airlines[0].flightNumber}
                </p>
              </div>
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-2xl text-black">
                    {flight.displayData.source.depTime.slice(11, 16)}
                  </p>
                  <p className="text-lg text-foreground">
                    {flight.displayData.source.airport.cityCode}
                  </p>
                  <p className="text-xs text-foreground">
                    {flight.displayData.source.airport.airportName},{" "}
                    {flight.displayData.source.airport.terminal}
                  </p>
                </div>
                <Clock5 className="w-4 h-5 text-foreground" />
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-2xl text-black">
                    {flight.displayData.destination.arrTime.slice(11, 16)}
                  </p>
                  <p className="text-lg text-foreground">
                    {flight.displayData.destination.airport.cityCode}
                  </p>
                  <p className="text-xs text-foreground">
                    {flight.displayData.destination.airport.airportName},{" "}
                    {flight.displayData.destination.airport.terminal}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid items-center">
              <div className="border-b border-gray-300 bg-blue-100 p-4">
                <div className="flex items-center gap-2">
                  <h1 className="text-sm font-bold">
                    {flight.displayData.source.airport.cityCode}
                  </h1>
                  <ArrowRight className="h-5 w-5" />
                  <h1 className="text-sm font-bold">
                    {flight.displayData.destination.airport.cityCode}: Standard
                    Fare
                  </h1>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center">
                    <Backpack className="w-6 h-6 mr-2" />
                    <p>20 kg check-in luggage</p>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="w-6 h-6 mr-2" />
                    <p>7 kg hand baggage</p>
                  </div>
                  <div className="flex items-center">
                    <Utensils className="w-6 h-6 mr-2" />
                    <p>Meal included</p>
                  </div>
                  <div className="flex items-center">
                    <Sofa className="w-6 h-6 mr-2" />
                    <p>Extra legroom seats</p>
                  </div>
                  <div className="flex items-center">
                    <TvIcon className="w-6 h-6 mr-2" />{" "}
                    {/* Assume you import or define TvIcon */}
                    <p>In-flight entertainment</p>
                  </div>
                  <div className="flex items-center">
                    <WifiIcon className="w-6 h-6 mr-2" />{" "}
                    {/* Assume you import or define WifiIcon */}
                    <p>WiFi available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button
        className="bg-blue-600 text-white py-2 px-4 sm:w-auto w-full"
        onClick={() => handleNext(id)}
      >
        Next
      </Button>
    </>
  );
};

export default BookReview;
