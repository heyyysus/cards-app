import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IUser } from '../api/models/IUser';
import theme from '../utils/theme';
import { ThemeProvider } from '@mui/material';
import { IPlan } from '../api/models/IPlan';
import { PlanMapSelect } from '../components/PlanMapSelect';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapSearchListItem } from '../components/MapSearchListItem';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Hoppin/MapSearchListItem',
  component: MapSearchListItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof MapSearchListItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MapSearchListItem> = (args) => <ThemeProvider theme={theme}><MapSearchListItem {...args} /></ThemeProvider>;

export const Item1 = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args



Item1.args = {
    mapbox_id: "mapbox_id",
    name: "El Pollo Loco",
    address: "1234 Main St",
    place_formatted: "Los Angeles, CA 90001, United States of America",
    onSelect: () => {console.log("onSelect")}
};
