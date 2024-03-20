"use client"
import { formSchema } from '@/Schemas/FormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, {useContext, useEffect, useState } from 'react'
import { useForm} from 'react-hook-form';
import * as z  from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import {  CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { ScrollArea } from '../ui/scroll-area'
import  instance from "@/axiosinstance"
import { useDispatch } from 'react-redux';
 import { setFlights } from '@/redux/reducers/flightsSlice';
import { useSearchParams } from 'next/navigation';
 interface SearchFormProps{
    setLocation: React.Dispatch<React.SetStateAction<string>>
    setLocationR: React.Dispatch<React.SetStateAction<string>>
 }

const SearchForm = ({setLocation, setLocationR}: SearchFormProps)  => {
    const searchParams = useSearchParams();
    const selectedcity = searchParams.get("selectedcity")
    const destinationcity = searchParams.get("destinationcity")
    const fromdatastring = searchParams.get("fromdatastring")
    const todatastring = searchParams.get("todatastring")

    const select = searchParams.get("select")
    console.log(select, "select")
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [date1, setDate1] = useState<Date | undefined>(undefined);
    const [data, setData] = useState<[]>([])
    const [data1, setData1] = useState<[]>([])

    const dispatch = useDispatch();
    const  form  = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            select: '',
            location: selectedcity || '',     
            locationR:destinationcity || '', 
            fromDate:  fromdatastring ? new Date(fromdatastring) : "", 
            toDate: todatastring? new Date(todatastring) : "",
            adults: '1' || "",
            children: '0' || "",
        },
    });


      useEffect(()=>{
        // api used for the search city
        (async ()=>{
            try {
            const res = await instance.get('/sourcecity');
            const  airportdata =   res.data.sourceAirports;
              const airports = airportdata?.map((value:string) =>(value))          
                setData(airports)
            } catch (error) {   
                console.error('Error fetching data:', error);
            }
        })()
                
        // api used for the destination city
       ;(async () => {
        try {
            const res1 = await instance.get('/destinationcity');
       const  airportdata1 =   res1.data.sourceAirports1;
          const airports1 = airportdata1?.map((value:string) =>(value))
            setData1(airports1)
        } catch (error) {   
            console.error('Error fetching data:', error);
        }
    })();
      },[]);

    
    
    //* functions used after the  submit  button
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const { location, locationR } = values;
            setLocation(location);
            setLocationR(locationR);
            const res = await instance.get(`/matchingData?location=${location}&locationR=${locationR}`);
            let res1 = res.data;
            if (res1.length === 0) {
                console.log("No data found");
            } else {
                dispatch(setFlights(res1)) 
            }
        } catch (error: any) {
            console.error(error.response?.data?.error || "An unexpected error occurred");
        }
    };

  return (
    
        <div className=' w-full space-y-2 my-5'>
            {/* components used to search the flight  */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col lg:flex-row  items-center lg:max-w-[1400px] lg:mx-auto space-y-4 lg:space-y-0 space-x-0 lg:space-x-2 rounded-lg '>
                   {/* select the route  */}
                    <div className='grid gap-1.5 justify-start lg:max-w-sm items-center '>
                       <FormField
                       control={form.control}
                       name="select"
                       render={({field})=>(
                        <FormItem>
                            <FormLabel className=' flex text-black'>Route</FormLabel>
                            <FormControl className='border-none outline-none ring-1 ring-blue-600 rounded-sm'>
                                <div className='w-[150px] flex items-center space-y-5'>
                                <Select
                                defaultValue={select || ''}
                                 value={field.value}
                                 onValueChange={(value) => {
                                   field.onChange(value);
                                 }}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="One Way" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="One Way" className=' text-black focus:bg-blue-500 focus:text-white'>One way</SelectItem>
                                        <SelectItem value="Rounded trip" className='text-black focus:bg-blue-500 focus:text-white'>Rounded trip</SelectItem>           
                                    </SelectContent>
                                </Select>
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                       )}                    
                       />     
                    </div>
                     {/* source city location */}
                    <div className='grid w-full gap-1.5 lg:max-w-sm items-center'>
                    <FormField
                      control={form.control}
                      name='location'
                      render={({ field: {...field } }) => ( 
                      <FormItem>
                      <FormLabel className='flex text-black'>From</FormLabel>
                    
                     
                     <FormControl className='border-none outline-none ring-1 ring-blue-600 rounded-sm'>
                                <div className='w-[150px] flex items-center space-y-5'>
                                <Select
                                 value={field.value}
                                 onValueChange={(value) => {
                                   field.onChange(value);
                                 }}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="from" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <ScrollArea className=" h-64 w-36 rounded-md ">
                                        {/* <SelectItem value="One Way" className=' text-black focus:bg-blue-500 focus:text-white'>One way</SelectItem>      */}
                                        {data.map((city, index) => (
                                               <SelectItem
                                               key={index}
                                                   value={city}
                                                   className='text-black focus:bg-blue-500 focus:text-white'
                                               >
                                                   {city}
                                               </SelectItem>
                                           ))}
                                    </ScrollArea>
                                    </SelectContent>
                                </Select>
                                </div>
                            </FormControl>
                    
                      <FormMessage />
                      </FormItem>
                     )}
                    />
                    </div>
                    {/* destination city location */}
                    <div className='grid w-full gap-1.5 lg:max-w-sm items-center'>
                    <FormField
                      control={form.control}
                      name='locationR'
                      render={({ field: {...field } }) => ( 
                      <FormItem>
                      <FormLabel className='flex text-black'>To</FormLabel>
                      <FormControl className='border-none outline-none ring-1 ring-blue-600 rounded-sm'>
                                <div className='w-[150px] flex items-center space-y-5'>
                                <Select
                                 value={field.value}
                                 onValueChange={(value) => {
                                   field.onChange(value);
                                 }}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="To" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <ScrollArea className=" h-64 w-36 rounded-md ">
                                        {data1.map((city, index) => (
                                               <SelectItem
                                               key={index}
                                                   value={city}
                                                   className='text-black focus:bg-blue-500 focus:text-white'
                                               >
                                                   {city}
                                               </SelectItem>
                                           ))}
                                    </ScrollArea>
                                    </SelectContent>
                                </Select>
                                </div>
                            </FormControl>
                      <FormMessage />
                      </FormItem>
                     )}
                    />
                    </div>
                    {/*  date of journey */}
                     <div className='grid gap-1.5 lg:max-w-sm items-center w-[250px] mx-2'>
                           <FormField
                           control={form.control}
                           name='fromDate'
                           render={( {field} )=>(
                                <FormItem >
                                    <FormLabel className=' flex text-black'>Onward</FormLabel>
                                   
                                    <FormControl className='border-none outline-none ring-1 ring-blue-600 rounded-sm '>
                                    <div className={cn("grid gap-2",)}>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <Button
                                            id="date"
                                            variant={"outline"}
                                            className={cn(
                                            "justify-start text-left font-normal",
                                            "text-muted-foreground"
                                            )}
                                        
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                            
                                        </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                                initialFocus
                                                mode="single"
                                                // selected={fromDate}
                                                onSelect={(selectedDate) => {
                                                    setDate(selectedDate); 
                                                    field.onChange(selectedDate); 
                                                }}
                                                numberOfMonths={2}
                                                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                            />
                                        </PopoverContent>
                                    </Popover>
                            </div>

                                    </FormControl>
                                </FormItem>
                           )}


                           />
                    </div>
                    {/* return date */}
                    <div className='grid gap-1.5 lg:max-w-sm items-center max-w-[250px] mx-2'>
                           <FormField
                           control={form.control}
                           name='toDate'
                           render={( {field} )=>(
                                <FormItem >
                                    <FormLabel className=' flex text-black'>Return</FormLabel>
                                   
                                    <FormControl className=' border-none outline-none ring-1 ring-blue-600 rounded-sm'>
                                    <div className={cn("grid gap-2",)}>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <Button
                                            id="date"
                                            variant={"outline"}
                                            className={cn(
                                            "justify-start text-left font-normal",
                                            "text-muted-foreground"
                                            )}
                                        
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                            
                                        </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                                initialFocus
                                                mode="single"
                                                // selected={field.value}
                                                onSelect={(selectedDate) => {
                                                    setDate1(selectedDate); 
                                                    field.onChange(selectedDate); 
                                                }}
                                                numberOfMonths={2}
                                                disabled={(date1) => date1 < new Date(new Date().setHours(0, 0, 0, 0))}
                                            />
                                        {/* <Calendar selected={date} onSelect={setDate} /> */}
                                        </PopoverContent>
                                    </Popover>
                            </div>
                            {/* <FormMessage/> */}
                                    </FormControl>
                                </FormItem>
                           )}


                           />
                    </div>
                      {/*family members   */}
                    <div className=' flex items-center w-full space-x-2'>
                    <div className=' grid items-center flex-1'>
                            <FormField
                            control={form.control}
                            name='adults'
                            render={({ field: {...field } })=>(
                            <FormItem>
                            <FormLabel className=' flex text-black'>Adults</FormLabel>
                           
                            <FormControl className=' border-none outline-none ring-1 ring-blue-600 rounded-sm'>               
                                <Input placeholder='No of adults' type='text' {...field} />
                            </FormControl>
                            <FormMessage/>                 
                            </FormItem>
                            )}
                    />
                    </div>
                    
                    </div>

                    <div className='flex items-center w-full space-x-2'>
                    <div className=' grid items-center flex-1'>
                        <FormField
                        control={form.control}
                        name='children'
                        render={({ field: {...field } })=>(
                        <FormItem>
                        <FormLabel className=' flex text-black'>Childrens</FormLabel>
                        
                        <FormControl className=' border-none outline-none ring-1 ring-blue-600 rounded-sm'>           
                            <Input placeholder='no of childrens' type='text' {...field} />
                        </FormControl> 
                        <FormMessage/>                
                        </FormItem>
                        )}
                        />                    
                    
                    
                    </div>
                    </div>
                   
                    <div className='flex items-center  space-x-2'>
                        <div className=' grid items-center flex-1 mt-5'>
                           <Button type='submit'>Search</Button>
                        </div>
                    </div> 
                </form>
            </Form>
        </div>
  );
};                     

export default SearchForm
