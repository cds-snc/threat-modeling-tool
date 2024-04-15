import { FC } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { EditableComponentBaseProps } from '../../../customTypes';
import Flow from '../../generic/Flow';

const DiagramInfo: FC<EditableComponentBaseProps> = () => {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
};

export default DiagramInfo;