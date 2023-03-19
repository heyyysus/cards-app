import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PlansForm } from '../components/PlansForm';
import theme from '../utils/theme';
import { ThemeProvider } from '@mui/material';
import { IUser } from '../api/models/IUser';

export default {
  title: 'Hoppin/PlansForm',
  component: PlansForm,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof PlansForm>;

const Template: ComponentStory<typeof PlansForm> = (args) => 
<ThemeProvider theme={theme}>
    <PlansForm {...args} />
</ThemeProvider>;

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

const localUser: IUser = {
  user_id: '1',
  profile_img: undefined,
  username: 'TroyTheBoy',
  bio: "Yo what the fuck is up my name is Troy and I like to fuckign party",
  followers: userList,
  following: userList.slice(1,3)
}

export const Default = Template.bind({});
Default.args = {
  handleExit: () => {},
  handleSubmit: () => {},
  localUser: localUser,

}
