import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  useEdgesState,
  useNodesState,
  useOnSelectionChange,
  ConnectionMode,
  Panel,
  Node,
  Edge,
} from 'reactflow';
import styled from '@emotion/styled';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { v4 } from 'uuid';
import 'reactflow/dist/style.css';

import ActorNode from './Nodes/ActorNode';
import DatastoreNode from './Nodes/DatastoreNode';
import ProcessNode from './Nodes/ProcessNode';
import TrustBoundaryNode from './Nodes/TrustBoundaryNode';

import BiDirectionalEdge from './Edges/BiDirectionalEdge';

import NodeSelector from './Nodes/NodeSelector';

import PropertiesPanel from './Properties/PropertiesPanel';


const edgeTypes = {
  biDirectional: BiDirectionalEdge,
};

const nodeTypes = {
  actor: ActorNode,
  datastore: DatastoreNode,
  process: ProcessNode,
  trustBoundary: TrustBoundaryNode,
};

namespace s {
  export const OuterContainer = styled.div`
    height: 450px;
    display: flex;
    border: 1px solid #000;

     svg.react-flow__edges {
      z-index: 1 !important;
     }
  `;
}

function Flow() {

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [nodeDataValue, setNodeDataValue] = useState({});
  const [selectedComponent, setSelectedComponent] = useState<Node | Edge | null>(null);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedComponent?.id) {
          node.data = { ...node.data, ...nodeDataValue };
        }
        return node;
      }));
  }, [nodeDataValue, selectedComponent, setNodes, setEdges]);

  useOnSelectionChange({
    onChange: (selected) => {
      console.log('selected', selected);
      setSelectedComponent(selected.nodes[0] || selected.edges[0] || null);
    },
  });

  const onConnect = useCallback(
    (params) => {
      const edge = { ...params, type: 'biDirectional' };
      setEdges((eds) => addEdge(edge, eds));
    }, [setEdges],
  );

  const onAdd = useCallback((type: string) => {
    setNodes((nds) => {
      // Randomize position for new nodes using a position from -100 to 100
      let x = Math.floor(Math.random() * 200) - 100;
      let y = Math.floor(Math.random() * 200) - 100;

      const newNode = {
        id: v4(),
        data: {
          name: type,
          description: '',
          inScope: true,
          scopeReason: '',
          dataTags: [],
          techTags: [],
          securityTags: [],
        },
        type,
        position: { x, y },
      };
      return (type === 'trustBoundary' ? [newNode, ...nds] : [...nds, newNode]);
    });
  }, [setNodes]);


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
          <Panel position="top-left"><NodeSelector addCallback={onAdd} /></Panel>
        </ReactFlow>
      </s.OuterContainer>
      <PropertiesPanel component={selectedComponent} changeHandler={setNodeDataValue} />
    </SpaceBetween>
  );
}

export default Flow;