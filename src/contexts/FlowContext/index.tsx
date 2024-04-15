import { FC, PropsWithChildren } from 'react';
import FlowLocalStorageContextProvider from './components/LocalStorageContextProvider';
import { useFlowContext } from './context';
import { FlowContextProviderProps } from './types';

const FlowContextProvider: FC<PropsWithChildren<FlowContextProviderProps>> = (props) => {
  return (<FlowLocalStorageContextProvider {...props} />);
};

export default FlowContextProvider;

export {
  useFlowContext,
};
