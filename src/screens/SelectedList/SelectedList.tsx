import React from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { Root } from '../../types';

type NavigationProps = StackNavigationProp<Root, 'SelectedList'>;
type RouteProps = RouteProp<Root, 'SelectedList'>;

type Props = {
  navigation?: NavigationProps;
  route: RouteProps;
};

export const SelectedList: React.FC<Props> = ({ navigation, route }) => {
  const { selectedData = [] } = route?.params;

  console.log('SELECTED DATA', selectedData);

  return <View />;
};
