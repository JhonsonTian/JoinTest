/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';

enum AuthDispatch {
  AUTHENTICATE,
  UN_AUTHENTICATE,
}

type State = {
  isAuthenticated: boolean | null;
};

type Action = Partial<State> & {
  type: AuthDispatch;
};

type Dispatch = (action: Action) => void;

const StateContext = React.createContext<State | undefined>(undefined);
const DispatchContext = React.createContext<Dispatch | undefined>(undefined);

const reducer = (state: State, action: Action): State => {
  const { type } = action;
  switch (type) {
    case AuthDispatch.AUTHENTICATE: {
      return {
        ...state,
        isAuthenticated: true,
      };
    }
    case AuthDispatch.UN_AUTHENTICATE: {
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

type Provider = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Provider): JSX.Element => {
  const [state, dispatch] = React.useReducer(reducer, {
    isAuthenticated: null,
  });

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

const useState = () => {
  const context = React.useContext(StateContext);
  if (context === undefined) {
    throw new Error('useState must be used within a Provider');
  }
  return context;
};

const useDispatch = () => {
  const context = React.useContext(DispatchContext);
  if (context === undefined) {
    throw new Error('useDispatch must be used within a Provider');
  }
  return context;
};

const useAuthContext = (): [State, Dispatch] => [useState(), useDispatch()];

export { AuthProvider, useAuthContext, AuthDispatch };
