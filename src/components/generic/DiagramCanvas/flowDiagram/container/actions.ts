/** *******************************************************************************************************************
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.

  Licensed under the Apache License, Version 2.0 (the "License").
  You may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
 ******************************************************************************************************************** */
import { v4 } from 'uuid';
import {
  IChart, IOnCanvasClick, IOnCanvasDrop, IOnDeleteKey, IOnDragCanvas, IOnDragNode, IOnLinkCancel,
  IOnLinkComplete, IOnLinkMouseEnter, IOnLinkMouseLeave, IOnLinkMove, IOnLinkStart, IOnLinkClick, IOnNodeClick,
  IOnNodeDoubleClick, IOnNodeSizeChange, IOnPortPositionChange,
} from '../';
import { rotate } from './utils/rotate';

/**
 * This file contains actions for updating state after each of the required callbacks
 */

export const onDragNode: IOnDragNode = ({ config, event, data, id }) => (chart: IChart) => {
  const nodechart = chart.nodes[id];
  //console.log('onDragNode event: ', event);
  event;
  if (nodechart) {
    chart.nodes[id] = {
      ...nodechart,
      position: config && config.snapToGrid ? { x: Math.round(data.x / 20) * 20, y: Math.round(data.y / 20) * 20 } : data,
    };
  };

  return chart;
};

export const onDragCanvas: IOnDragCanvas = ({ config, event, data }) => (chart: IChart): IChart => {
  //console.log('onDragNode event: ', event);
  event;
  chart.offset = config && config.snapToGrid ? { x: Math.round(data.x / 20) * 20, y: Math.round(data.y / 20) * 20 } : data;
  return chart;
};

export const onLinkStart: IOnLinkStart = ({ linkId, fromNodeId, fromPortId }) => (chart: IChart): IChart => {
  chart.links[linkId] = {
    id: linkId,
    from: {
      nodeId: fromNodeId,
      portId: fromPortId,
    },
    to: {},
  };
  return chart;
};

export const onLinkMove: IOnLinkMove = ({ linkId, toPosition }) => (chart: IChart): IChart => {
  const link = chart.links[linkId];
  link.to.position = toPosition;
  chart.links[linkId] = { ...link };
  return chart;
};

export const onLinkComplete: IOnLinkComplete = (props) => {
  const { linkId, fromNodeId, fromPortId, toNodeId, toPortId, config = {} } = props;
  return (chart: IChart): IChart => {
    if (!config.readonly
      && (config.validateLink ? config.validateLink({ ...props, chart }) : true) && [fromNodeId, fromPortId].join() !== [toNodeId, toPortId].join()) {
      chart.links[linkId].to = {
        nodeId: toNodeId,
        portId: toPortId,
      };
    } else {
      delete chart.links[linkId];
    };
    return chart;
  };
};

export const onLinkCancel: IOnLinkCancel = ({ linkId }) => (chart: IChart) => {
  delete chart.links[linkId];
  return chart;
};

export const onLinkMouseEnter: IOnLinkMouseEnter = ({ linkId }) => (chart: IChart) => {
  // Set the link to hover
  const link = chart.links[linkId];
  // Set the connected ports to hover
  if (link.to.nodeId && link.to.portId) {
    if (chart.hovered.type !== 'link' || chart.hovered.id !== linkId) {
      chart.hovered = {
        type: 'link',
        id: linkId,
      };
    }
  };
  return chart;
};

export const onLinkMouseLeave: IOnLinkMouseLeave = ({ linkId }) => (chart: IChart) => {
  const link = chart.links[linkId];
  // Set the connected ports to hover
  if (link.to.nodeId && link.to.portId) {
    chart.hovered = {};
  }
  return chart;
};

export const onLinkClick: IOnLinkClick = ({ linkId }) => (chart: IChart) => {
  console.log('----actions.ts on link click----', linkId);
  if (chart.selected.id !== linkId || chart.selected.type !== 'link') {
    chart.selected = {
      type: 'link',
      id: linkId,
    };
  }
  return chart;
};

export const onCanvasClick: IOnCanvasClick = () => (chart: IChart) => {
  console.log('----actions.ts on canvas click----', chart);
  if (chart.selected.id) {
    chart.selected = {};
  }
  return chart;
};

export const onDeleteKey: IOnDeleteKey = () => (chart: IChart) => {
  if (chart.selected.type === 'node' && chart.selected.id) {
    const node = chart.nodes[chart.selected.id];
    // Delete the connected links
    Object.keys(chart.links).forEach((linkId) => {
      const link = chart.links[linkId];
      if (link.from.nodeId === node.id || link.to.nodeId === node.id) {
        delete chart.links[link.id];
      }
    });
    // Delete the node
    delete chart.nodes[chart.selected.id];
  } else if (chart.selected.type === 'link' && chart.selected.id) {
    delete chart.links[chart.selected.id];
  }
  if (chart.selected) {
    chart.selected = {};
  }
  return chart;
};

export const onNodeClick: IOnNodeClick = ({ nodeId }) => (chart: IChart) => {
  console.log('----actions.ts on node click----', nodeId);
  chart.selected = {
    type: 'node',
    id: nodeId,
  };
  //if (chart.selected.id !== nodeId || chart.selected.type !== 'node') {
  //  chart.selected = {
  //    type: 'node',
  //    id: nodeId,
  //  };
  // }
  return chart;
};

export const onNodeDoubleClick: IOnNodeDoubleClick = ({ nodeId }) => (chart: IChart) => {
  console.log('----actions.ts on node double click----', nodeId);
  chart.selected = {
    type: 'node',
    id: nodeId,
  };
  // if (chart.selected.id !== nodeId || chart.selected.type !== 'node') {
  //   chart.selected = {
  //     type: 'node',
  //     id: nodeId,
  //   }
  // }
  return chart;
};

export const onNodeSizeChange: IOnNodeSizeChange = ({ nodeId, size }) => (chart: IChart) => {
  chart.nodes[nodeId] = {
    ...chart.nodes[nodeId],
    size,
  };
  return chart;
};

export const onPortPositionChange: IOnPortPositionChange = ({ node: nodeToUpdate, port, el, nodesEl }) =>
  (chart: IChart): IChart => {
    if (nodeToUpdate.size) {
      // rotate the port's position based on the node's orientation prop (angle)
      const center = { x: nodeToUpdate.size.width / 2, y: nodeToUpdate.size.height / 2 };
      const current = { x: el.offsetLeft + nodesEl.offsetLeft + el.offsetWidth / 2, y: el.offsetTop + nodesEl.offsetTop + el.offsetHeight / 2 };
      const angle = nodeToUpdate.orientation || 0;
      const position = rotate(center, current, angle);

      const node = chart.nodes[nodeToUpdate.id];
      node.ports[port.id].position = {
        x: position.x,
        y: position.y,
      };

      chart.nodes[nodeToUpdate.id] = { ...node };
    }

    return chart;
  };

export const onCanvasDrop: IOnCanvasDrop = ({ config, data, position }) => (chart: IChart): IChart => {
  const id = v4();
  chart.nodes[id] = {
    id,
    position: config && config.snapToGrid ? { x: Math.round(position.x / 20) * 20, y: Math.round(position.y / 20) * 20 } : position,
    orientation: data.orientation || 0,
    type: data.type,
    ports: data.ports,
    properties: data.properties,
  };
  return chart;
};
