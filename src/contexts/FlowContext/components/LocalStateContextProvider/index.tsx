import { FC, PropsWithChildren, useCallback, useState } from 'react';
import { Flow } from '../../../../customTypes';
import { FLOW_DEFAULT_VALUE } from '../../../constants';
import { LocalStateContextProviderBaseProps } from '../../../types';
import { FlowContext } from '../../context';
import { FlowContextProviderProps } from '../../types';

const FlowLocalStateContextProvider: FC<
PropsWithChildren<FlowContextProviderProps & LocalStateContextProviderBaseProps<Flow>>> = ({
  children,
  initialValue,
}) => {
  const [flow, setFlow] = useState<Flow>(initialValue || FLOW_DEFAULT_VALUE);

  const handleRemoveFlow = useCallback(async () => {
    setFlow(FLOW_DEFAULT_VALUE);
  }, []);

  const handleDeleteWorkspace = useCallback(async (_workspaceId: string) => {
    setFlow(FLOW_DEFAULT_VALUE);
  }, []);

  return (<FlowContext.Provider value={{
    flow,
    setFlow,
    removeFlow: handleRemoveFlow,
    onDeleteWorkspace: handleDeleteWorkspace,
  }}>
    {children}
  </FlowContext.Provider>);
};

export default FlowLocalStateContextProvider;

