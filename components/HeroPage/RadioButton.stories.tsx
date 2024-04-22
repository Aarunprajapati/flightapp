import { Meta, StoryObj } from '@storybook/react';
import RadioButton from './RadioButton';


export default {
  title: 'Components/RadioButton',
  component: RadioButton,
  tags: ["autodocs"],
  argTypes: {
    labels: { control: 'array' },
    title: { control: 'text' },
    sidelabel: { control: 'text' },
    className: { control: 'text' },
  },
};
type Story= StoryObj<typeof RadioButton>

export const Default:Story={

    args:{
      labels: [
        { label: 'Option 1' },
        { label: 'Option 2' },
        { label: 'Option 3' },
      ],
      title: 'Radio Group Title',
      sidelabel: 'Side Label Text',
      className: 'custom-class',
    }
}
