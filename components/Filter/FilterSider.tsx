import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';

// Assuming Checkbox component exists and is correctly imported
interface CheckboxProps {
  id: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Ensure this matches your handler
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, value, checked, onChange, className }) => (
  <input type="checkbox" id={id} value={value} checked={checked} onChange={onChange} className={className} />
);

interface Filter {
  label?: string;
  value1?: string;
  value2?: string;
  time1?:string,
  time2?:string
} 

interface FilterProps {
  filter?: Filter[];
  setStopInfo?: React.Dispatch<React.SetStateAction<string[]>>;
  setDepTime?: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterSider: React.FC<FilterProps> = ({ filter, setStopInfo=()=>{}, setDepTime=()=>{} }) => {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  // Handle changes to the checkbox
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    setCheckedValues(prev => {
      const updatedValues = isChecked ? [...prev, value] : prev.filter(item => item !== value);
      return updatedValues;
    });
  };


  useEffect(() => {
    setDepTime(checkedValues)
    setStopInfo(checkedValues);
  }, [checkedValues, setStopInfo, setDepTime]); 

  return (
    <div className="w-full bg-white rounded-lg grid gap-2">
      <Accordion type="single" collapsible>
        {filter?.map((item, index) => (
          <AccordionItem value={`item-${item.label}`} key={index}>
            <AccordionTrigger className="font-semibold text-xs text-foreground mx-2 w-full flex justify-between items-center">
              {item.label}
              <ChevronDown className="text-gray-400" />
            </AccordionTrigger>
            <AccordionContent className="shadow-md">
              {item.value1 && (
                <div className="py-4 w-full hover:bg-blue-50 rounded-lg">
                  <Checkbox
                    id={`checkbox-${item.label}-1`}
                    value={item.value1}
                    checked={checkedValues.includes(item.value1)}
                    onChange={handleCheckboxChange}
                    className="mx-2"
                  />
                  <label htmlFor={`checkbox-${item.label}-1`} className="text-[13px] ml-2">
                    {item.value1}
                  </label>
                </div>
              )}
              {item.value2 && (
                <div className="py-4 w-full hover:bg-blue-50 rounded-lg">
                  <Checkbox
                    id={`checkbox-${item.label}-2`}
                    value={item.value2}
                    checked={checkedValues.includes(item.value2)}
                    onChange={handleCheckboxChange}
                    className="mx-2"
                  />
                  <label htmlFor={`checkbox-${item.label}-2`} className="text-[13px] ml-2">
                    {item.value2}
                  </label>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FilterSider;
