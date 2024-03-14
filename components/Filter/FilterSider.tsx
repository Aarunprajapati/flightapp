  import React from 'react';
  import { ChevronDown } from 'lucide-react';
  import { Checkbox } from '../ui/checkbox';
  import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setFilterFlights } from '@/redux/reducers/flightsSlice';


  interface Filter {
    label?: string;
    value1?: string;
    value2?: string;
    time1?: string;
    time2?: string;
    value3?: string;
    value4?: string;
    value5?: string;
    value6?: string;
    price1?: string;
    price2?: string;
    price3?: string;
    price4?: string;
    price5?: string;
    price6?: string;

  }
 
  interface FilterProps {
    filter?: Filter[];
 
  }

  const FilterSider: React.FC<FilterProps> = ({ filter}) => {

    const dispatch = useDispatch();
    const filters = useSelector((state: RootState) => state.flights);
         
    const applyFilters = () => {
      let filteredData = [...filters];

      setFilterFlights(filteredData);
    };

    const handleCheckboxChange = (value: string) => {
      dispatch(setFilterFlights({ ...filters }));

    };

    const handleCheckbox2Change = (value: string) => {
      dispatch(setFilterFlights({ ...filters }));

    };

    // Add other checkbox change handlers...

    return (
      <div className='w-full bg-white rounded-lg grid gap-2'>
        <Accordion type="single" collapsible>
          {filter?.map(item => (
            <AccordionItem value={`item-${item.label}`} key={item.label}>
              <AccordionTrigger className='no-underline hover:no-underline font-semibold text-xs text-foreground mx-2 w-full flex justify-between items-center'>
                {item.label}
                <ChevronDown className='text-gray-400 font-extralight text-xs'/>
              </AccordionTrigger>

              <AccordionContent className='shadow-md'>
                <div className="flex items-center justify-between py-4 w-full hover:bg-blue-50 rounded-lg">
                  <div className='flex items-center'>
                    <Checkbox
                      id={`non-stop-${item.label}`}
                      value={item.value1}
                      onClick={() => handleCheckboxChange(item.value1 || '')}
                      className='mx-2'
                    />
                    <label htmlFor={`non-stop-${item.label}`} className="text-[13px] ml-2">
                      {item.value1}
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between py-4 w-full hover:bg-blue-50 rounded-lg">
                  <div className='flex items-center'>
                    <Checkbox
                      id={`non-stop-${item.label}`}
                      value={item.value2}
                      onClick={() => handleCheckbox2Change(item.value2 || '')}
                      className='mx-2'
                    />
                    <label htmlFor={`non-stop-${item.label}`} className="text-[13px] ml-2">
                      {item.value2}
                    </label>
                  </div>
                </div>

                {/* Add more checkbox inputs as needed... */}

              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  };

  export default FilterSider;
