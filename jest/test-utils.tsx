import * as React from 'react';
import { render as rntlRender } from '@testing-library/react-native';
import { AuthProvider } from 'src/context/Authentication';

const render = (ui: React.ReactElement) => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  );

  return rntlRender(ui, { wrapper });
};

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { render };
