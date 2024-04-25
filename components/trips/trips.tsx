/* eslint-disable no-console */
/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable @next/next/no-img-element */
"use client";
import axiosinstance from "@/axiosinstance";
import { useEffect, useState } from "react";

interface Booking {
  members: {
    firstName: string;
    lastName: string;
    Gender: string;
  }[];
  email: string;
  phone: string;
  fare: string;
}

interface FlightDetail {
  airlines: {
    airlineName: string;
    flightNumber: string;
  }[];
  source: {
    airport: {
      cityName: string;
    };
    depTime: string;
  };
  destination: {
    airport: {
      cityName: string;
    };
    arrTime: string;
  };
}

const Trips = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [flightDetails, setFlightDetails] = useState<FlightDetail[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosinstance.get("/userDeatils");
        const { bookings, flightDetails } = res.data;
        setBookings(bookings);
        setFlightDetails(flightDetails);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mx-3   md:mx-10">
      {bookings.map((booking, index) => (
        <div
          key={index}
          className="border-2 border-gray-200 my-2 lg:mx-10 lg:p-5"
        >
          <div className="gap-8">
          <div>
              <p className="flex font-bold justify-center">Traveller details</p>
              {booking.members.map((member, memberIndex) => (
                <div key={memberIndex} className="flex justify-between">
                  <p className="font-bold">Member {memberIndex + 1}:</p>
                  <div>
                    <p className="font-bold">Name:</p>
                    <p>{`${member.firstName} ${member.lastName}`}</p>
                  </div>
                  <div>
                    <p className="font-bold">Gender:</p>
                    <p>{member.Gender}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
            <div>  <p className="font-bold">Email: </p><p>{booking.email} </p></div>
            <div>  <p className="font-bold">Phone number: </p><p>{booking.phone} </p></div>
            </div>
          </div>
          {flightDetails.length > index && (
            <div className="w-full md:flex-row inline-flex p-4 lg:flex-row lg:gap-2 justify-between lg:justify-between items-center">
              <div className="flex gap-2 items-center">
                <div className="py-1">
                  <img className="w-8 h-8" src="/flight.svg" alt="flight" />
                </div>
                <div className="grid">
                  <p className="text-base ">
                    {flightDetails[index].airlines[0].airlineName}
                  </p>
                  <p className="text-xs">
                    {flightDetails[index].airlines[0].flightNumber}
                  </p>
                </div>
              </div>
              <div className="text-lg  font-bold  md:mx-10">{`${flightDetails[index].source.airport.cityName}`}</div>
              <div className="relative grid text-xs md:w-1/4lg:ms-8 md:ms-4">
                <p>{flightDetails[index].source.depTime.slice(11, 16)}</p>
                <div className="w-16 me-4 h-1 bg-neutral-400"></div>
                <p>{flightDetails[index].destination.arrTime.slice(11, 16)}</p>
              </div>
              <div className="text-lg font-bold  md:mx-5">{flightDetails[index].destination.airport.cityName}</div>
              <div className="font-bold md:mx-5">₹{booking.fare}</div>
              <div></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Trips;
