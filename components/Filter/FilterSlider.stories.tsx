
import { Meta, StoryObj } from '@storybook/react';
import FilterSlider from './FilterSlider';


// Meta information for Storybook
const meta: Meta = {
  title: 'Components/FilterSlider',
  component: FilterSlider,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: 'object' }, 
    },
  },
};

export default meta;
type Story= StoryObj<typeof FilterSlider>

export const Default:Story={
    args:{
      value: [
        { label: 'Price Range 1', minprice: 1000, maxprice: 5000 },
        { label: 'Price Range 2', minprice: 2000, maxprice: 8000 },
      ],
     
    }
}
