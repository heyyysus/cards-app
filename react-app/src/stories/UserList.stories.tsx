import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UserList } from '../components/UserList';
import { IUser } from '../api/models/IUser';
import theme from '../utils/theme';
import { ThemeProvider } from '@mui/material';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Hoppin/UserList',
  component: UserList,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof UserList>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof UserList> = (args) => <ThemeProvider theme={theme}><UserList {...args} /></ThemeProvider>;

export const Populated = Template.bind({});
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

const userList: IUser[] = [
  {
    user_id: '2',
    profile_img: undefined,
    username: 'Trey',
  },
  {
    user_id: '3',
    profile_img: undefined,
    username: 'Dave',
  },
  {
    user_id: '4',
    profile_img: undefined,
    username: 'Dylan',
  }
]

Populated.args = {
  localUser: localUser,
  userList: userList,
};


