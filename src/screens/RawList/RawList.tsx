import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ListItem, Button } from 'react-native-elements';
import { getRawMaterial } from 'src/api';
import { RawMaterial } from 'src/api/types';
import { Loading } from 'src/components/Loading';
import { Root } from '../../types';
import { styles } from './styles';

type NavigationProps = StackNavigationProp<Root, 'RawList'>;

type Props = {
  navigation?: NavigationProps;
};

export const RawList: React.FC<Props> = ({ navigation }) => {
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<number[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [materialList, setMaterialList] = useState<RawMaterial[]>([]);

  const onItemPress = (id: number) => () => {
    const isIdSelected = selectedId.some(item => item === id);
    if (isIdSelected) {
      setSelectedId(prevState => prevState.filter(itm => itm !== id));
    } else {
      setSelectedId(prevState => [...prevState, id]);
    }
  };

  const onRenderList = ({ item, index }: { item: any; index: number }) => {
    const isCheck = selectedId.some(itm => itm === item.id);
    return (
      <ListItem
        containerStyle={styles.listContainer}
        bottomDivider
        onPress={onItemPress(item.id)}
      >
        <ListItem.Content>
          <ListItem.Title>{item.nameEng}</ListItem.Title>
        </ListItem.Content>
        <ListItem.CheckBox checked={isCheck} testID={`checkItem${item.id}`} />
      </ListItem>
    );
  };

  const onLoadMore = () => {
    setLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  const renderFooter = () => {
    if (isLoading && materialList.length !== 0) {
      return (
        <ActivityIndicator
          size="small"
          color="black"
          style={styles.activityIndicator}
        />
      );
    }
    return null;
  };

  useEffect(() => {
    (async () => {
      const { error, data, message } = await getRawMaterial({ page });
      setLoading(false);
      if (error) {
        console.log('GET RAW MATERIAL ERROR', message);
      } else if (page === 1 && data) {
        setMaterialList(data);
      } else if (data) {
        setMaterialList(prevState => [...prevState, ...data]);
      }
    })();
  }, [page]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.virtualList}>
        <FlatList
          data={materialList}
          renderItem={onRenderList}
          onEndReachedThreshold={0.2}
          onEndReached={onLoadMore}
          ListFooterComponent={renderFooter}
          keyExtractor={item => item.id.toString()}
          removeClippedSubviews
        />
      </View>
      <Button title="Submit" buttonStyle={styles.button} />
      <Loading show={isLoading && materialList.length === 0} />
    </SafeAreaView>
  );
};
