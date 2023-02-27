import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import * as Google from 'expo-auth-session/providers/google';
import { Button } from 'react-native';

import { useEffect, useState } from 'react';
import { get_local_user, IUser } from '../api/auth';

export interface TabOneScreenProps extends RootTabScreenProps<'TabOne'>{
  localUser?: IUser
}

export default function TabOneScreen({ navigation, localUser }: TabOneScreenProps) {


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
