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
  title: 'Hoppi /ProfilePageCard',
  component: ProfilePageCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfilePageCard>;

const Template: ComponentStory<typeof ProfilePageCard> = (args) => <ThemeProvider theme={theme}><ProfilePageCard {...args} /></ThemeProvider>;

export const LocalUser = Template.bind({});

const user: User = {
  sub: '1',
};

const profileUser: IUser = {
  user_id: '1',
  profile_img: undefined,
  username: 'Username',
}

const saveUserEdit = (newUser: IUser) => {
  console.log(newUser);
}

const handleSubmit = (file: File) => {
  console.log(file);
}


LocalUser.args = {
  user: user,
  profileUser: profileUser,
  saveUserEdit: saveUserEdit,
}
