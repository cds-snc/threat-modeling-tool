import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  useEdgesState,
  useNodesState,
  ConnectionMode,
  Panel,
  Node,
  Edge,
  ReactFlowInstance,
  useReactFlow,
  applyEdgeChanges,
  applyNodeChanges,
  MarkerType,
} from 'reactflow';
import styled from '@emotion/styled';
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
import SaveButton from './SaveButton/SaveButton';
import ZIndexChanger from './Nodes/ZIndexChanger';

import ThreatList from './Threats/ThreatList';

import { useFlowContext, useThreatsContext } from '../../../contexts';

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
  const { zoomTo, getZoom, setViewport } = useReactFlow();

  // Save and restore state
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance<any, any> | null>(null);
  const [saveState, setSaveState] = useState(true);
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  const { flow, setFlow } = useFlowContext();

  const onSave = useCallback(() => {
    if (rfInstance) {
      setFlow({ content: JSON.stringify(rfInstance.toObject()) });
      setSaveState(true);
    }
  }, [rfInstance, setFlow]);

  const restoreFlow = useCallback(async () => {
    if (flow.content) {
      const diagram = JSON.parse(flow.content || '{}');
      const { x = 0, y = 0, zoom = 1 } = diagram.viewport;
      setNodes(diagram.nodes || []);
      setEdges(diagram.edges || []);
      setViewport({ x, y, zoom });
    }
  }, [flow.content, setNodes, setEdges, setViewport]);

  useEffect(() => {
    restoreFlow().catch(console.error);
  }, [flow.content, restoreFlow]);

  const onInit = async (instance) => {
    setRfInstance(instance);
    await restoreFlow();
  };

  // Nodes and edges state
  const [nodeDataValue, setNodeDataValue] = useState({});
  const [selectedComponent, setSelectedComponent] = useState<Node | Edge | null>(null);

  useEffect(() => {
    if (!selectedComponent) {
      // If this is the first node added to the flow, zoom out to prevent an implicit max zoom (of 4)
      // this is probably another bug in react-flow that needs to be investigated and reported
      if (nodes.length === 1 && getZoom() === 4) {
        zoomTo(1);
      }
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
    setSaveState(false);
  }, [selectedComponent, nodeDataValue, setNodes, setEdges, getZoom, zoomTo, nodes.length]);

  const onNodesChange = useCallback(
    (changes) => {
      setNodeDataValue({});
      setNodes((oldNodes) => applyNodeChanges(changes, oldNodes));
      for (let selection of changes.filter(c => c.type === 'select' || (c.type === 'position' && c.dragging === false) || c.type ==='remove')) {
        if (selection.selected || selection.dragging === false) {
          setSelectedComponent(nodes.find((node) => node.id === selection.id) as Node | null);
        } else {
          setSelectedComponent(null);
        }
      };
    },
    [nodes, setNodes],
  );

  const onEdgesChange = useCallback(
    (changes) => {
      setNodeDataValue({});
      setEdges((oldEdges) => applyEdgeChanges(changes, oldEdges));
      setSelectedComponent(null);
      for (let selection of changes.filter(c => c.type === 'select')) {
        if (selection.selected) {
          setSelectedComponent(edges.find((edge) => edge.id === selection.id) as Edge | null);
        } else {
          setSelectedComponent(null);
        }
      }
    },
    [edges, setEdges],
  );

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
      setEdges((eds) => addEdge(addEndMarker(newEdge), eds));
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
      setSaveState(false);
      return [...nds, newNode];
    });
  }, [setNodes]);

  const onZIndexChange = useCallback((direction: string) => {
    setNodes((nds) => {
      const selectedNode = nds.find((node) => node.id === selectedComponent?.id);
      if (!selectedNode) {
        return nds;
      }
      const index = nds.indexOf(selectedNode);
      const newIndex = direction === 'last' ? 0 : direction === 'down' ? index - 1 : direction === 'up' ? index + 1 : nds.length - 1;
      const node = nds.splice(index, 1)[0];
      nds.splice(newIndex, 0, node);
      setSaveState(false);
      return [...nds];
    });
  }, [setNodes, selectedComponent]);

  // Threats state
  const { statementList } = useThreatsContext();
  const [threatList, setThreatList] = useState(statementList);

  useEffect(() => { // update list of threats panel
    setThreatList(statementList);
  }, [setThreatList, statementList]);

  const addEndMarker = (edge) => ({
    ...edge,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: '#b1b1b7',
    },
  });

  return (
    <SpaceBetween direction="vertical" size="s">
      <Container header={<Header actions={<SaveButton saveHandler={onSave} saveState={saveState} />}>Data flow diagram</Header>}>
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
            <Controls />
            <Panel position="top-left"><NodeSelector addCallback={onAdd} /></Panel>
            <Panel position="top-right"><ZIndexChanger addCallback={onZIndexChange} /></Panel>
          </ReactFlow>
        </s.OuterContainer>
      </Container>
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