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

import * as React from 'react';
import {
  CanvasInnerDefault, CanvasOuterDefault, CanvasWrapper, ICanvasInnerDefaultProps, ICanvasOuterDefaultProps, IChart, IConfig, ILink,
  ILinkDefaultProps, INodeDefaultProps, INodeInnerDefaultProps, IOnCanvasClick, IOnCanvasDrop, IOnDeleteKey, IOnDragCanvas,
  IOnDragNode, IOnLinkCancel, IOnLinkClick, IOnLinkComplete, IOnLinkMouseEnter,
  IOnLinkMouseLeave, IOnLinkMove, IOnLinkStart, IOnNodeClick, IOnNodeDoubleClick, IOnNodeSizeChange, IOnLabelDoubleClick,
  IOnPortPositionChange, IPortDefaultProps,
  IPortsDefaultProps, ISelectedOrHovered, LinkDefault, LinkWrapper,
  NodeDefault, NodeInnerDefault, NodeWrapper, PortDefault, PortsDefault, IOnTrustBoundaryClick, IOnDragTrustBoundary,
} from '../../';
import { ITrustBoundaryDefaultProps, TrustBoundaryDefault, TrustBoundaryWrapper } from '../TrustBoundary';

export interface IFlowChartCallbacks {
  onDragNode: IOnDragNode;
  onDragCanvas: IOnDragCanvas;
  onCanvasDrop: IOnCanvasDrop;
  onLinkStart: IOnLinkStart;
  onLinkMove: IOnLinkMove;
  onLinkComplete: IOnLinkComplete;
  onLinkCancel: IOnLinkCancel;
  onPortPositionChange: IOnPortPositionChange;
  onLinkMouseEnter: IOnLinkMouseEnter;
  onLinkMouseLeave: IOnLinkMouseLeave;
  onLinkClick: IOnLinkClick;
  onCanvasClick: IOnCanvasClick;
  onDeleteKey: IOnDeleteKey;
  onNodeClick: IOnNodeClick;
  onNodeDoubleClick: IOnNodeDoubleClick;
  onNodeSizeChange: IOnNodeSizeChange;
  onLabelDoubleClick: IOnLabelDoubleClick;
  onTrustBoundaryClick: IOnTrustBoundaryClick;
  onDragTrustBoundary: IOnDragTrustBoundary;
};

export interface IFlowChartComponents {
  CanvasOuter?: React.FunctionComponent<ICanvasOuterDefaultProps>;
  CanvasInner?: React.FunctionComponent<ICanvasInnerDefaultProps>;
  NodeInner?: React.FunctionComponent<INodeInnerDefaultProps>;
  Ports?: React.FunctionComponent<IPortsDefaultProps>;
  Port?: React.FunctionComponent<IPortDefaultProps>;
  Node?: React.FunctionComponent<INodeDefaultProps>;
  Link?: React.FunctionComponent<ILinkDefaultProps>;
  TrustBoundary?: React.FunctionComponent<ITrustBoundaryDefaultProps>;
};

export interface IFlowChartProps {
  /**
   * The current chart state
   */
  chart: IChart;
  /**
   * Callbacks for updating chart state.
   * See container/actions.ts for example state mutations
   */
  callbacks: IFlowChartCallbacks;
  /**
   * Custom components
   */
  Components?: IFlowChartComponents;
  /**
   * Other config. This will be passed into all components and actions.
   * Don't store state here as it may trigger re-renders
   */
  config?: IConfig;
  isAllowAddLinkLabel: boolean;
}

export const FlowChart = (props: IFlowChartProps) => {
  const [canvasSize, setCanvasSize] = React.useState<{ width: number; height: number }>({ width: 0, height: 0 });
  //console.log('----flow chart prop---- ', props);

  const {
    chart,
    isAllowAddLinkLabel,
    callbacks: {
      onDragNode,
      onDragCanvas,
      onCanvasDrop,
      onLinkStart,
      onLinkMove,
      onLinkComplete,
      onLinkCancel,
      onPortPositionChange,
      onLinkMouseEnter,
      onLinkMouseLeave,
      onLinkClick,
      onCanvasClick,
      onDeleteKey,
      onNodeClick,
      onNodeDoubleClick,
      onNodeSizeChange,
      onLabelDoubleClick,
      onTrustBoundaryClick,
      onDragTrustBoundary,
    },
    Components: {
      CanvasOuter = CanvasOuterDefault,
      CanvasInner = CanvasInnerDefault,
      NodeInner = NodeInnerDefault,
      Ports = PortsDefault,
      Port = PortDefault,
      Node = NodeDefault,
      Link = LinkDefault,
      TrustBoundary = TrustBoundaryDefault,
    } = {},
    config = {},
  } = props;
  const { links, nodes, trustBoundaries, selected, hovered, offset } = chart;
  const canvasCallbacks = { onDragCanvas, onCanvasClick, onDeleteKey, onCanvasDrop };
  const linkCallbacks = { onLinkMouseEnter, onLinkMouseLeave, onLinkClick, onLabelDoubleClick };
  const nodeCallbacks = { onDragNode, onNodeClick, onNodeSizeChange, onNodeDoubleClick };
  const trustBoundaryCallbacks = { onTrustBoundaryClick, onDragTrustBoundary };
  const portCallbacks = { onPortPositionChange, onLinkStart, onLinkMove, onLinkComplete, onLinkCancel };

  const nodesInView = Object.keys(nodes).filter((nodeId) => {
    // TODO: define this in chart?
    const defaultNodeSize = { width: 500, height: 500 };

    const { x, y } = nodes[nodeId].position;
    const size = nodes[nodeId].size || defaultNodeSize;

    return x + offset.x + size.width > 0 && x + offset.x < canvasSize.width &&
      y + offset.y + size.height > 0 && y + offset.y < canvasSize.height;
  });

  const linksInView = Object.keys(links).filter((linkId) => {
    const from = links[linkId].from;
    const to = links[linkId].to;

    return (
      !to.nodeId ||
      nodesInView.indexOf(from.nodeId) !== -1 ||
      nodesInView.indexOf(to.nodeId) !== -1
    );
  });

  const trustBoundariesInView = Object.keys(trustBoundaries).filter((trustBoundaryId) => {
    const defaultTrustBoundarySize = { width: 100, height: 100 };
    const { x, y } = trustBoundaries[trustBoundaryId].position;
    const size = trustBoundaries[trustBoundaryId].size || defaultTrustBoundarySize;

    return x + offset.x + size.width > 0 && x + offset.x < canvasSize.width &&
      y + offset.y + size.height > 0 && y + offset.y < canvasSize.height;
  });

  return (
    <CanvasWrapper
      config={config}
      position={chart.offset}
      ComponentInner={CanvasInner}
      ComponentOuter={CanvasOuter}
      onSizeChange={(width, height) => setCanvasSize({ width, height })}
      {...canvasCallbacks}
    >
      { linksInView.map((linkId) => {
        const isSelected = selected.type === 'link' && selected.id === linkId;
        //console.log('IS LINK SELECTED ', isSelected);
        const isHovered = hovered.type === 'link' && hovered.id === linkId;
        const fromNodeId = links[linkId].from.nodeId;
        const toNodeId = links[linkId].to.nodeId;

        return (
          <LinkWrapper
            config={config}
            key={linkId}
            link={links[linkId]}
            linkLabel={links[linkId].properties && links[linkId].properties.label ? links[linkId].properties.label : ''}
            Component={Link}
            isSelected={isSelected}
            isHovered={isHovered}
            isAllowAddLinkLabel={isAllowAddLinkLabel}
            fromNode={nodes[fromNodeId]}
            toNode={toNodeId ? nodes[toNodeId] : undefined}
            {...linkCallbacks}
          />
        );
      })}
      { nodesInView.map((nodeId) => {
        const isSelected = selected.type === 'node' && selected.id === nodeId;
        //console.log('IS NODE SELECTED ', isSelected);
        const selectedLink = getSelectedLinkForNode(selected, nodeId, links);
        const hoveredLink = getSelectedLinkForNode(hovered, nodeId, links);

        return (
          <NodeWrapper
            config={config}
            key={nodeId}
            Component={Node}
            node={nodes[nodeId]}
            offset={chart.offset}
            isSelected={isSelected}
            selected={selectedLink ? selected : undefined}
            hovered={hoveredLink ? hovered : undefined}
            selectedLink={selectedLink}
            hoveredLink={hoveredLink}
            NodeInner={NodeInner}
            Ports={Ports}
            Port={Port}
            {...nodeCallbacks}
            {...portCallbacks}
          />
        );
      })
      }
      { trustBoundariesInView.map((trustBoundaryId) => {
        const isSelected = selected.type === 'trustBoundary' && selected.id === trustBoundaryId;
        return (
          <TrustBoundaryWrapper
            config={config}
            key={trustBoundaryId}
            Component={TrustBoundary}
            trustBoundary={trustBoundaries[trustBoundaryId]}
            offset={chart.offset}
            isSelected={isSelected}
            {...trustBoundaryCallbacks}
          />
        );
      })
      }
    </CanvasWrapper>
  );
};

const getSelectedLinkForNode = (
  selected: ISelectedOrHovered,
  nodeId: string,
  links: IChart['links'],
): ILink | undefined => {
  const link = selected.type === 'link' && selected.id ? links[selected.id] : undefined;

  if (link && (link.from.nodeId === nodeId || link.to.nodeId === nodeId)) {
    return link;
  }

  return undefined;
};