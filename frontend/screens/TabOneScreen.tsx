import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import * as Google from 'expo-auth-session/providers/google';
import { Button } from 'react-native';

import { useEffect, useState } from 'react';
import { get_local_user, IUser } from '../api/auth';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const OAUTH_CLIENT_ID = "502816164819-d5mvqnnkr0i29lllivmesmgmq3cffq5i.apps.googleusercontent.com";

  const [ request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: OAUTH_CLIENT_ID
  });

  const [ localUser, setLocalUser ] = useState<IUser | null>(null);

  useEffect(() => {
    if(response?.type === "success"){
      const { authentication } = response;
      get_local_user(authentication?.accessToken)
        .then(u => setLocalUser(u));
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />

      <Text>{ localUser?.email }</Text>

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
