"use client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


//  Date carousel component which is shown above the flight data 
const FlightDate = () => {
  return (
    <Carousel
    opts={{
      align: "end",
    }}
    className=" ml-[92px] w-full max-w-2xl"
  >
    <CarouselContent>
      {Array.from({ length: 20 }).map((_, index) => (
        <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/6 ">
          <div className="flex marker:items-center justify-center p-2 rounded-md">
            <div className='items-center gap-1 justify-center flex flex-col'>
              <div className=' grid  '>
                  <span className=' text-sm text-foreground font-normal'>Thu, 29 Feb</span>
                  <span className="text-xs text-foreground  font-light ">
                    {index + 1}299$
                    </span>
              </div>
            </div>
          
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
  )
}

export default FlightDate
