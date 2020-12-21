import React from 'react';
import { View, FlatList, SnapshotViewIOSComponent } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ListItem } from 'react-native-elements';
import { Root } from '../../types';
import { styles } from './styles';

type NavigationProps = StackNavigationProp<Root, 'SelectedList'>;
type RouteProps = RouteProp<Root, 'SelectedList'>;

type Props = {
  navigation?: NavigationProps;
  route: RouteProps;
};

export const SelectedList: React.FC<Props> = ({ navigation, route }) => {
  const { selectedData = [] } = route?.params;

  const onRenderList = ({ item, index }: { item: any; index: number }) => {
    return (
      <ListItem containerStyle={styles.listContainer} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.nameEng}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={selectedData}
        renderItem={onRenderList}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};
