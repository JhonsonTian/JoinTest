import React from 'react';
import { SelectedList } from '../SelectedList';
import { render, fireEvent, waitFor } from 'test-utils';

const DATA = [
  {
    id: 1,
    nameEng: 'Test One',
    defaultPrice: 0.2,
    packing: 'Anim fugit magnam d',
  },
  {
    id: 2,
    nameEng: 'Test Two',
    defaultPrice: 0.2,
    packing: 'Anim fugit magnam d',
  },
  {
    id: 3,
    nameEng: 'Test Three',
    defaultPrice: 0.2,
    packing: 'Anim fugit magnam d',
  },
];

const route: any = { params: { selectedData: DATA } };

const navigation: any = { navigate: jest.fn() };

jest.mock('src/api');

afterEach(() => {
  jest.clearAllMocks();
});

test('render items correctly', () => {
  const { getByText } = render(
    <SelectedList navigation={navigation} route={route} />,
  );
  expect(getByText(/test one/i)).toBeTruthy();
  expect(getByText(/test two/i)).toBeTruthy();
  expect(getByText(/test three/i)).toBeTruthy();
});
