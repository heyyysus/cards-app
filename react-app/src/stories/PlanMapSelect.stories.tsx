import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IUser } from '../api/models/IUser';
import theme from '../utils/theme';
import { ThemeProvider } from '@mui/material';
import { IPlan } from '../api/models/IPlan';
import { PlanMapSelect } from '../components/PlanMapSelect';
import 'mapbox-gl/dist/mapbox-gl.css';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Hoppin/PlanMapSelect',
  component: PlanMapSelect,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PlanMapSelect>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PlanMapSelect> = (args) => <ThemeProvider theme={theme}><PlanMapSelect {...args} /></ThemeProvider>;

export const Item1 = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args



Item1.args = {
    initCenter: {
        lat: 34.41066863500888, 
        lng: -119.86227737611178,
    },
    initZoom: 15,
    selectCoord: (coord: {lat: number, lng: number}) => { return; }
};
