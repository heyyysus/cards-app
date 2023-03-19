import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IUser } from '../api/models/IUser';
import theme from '../utils/theme';
import { ThemeProvider } from '@mui/material';
import { PlansFeed } from '../components/PlansFeed';
import { IPlan } from '../api/models/IPlan';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Hoppin/PlansFeed',
  component: PlansFeed,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PlansFeed>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PlansFeed> = (args) => <ThemeProvider theme={theme}><PlansFeed {...args} /></ThemeProvider>;

export const Item1 = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

const localUser: IUser = {
  user_id: '1',
  profile_img: undefined,
  username: 'TroyTheBoy',
  bio: "Yo what the fuck is up my name is Troy and I like to fuckign party",
  followers: [
    { user_id: '2' }
  ],
  following: [
    { user_id: '3' }
  ]
}

const planItem: IPlan = {
    plan_id: 0,
    plan_name: "Lets Hoop",
    plan_desc: "yo lets fucking hoop tmr yea?",
    author: {
        user_id: '1',
        username: 'TroyDaBoy',
        bio: "BIO",
    },
    ts: (new Date("2023-03-15T12:30")),
    plan_lat: 34.41066863500888, 
    plan_lng: -119.86227737611178,
    start_ts: new Date(),
    end_ts: new Date(),
};

Item1.args = {
    planItemList: [planItem, planItem, planItem],
    localUser: localUser
};
