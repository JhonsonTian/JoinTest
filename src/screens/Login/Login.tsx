import React, { useState } from 'react';
import { View, Text, StatusBar, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Input, Button } from 'react-native-elements';
import { login } from 'src/api';
import { styles } from './styles';
import { Root } from '../../types';

type NavigationProps = StackNavigationProp<Root, 'Login'>;

type Props = {
  navigation?: NavigationProps;
};

export const Login: React.FC<Props> = ({ navigation }) => {
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const onChangeText = (key: keyof typeof data) => (value: string) =>
    setData(prevState => ({ ...prevState, [key]: value }));

  const onLoginPress = async () => {
    const { username, password } = data;
    if (username === '' || password === '') {
      Alert.alert('Please input required data');
      return;
    }
    const { error, data: resData } = await login({ username, password });
    if (error) {
      Alert.alert('Login Failed');
    } else {
      navigation?.navigate('RawList');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <Input
        placeholder="Username"
        containerStyle={styles.inputContainer}
        inputContainerStyle={styles.input}
        value={data.username}
        onChangeText={onChangeText('username')}
      />
      <Input
        placeholder="Password"
        containerStyle={styles.inputContainer}
        inputContainerStyle={styles.input}
        value={data.password}
        onChangeText={onChangeText('password')}
      />
      <Button
        title="Login"
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        onPress={onLoginPress}
      />
    </View>
  );
};
