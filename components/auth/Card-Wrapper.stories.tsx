import {  Meta,  StoryObj } from "@storybook/react";
import CardWrapper from "./Card-Wrapper";

const meta : Meta<typeof CardWrapper>={
    component: CardWrapper,
    tags: ["autodocs"],
    argTypes: {
      headerLabel: { control: "text" },
      backButtonLabel: { control: "text" },
      backButtonHref: { control: "text" },
      showSocial: { control: "boolean" },
    },
  };
  
export default meta;
type Story= StoryObj<typeof CardWrapper>
export const Default:Story={
    args:{
        headerLabel: 'Example Header',
        backButtonLabel: 'Back',
        backButtonHref: '/back',
        showSocial: true,
        children:"form"
    }
} 