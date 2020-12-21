# Continuous Material List

This simple app use FlatList to fetch long list of raw material from https://dev3-api.development.tastelabgroup.com/api/v1/raw-materials.

## Instalation

```js
git clone https://github.com/JhonsonTian/JoinTest.git
cd JoinTest
npm install
expo start
```

## Possible Improvement

- Integration Test
- Currently search name only search in the loaded list. It is possible to search from server if endpoint is provided.
- For large list with image, Flatlist need to be optimized or use third party library such as https://github.com/Flipkart/recyclerlistview.
