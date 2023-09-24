import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IUser } from '../api/models/IUser';
import theme from '../utils/theme';
import { ThemeProvider } from '@mui/material';
import { IPlan } from '../api/models/IPlan';
import { PlanMapSelect } from '../components/PlanMapSelect';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapSearchList } from '../components/MapSearchList';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Hoppin/MapSearchList',
  component: MapSearchList,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof MapSearchList>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MapSearchList> = (args) => <ThemeProvider theme={theme}><MapSearchList {...args} /></ThemeProvider>;

export const Item1 = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args



Item1.args = {
    listItems: [
        {
            mapbox_id: 'mapbox_id',
            name: 'name',
            address: 'address',
            place_formatted: 'place_formatted',
            center: { lng: 0, lat: 0 },
            onSelect: () => {},
        },
        {
            mapbox_id: 'mapbox_id',
            name: 'name',
            address: 'address',
            place_formatted: 'place_formatted',
            center: { lng: 0, lat: 0 },
            onSelect: () => {},
        },
        {
            mapbox_id: 'mapbox_id',
            name: 'name',
            address: 'address',
            place_formatted: 'place_formatted',
            center: { lng: 0, lat: 0 },
            onSelect: () => {},
        },
    ],
};
