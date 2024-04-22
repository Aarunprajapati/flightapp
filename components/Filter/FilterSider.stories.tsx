
import { Meta, StoryObj } from '@storybook/react';
import FilterSider from './FilterSider';


const meta: Meta = {
  title: 'Components/FilterSider',
  component: FilterSider,
  tags: ["autodocs"],
  argTypes: {
    filter: {
      control: { type: 'object' },
    },
  },
};

export default meta;

type Story= StoryObj<typeof FilterSider>

export const Default:Story={
    args:{
      filter: [
        { label: 'Label 1', value1: 'Value 1', value2: 'Value 2' },
        { label: 'Label 2', value1: 'Value 3', value2: 'Value 4' },
      ],
    }
}
