import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Root } from '../../types';

type NavigationProps = StackNavigationProp<Root, 'RawList'>;

type Props = {
  navigation?: NavigationProps;
};

export const RawList: React.FC<Props> = ({ navigation }) => {
  const { getItem } = useAsyncStorage('@token');

  (async () => {
    console.log('TOKEN', await getItem());
  })();

  return (
    <View>
      <Text>Raw List</Text>
    </View>
  );
};
