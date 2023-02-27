import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import * as Google from 'expo-auth-session/providers/google';
import { useEffect, useState } from 'react';
import { get_local_user, IUser } from './api/auth';
import { Button, View, StyleSheet, Text } from 'react-native';
import { GoogleAuthRequestConfig } from 'expo-auth-session/providers/google';


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const OAUTH_CLIENT_ID = "502816164819-d5mvqnnkr0i29lllivmesmgmq3cffq5i.apps.googleusercontent.com";
  const [ request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: OAUTH_CLIENT_ID
  });

  const [ localUser, setLocalUser ] = useState<IUser | null>(null);

  useEffect(() => {
    console.log(localUser);
  }, [localUser]);

  useEffect(() => {
    if(response?.type === "success"){
      //console.log(response);
      const { authentication } = response;
      get_local_user(authentication?.accessToken)
        .then(u => {setLocalUser(u), console.log(`TEST${u?.user_id}`)});
    }
  }, [response]);

  if (!isLoadingComplete) {
    return null;
  }
  else if(!localUser) {
    return (
      <View style={styles.container}>
        <Button
            disabled={!request}
            title="Login"
            onPress={() => {
              promptAsync();
            }}
          />
      </View>
    );
  }
  else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
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