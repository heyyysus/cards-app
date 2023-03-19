import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IUser } from '../api/models/IUser';
import theme from '../utils/theme';
import { ThemeProvider } from '@mui/material';
import { PlansFeedItem } from '../components/PlansFeedItem';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Hoppin/PlansFeedItem',
  component: PlansFeedItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PlansFeedItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PlansFeedItem> = (args) => <ThemeProvider theme={theme}><PlansFeedItem {...args} /></ThemeProvider>;

export const Item1 = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Item1.args = {};
