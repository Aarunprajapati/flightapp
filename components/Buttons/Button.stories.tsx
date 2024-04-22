/* eslint-disable storybook/prefer-pascal-case */
import { Meta, StoryObj} from "@storybook/react"


import Button from './Button'


const meta: Meta<typeof Button>={
    title:"components/Button",
    component: Button,
    parameters:{
        layout:"centered"
    },
    tags:["autodocs"],
    argTypes: {
        variant: {
          control: { type: 'select', options: ['solid', 'outline', 'ghost'] },
        },
        size: {
          control: { type: 'select', options: ['sm', 'md', 'lg'] },
        },
        colorScheme: {
          control: { type: 'select', options: ['primary', 'success', 'secondary'] },
        },
        disabled: {
          control: { type: 'boolean' },
        },
      },

}

export default meta


type Story = StoryObj<typeof meta>

export const primary : Story ={
    args:{
        variant: "solid",
        children: "Button",
        size:"md",
        colorScheme:"primary"
    }
}
export const secondary : Story ={
    args:{
        variant: "ghost",
        children: "Button",
        size:"md",
        colorScheme:"secondary"
    }
}