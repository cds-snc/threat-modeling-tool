import { useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  Node,
  Edge,
  addEdge,
  useEdgesState,
  useNodesState,
  ConnectionMode,
} from 'reactflow';
import styled from '@emotion/styled';
import SpaceBetween from '@cloudscape-design/components/space-between';
import 'reactflow/dist/style.css';

import ActorNode from './Nodes/ActorNode';
import DatastoreNode from './Nodes/DatastoreNode';
import ProcessNode from './Nodes/ProcessNode';
import BiDirectionalEdge from './Edges/BiDirectionalEdge';
import TrustBoundaryNode from './Nodes/TrustBoundaryNode';

const edgeTypes = {
  biDirectional: BiDirectionalEdge,
};

const nodeTypes = {
  actor: ActorNode,
  datastore: DatastoreNode,
  process: ProcessNode,
  trustBoundary: TrustBoundaryNode,
};

const initialNodes: Node[] = [
  { id: '1', data: { label: 'Actor' }, position: { x: 5, y: 5 }, type: 'actor' },
  { id: '2', data: { label: 'Process' }, position: { x: 5, y: 100 }, type: 'process' },
  { id: '3', data: { label: 'Datastore' }, position: { x: 5, y: 300 }, type: 'datastore' },
  { id: '4', data: { label: 'TrustBoundary' }, position: { x: 5, y: 500 }, type: 'trustBoundary' },
];

const initialEdges: Edge[] = [];

namespace s {
  export const OuterContainer = styled.div`
    height: 450px;
    display: flex;
    border: 1px solid #000;
  `;
}

function Flow() {

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <SpaceBetween direction="vertical" size="s">
      <s.OuterContainer>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          edgeTypes={edgeTypes}
          nodeTypes={nodeTypes}
          minZoom={0.2}
          maxZoom={4}
          fitView
          connectionMode={ConnectionMode.Loose}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </s.OuterContainer>
    </SpaceBetween>
  );
}

export default Flow;