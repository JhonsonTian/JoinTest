import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import {
  useAuthContext,
  AuthDispatch,
  AuthProvider,
} from 'src/context/Authentication';
import { Login } from './screens/Login';
import { RawList } from './screens/RawList';
import { SelectedList } from './screens/SelectedList';
import { getUserProfile, setAxiosAuthHeader } from 'src/api';
import { Root } from './types';

const Stack = createStackNavigator<Root>();

const getAuthenticationState = async () => {
  const { getItem } = useAsyncStorage('@token');
  const token = await getItem();
  if (token === null) return false;
  setAxiosAuthHeader(token);
  const { error } = await getUserProfile();
  if (error) return false; // token expired
  return true;
};

const RootStack: React.FC = () => {
  const [authState, authDispatch] = useAuthContext();
  const { setItem } = useAsyncStorage('@token');

  useEffect(() => {
    (async () => {
      const authResult = await getAuthenticationState();
      if (authResult) {
        authDispatch({ type: AuthDispatch.AUTHENTICATE });
      } else {
        authDispatch({ type: AuthDispatch.UN_AUTHENTICATE });
      }
    })();
  }, []);

  const onLogoutPress = () => {
    setItem('');
    authDispatch({ type: AuthDispatch.UN_AUTHENTICATE });
  };

  const getLogoutButton = () => {
    return (
      <Text style={styles.logout} onPress={onLogoutPress}>
        Log Out
      </Text>
    );
  };

  if (authState.isAuthenticated === null) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        {authState.isAuthenticated ? (
          <>
            <Stack.Screen
              name="RawList"
              component={RawList}
              options={{ headerRight: getLogoutButton }}
            />
            <Stack.Screen name="SelectedList" component={SelectedList} />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <RootStack />
    </AuthProvider>
  );
}

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  logout: {
    marginRight: 8,
    fontSize: 15,
  },
});
