import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Login } from './screens/Login';
import {
  useAuthContext,
  AuthDispatch,
  AuthProvider,
} from 'src/context/Authentication';
import { RawList } from './screens/RawList';
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

  if (authState.isAuthenticated === null) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        {authState.isAuthenticated ? (
          <Stack.Screen name="RawList" component={RawList} />
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
