import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Text,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ListItem, Button, Input } from 'react-native-elements';
import { getRawMaterial } from 'src/api';
import { RawMaterial } from 'src/api/types';
import { Root } from '../../types';
import { styles } from './styles';

type NavigationProps = StackNavigationProp<Root, 'RawList'>;

type Props = {
  navigation?: NavigationProps;
};

export const RawList: React.FC<Props> = ({ navigation }) => {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<RawMaterial[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [materialList, setMaterialList] = useState<RawMaterial[]>([]);
  const [lastPage, setLastPage] = useState(0);

  const onItemPress = (value: RawMaterial) => () => {
    const isIdSelected = selected.some(item => item.id === value.id);
    if (isIdSelected) {
      setSelected(prevState => prevState.filter(itm => itm.id !== value.id));
    } else {
      setSelected(prevState => [...prevState, value]);
    }
  };

  const onRenderList = ({ item, index }: { item: any; index: number }) => {
    const isCheck = selected.some(itm => itm.id === item.id);
    return (
      <ListItem containerStyle={styles.listContainer} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.nameEng}</ListItem.Title>
        </ListItem.Content>
        <ListItem.CheckBox
          checked={isCheck}
          testID={`checkItem${item.id}`}
          onPress={onItemPress(item)}
        />
      </ListItem>
    );
  };

  const onLoadMore = () => {
    if (!isLoading) {
      setPage(prevPage => {
        if (prevPage + 1 > lastPage) return prevPage;
        return prevPage + 1;
      });
    }
  };

  const onChangeText = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const onSubmitPress = () => {
    navigation?.navigate('SelectedList', { selectedData: selected });
  };

  const renderFooter = () => {
    if (isLoading) {
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

  const renderEmpty = () => (
    <View style={styles.empty}>{!isLoading && <Text>Empty Data</Text>}</View>
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { error, data, message, lastPage: lPage } = await getRawMaterial({
        page,
        keyword: search,
      });
      if (error) {
        console.log('GET RAW MATERIAL ERROR', message);
      } else if (page === 1 && data) {
        setMaterialList(data);
      } else if (data) {
        setMaterialList(prevState => [...prevState, ...data]);
      }
      if (lPage) setLastPage(lPage);
      setLoading(false);
    })();
  }, [page, search]);

  return (
    <SafeAreaView style={styles.container}>
      <Input
        placeholder="Material Name"
        containerStyle={styles.inputContainer}
        inputContainerStyle={styles.input}
        value={search}
        onChangeText={onChangeText}
      />
      <View style={styles.virtualList}>
        <FlatList
          data={materialList}
          renderItem={onRenderList}
          onEndReachedThreshold={0.2}
          onEndReached={onLoadMore}
          ListFooterComponent={renderFooter}
          keyExtractor={item => item.id.toString()}
          removeClippedSubviews
          ListEmptyComponent={renderEmpty}
        />
      </View>
      <Button
        title="Submit"
        buttonStyle={styles.button}
        onPress={onSubmitPress}
        disabled={materialList.length === 0 || selected.length === 0}
      />
    </SafeAreaView>
  );
};
