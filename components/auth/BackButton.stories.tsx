import type { Meta, StoryObj } from '@storybook/react';
import BackButton from './BackButton';


const meta: Meta<typeof BackButton> = {
    title: "components/BackButton",
    component: BackButton,
    parameters:{
        layout: "centered"
    },
    tags:["autodocs"],
    
}


export default meta
type story = StoryObj<typeof BackButton>


export const Back_Button: story = {
    args:{
        label:"back",
        href:"/#"
    }
}