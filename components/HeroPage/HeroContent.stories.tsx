// HeroContent.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import HeroContent from './HeroContent'; // Adjust the import path as necessary

interface HeroContentProps {
    cityName?: string;
    AirPortcode?: string;
    AirportName?: string;
}

interface HeroContentStoryProps {
    value?: HeroContentProps;
    label: string;
}

const meta: Meta<HeroContentStoryProps> = {
  title: "Components/HeroContent",
  component: HeroContent,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
    },
    value: {
      cityName: {
        control: "text",
        name: "City Name",
        description: "Name of the city",
      },
      AirPortcode: {
        control: "text",
        name: "Airport Code",
        description: "Code of the airport",
      },
      AirportName: {
        control: "text",
        name: "Airport Name",
        description: "Name of the airport",
      },
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;

export const HeroComponent: StoryObj<HeroContentStoryProps> = {
    args: {
        label: 'Featured Destination',
        value: {
            cityName: 'San Francisco',
            AirPortcode: 'SFO',
            AirportName: 'San Francisco International Airport'
        }
    }
};
