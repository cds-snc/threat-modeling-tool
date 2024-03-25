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
  ReactFlowInstance,
  useReactFlow,
  ControlButton,
} from 'reactflow';
import styled from '@emotion/styled';
import { MagicWandIcon } from '@radix-ui/react-icons';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { v4 } from 'uuid';
import 'reactflow/dist/style.css';

import ActorNode from './Nodes/ActorNode';
import DatastoreNode from './Nodes/DatastoreNode';
import ProcessNode from './Nodes/ProcessNode';
import TrustBoundaryNode from './Nodes/TrustBoundaryNode';
import NodeSelector from './Nodes/NodeSelector';

import BiDirectionalEdge from './Edges/BiDirectionalEdge';

import PropertiesPanel from './Properties/PropertiesPanel';

import ThreatList from './Threats/ThreatList';

import { useThreatsContext } from '../../../contexts';
import { useWorkspacesContext } from '../../../contexts/WorkspacesContext';

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
  const { currentWorkspace } = useWorkspacesContext();
  const flowKey = `dataflow-diagram-${currentWorkspace?.id}`;

  const { setViewport } = useReactFlow();

  // Save and restore state
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance<any, any> | null>(null);

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance, flowKey]);

  const onInit = async (instance) => {
    setRfInstance(instance);
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey) as string);

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };
    await restoreFlow();
  };

  // Nodes and edges state
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [nodeDataValue, setNodeDataValue] = useState({});
  const [selectedComponent, setSelectedComponent] = useState<Node | Edge | null>(null);

  useEffect(() => {
    if (!selectedComponent) {
      return;
    }

    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === selectedComponent?.id) {
          edge.data = { ...edge.data, ...nodeDataValue };
        }
        return edge;
      }));
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedComponent?.id) {
          node.data = { ...node.data, ...nodeDataValue };
        }
        return node;
      }));
  }, [selectedComponent, nodeDataValue, setNodes, setEdges]);

  useOnSelectionChange({
    onChange: (selected) => {
      setNodeDataValue({});
      if (selected.nodes.length + selected.edges.length === 0) {
        setSelectedComponent(null);
        return;
      }
      setSelectedComponent(selected.nodes[0] || selected.edges[0]);
    },
  });

  const onConnect = useCallback(
    (params) => {
      const newEdge =
      {
        ...params,
        id: v4(),
        type: 'biDirectional',
        data: {
          name: 'Data',
          description: '',
          outOfScope: false,
          scopeReason: '',
          dataTags: [],
          techTags: [],
          securityTags: [],
          tags: [],
          selectedThreats: [],
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
      setNodeDataValue({});
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
          outOfScope: false,
          scopeReason: '',
          dataTags: [],
          techTags: [],
          securityTags: [],
          tags: [],
          selectedThreats: [],
        },
        type,
        position: { x, y },
      };
      return (type === 'trustBoundary' ? [newNode, ...nds] : [...nds, newNode]);
    });
  }, [setNodes]);

  // Threats state
  const { statementList } = useThreatsContext();
  const [threatList, setThreatList] = useState(statementList);

  useEffect(() => { // update list of threats panel
    setThreatList(statementList);
  }, [setThreatList, statementList]);


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
          onInit={onInit}
        >
          <Background />
          <Controls>
            <ControlButton onClick={onSave}>
              <MagicWandIcon />
            </ControlButton>
          </Controls>
          <Panel position="top-left"><NodeSelector addCallback={onAdd} /></Panel>
        </ReactFlow>
      </s.OuterContainer>
      <Container header={<Header>Properties</Header>}>
        <PropertiesPanel component={selectedComponent} changeHandler={setNodeDataValue} />
      </Container>
      <ThreatList
        threats={threatList}
        component={selectedComponent}
        changeHandler={setNodeDataValue} />
    </SpaceBetween>
  );
}

export default Flow;