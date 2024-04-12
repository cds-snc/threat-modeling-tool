import { FC, PropsWithChildren, useCallback } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { LOCAL_STORAGE_KEY_FLOW_INFO } from '../../../../configs/localStorageKeys';
import { Flow } from '../../../../customTypes';
import removeLocalStorageKey from '../../../../utils/removeLocalStorageKey';
import { FLOW_DEFAULT_VALUE } from '../../../constants';
import { FlowContext } from '../../context';
import { FlowContextProviderProps } from '../../types';

const getLocalStorageKey = (workspaceId: string | null) => {
  if (workspaceId) {
    return `${LOCAL_STORAGE_KEY_FLOW_INFO}_${workspaceId}`;
  }

  return LOCAL_STORAGE_KEY_FLOW_INFO;
};

const FlowLocalStorageContextProvider: FC<PropsWithChildren<FlowContextProviderProps>> = ({
  children,
  workspaceId: currentWorkspaceId,
}) => {
  const [flow, setFlow, { removeItem }] = useLocalStorageState<Flow>(getLocalStorageKey(currentWorkspaceId), {
    defaultValue: FLOW_DEFAULT_VALUE,
  });

  const handleRemoveFlow = useCallback(async () => {
    removeItem();
  }, [removeItem]);

  const handleDeleteWorkspace = useCallback(async (workspaceId: string) => {
    window.setTimeout(() => {
      // to delete after the workspace is switched. Otherwise the default value is set again.
      removeLocalStorageKey(getLocalStorageKey(workspaceId));
    }, 1000);
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

export default FlowLocalStorageContextProvider;

