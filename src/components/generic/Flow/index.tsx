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
import BiDirectionalEdge from './Edges/BiDirectionalEdge';

const edgeTypes = {
  biDirectional: BiDirectionalEdge,
};

const nodeTypes = {
  actor: ActorNode,
};

const initialNodes: Node[] = [
  { id: '1', data: { id: '1', label: 'Node 1' }, position: { x: 5, y: 5 }, type: 'actor' },
  { id: '2', data: { id: '2', label: 'Node 2' }, position: { x: 5, y: 100 }, type: 'actor' },
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

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

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