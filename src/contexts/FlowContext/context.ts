import { useContext, createContext } from 'react';
import { Flow } from '../../customTypes';

export interface FlowContextApi {
  flow: Flow;
  setFlow: React.Dispatch<React.SetStateAction<Flow>>;
  removeFlow: () => Promise<void>;
  onDeleteWorkspace: (workspaceId: string) => Promise<void>;
}

const initialState: FlowContextApi = {
  flow: {
    content: '',
  },
  setFlow: () => { },
  removeFlow: () => Promise.resolve(),
  onDeleteWorkspace: () => Promise.resolve(),
};

export const FlowContext = createContext<FlowContextApi>(initialState);

export const useFlowContext = () => useContext(FlowContext);