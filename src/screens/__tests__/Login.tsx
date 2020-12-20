import React from 'react';
import { render, fireEvent, waitFor } from 'test-utils';
import { Login } from 'src/screens/Login';
import { login as mockLogin } from 'src/api';

const navigation: any = { navigate: jest.fn() };

jest.mock('src/api');

afterEach(() => {
  jest.clearAllMocks();
});

test('component render correctly', () => {
  const { getByPlaceholderText, getByText } = render(
    <Login navigation={navigation} />,
  );
  expect(getByPlaceholderText(/username/i)).toBeTruthy();
  expect(getByPlaceholderText(/password/i)).toBeTruthy();
});

test('login and navigate to RawScreen', async () => {
  const EMAIL = 'test@gmail.com';
  const PASSWORD = '123456';

  const { getByPlaceholderText, getByText } = render(
    <Login navigation={navigation} />,
  );
  const email = getByPlaceholderText(/username/i);
  const password = getByPlaceholderText(/password/i);

  fireEvent.changeText(email, EMAIL);
  fireEvent.changeText(password, PASSWORD);

  const loginButton = getByText(/login/i);
  fireEvent.press(loginButton);
  await waitFor(() => {
    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogin).toHaveBeenCalledWith({
      username: EMAIL,
      password: PASSWORD,
    });
  });
});
