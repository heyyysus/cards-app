import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { ProfilePageCard } from '../components/ProfilePageCard';
import { User } from '@auth0/auth0-react';
import { IUser } from '../api/models/IUser';
import theme from '../utils/theme';
import { ThemeProvider } from '@mui/material';

import "../index.css";

export default {
  title: 'Hoppin/ProfilePageCard',
  component: ProfilePageCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfilePageCard>;

const Template: ComponentStory<typeof ProfilePageCard> = (args) => <ThemeProvider theme={theme}><ProfilePageCard {...args} /></ThemeProvider>;

export const LocalUser = Template.bind({});
export const NotLocalUser = Template.bind({});

const user: User = {
  sub: '1',
};

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

const profileUser1: IUser = {
  user_id: '1',
  profile_img: undefined,
  username: 'TroyTheBoy',
  bio: "Yo what the fuck is up my name is Troy and I like to party",
  followers: userList,
  following: userList.slice(1,3),
}

const profileUser2: IUser = {
  user_id: '2',
  profile_img: undefined,
  username: 'TheDude',
  bio: "Im just a dude",
  followers: userList,
  following: userList.slice(1,3),
}

const saveUserEdit = (newUser: IUser) => {
  console.log(newUser);
}


LocalUser.args = {
  user: user,
  localUser: profileUser1,
  profileUser: profileUser1,
  saveUserEdit: saveUserEdit,
}

NotLocalUser.args = {
  user: user,
  localUser: profileUser1,
  profileUser: profileUser2,
  saveUserEdit: saveUserEdit,
}
