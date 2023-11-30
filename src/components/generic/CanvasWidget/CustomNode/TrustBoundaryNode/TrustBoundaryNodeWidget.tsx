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
import { DraggableData, Rnd } from 'react-rnd';
import TrustBoundaryNodeModel from './TrustBoundaryNodeModel';
import {
  DiagramEngine,
} from '@projectstorm/react-diagrams';
import { RefObject } from 'react';

const trustBoundaryStyle = {
  display: 'flex',
  alignItems: 'first baseline',
  justifyContent: 'start',
  border: 'dashed 2px red',
  background: 'transparent',
  zIndex: -100000,
};

const trustBoundaryLabelStyle = {
  border: 'dashed 2px red',
  background: 'red',
  filter: 'opacity(60%)',
  color: 'white',
  fontSize: '9px',
  paddingTop: '1px',
  paddingBottom: '1px',
  paddingLeft: '2px',
  paddingRight: '2px',
  width: 'fit-content',
  height: 'fit-content',
};

export interface TrustBoundaryNodeWidgetProps {
  node: TrustBoundaryNodeModel;
  engine: DiagramEngine;
}

export class TrustBoundaryNodeWidget extends React.Component<TrustBoundaryNodeWidgetProps> {

  state: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
  aref: RefObject<Rnd>;

  constructor(props) {
    super(props);
    this.state = {
      width: props.node.nodeWidth,
      height: props.node.nodeHeight,
      x: props.node.nodeX,
      y: props.node.nodeY,
    };
    this.aref = React.createRef();
  };

  handleDrag(_event, _data: DraggableData) {
  };

  render() {
    return (
      <Rnd
        ref={this.aref}
        style={trustBoundaryStyle}
        key={this.props.node.getID()}
        position={{ x: this.state.x, y: this.state.y }}
        size={{ width: this.state.width, height: this.state.height }}
        onClick={(event) => {
          if (this.props.node.filterStatementsCallback) {
            this.props.engine.getModel().clearSelection();
            this.props.node.setSelected(true);
            this.props.node.filterStatementsCallback(
              '',
              this.props.node.getID(),
              'trust-boundary',
              this.props.node.name || '',
              this.props.node.description || '',
              this.props.node.outOfScope || false,
              this.props.node.outOfScopeReason || '',
              this.props.node.tags || [],
              [],
              [],
              [],
              []);
          }
          event.stopPropagation();
        }
        }
        onDrag={this.handleDrag}
        onDragStart={(e) => {
          e.stopPropagation();
        }}
        onDragStop={(_e, d) => {
          this.setState({ x: d.x, y: d.y });
          this.props.node.nodeX = d.x;
          this.props.node.nodeY = d.y;
        }}
        onResizeStop={(_e, _direction, ref, _delta, position) => {
          this.setState({
            width: ref.style.width,
            height: ref.style.height,
            ...position,
          });
          this.props.node.nodeWidth = ref.style.width as unknown as number;
          this.props.node.nodeHeight = ref.style.height as unknown as number;
          //this.props.node.updateDimensions({ width: ref.style.width as unknown as number, height: ref.style.height as unknown as number });
        }} >
        <div style={trustBoundaryLabelStyle}>{this.props.node.name}</div>
      </Rnd>
    );
  }
}
