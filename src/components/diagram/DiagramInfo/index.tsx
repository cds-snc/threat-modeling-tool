import { FC } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { EditableComponentBaseProps } from '../../../customTypes';
//import DiagramCanvas from '../../generic/DiagramCanvas';
//import DFDCanvasWidget from '../../generic/CanvasWidget';
import Flow from '../../generic/Flow';

const DiagramInfo: FC<EditableComponentBaseProps> = () => {
  //return <div><h2>DIAGRAMINFO</h2></div>;
  /*
  return <DiagramCanvas
    {...props}
    headerTitle='Dataflow Diagram'
    diagramTitle='Dataflow Diagram'
    entity={diagramInfo}
    onConfirm={(diagram) => setDiagramInfo(diagram)}
  />;
  */

  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );

};

export default DiagramInfo;