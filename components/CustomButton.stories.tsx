// CustomButton.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CustomButton from './CustomButton';


interface SearchButtonProps {
  label: string;
  href?: string;
  className?: string;
  onClick?: () => void;
}

const meta: Meta<SearchButtonProps> = {
  title: 'Components/CustomButton',
  component: CustomButton,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Button label',
    },
    href: {
      control: 'text',
      description: 'URL to link to',
    },
    className: {
      control: 'text',
      description: 'CSS classes to apply to the button',
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: StoryObj<SearchButtonProps> = {
  args: {
    label: 'Click Me!',
    href: '#',
    className: 'bg-blue-500 text-white',
  },
};

export const NoHref: StoryObj<SearchButtonProps> = {
  args: {
    label: 'No Link',
    onClick: () => {},
    className: 'bg-red-500 text-white',
  },
};

export const WithCustomClass: StoryObj<SearchButtonProps> = {
  args: {
    label: 'Custom Style',
    className: 'bg-green-500 text-white p-4 rounded-lg',
    href: '#',
  },
};
