import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes:{
    variant:{
    options: ['solid', 'outline', "ghost"],
     controls: { type : 'select'}
    },
    size:{
      options:["sm", "md", "lg"],
      controls:{ type: 'select'}
    },
    colorscheme:{
      options:["primary", "secondary",],
      controls:{type:'select'}
    }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    variant: "solid",
    children: "Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Button",
  },
};