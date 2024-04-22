import type { Meta, StoryObj } from "@storybook/react";
import NavbarButton from "./NvavbarButton";
import { Button } from "@mui/material";

const meta: Meta<typeof NavbarButton> = {
  title: "Components/NavbarButton",
  component: NavbarButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      options: [
        "List your property Start earning today!",
        "Introduction myBiz Business Travel Solution",
      ],
      control: { type: "select" },
    },
    href: {
      control: { type: "text" },
    },
    
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const NavbarComponent: Story = {
  args: {
    label: "Button",
  },
};



