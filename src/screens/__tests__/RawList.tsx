import React from 'react';
import { RawList } from 'src/screens/RawList';
import { render, fireEvent, waitFor } from 'test-utils';
import { getRawMaterial } from 'src/api';

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

const navigation: any = { navigate: jest.fn() };

jest.mock('src/api');

afterEach(() => {
  jest.clearAllMocks();
});

test('render 3 list', async () => {
  const mockGetRawMaterial = getRawMaterial as jest.Mock;
  mockGetRawMaterial.mockResolvedValueOnce({ error: false, data: DATA });
  const { getByText } = render(<RawList />);
  await waitFor(() => {
    expect(getByText(/test one/i)).toBeTruthy();
    expect(getByText(/test two/i)).toBeTruthy();
    expect(getByText(/test three/i)).toBeTruthy();
  });
});

test('render selected item correctly', async () => {
  const mockGetRawMaterial = getRawMaterial as jest.Mock;
  mockGetRawMaterial.mockResolvedValueOnce({ error: false, data: DATA });
  const { getByTestId } = render(<RawList navigation={navigation} />);
  await waitFor(() => {
    const item2 = getByTestId('checkItem2');
    expect(item2).toHaveProp('accessibilityState', { checked: false });
    fireEvent.press(item2);
    expect(item2).toHaveProp('accessibilityState', { checked: true });
  });
});

test('navigation works correctly', async () => {
  const mockGetRawMaterial = getRawMaterial as jest.Mock;
  mockGetRawMaterial.mockResolvedValueOnce({ error: false, data: DATA });
  const { getByTestId, getByText } = render(
    <RawList navigation={navigation} />,
  );
  await waitFor(() => {
    const item2 = getByTestId('checkItem2');
    const submit = getByText(/submit/i);
    fireEvent.press(item2);
    fireEvent.press(submit);
    expect(navigation.navigate).toHaveBeenCalledTimes(1);
    expect(navigation.navigate).toHaveBeenCalledWith('SelectedList', {
      selectedData: [DATA[1]],
    });
  });
});
