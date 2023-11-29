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
import DatastoreNodeModel from './DatastoreNodeModel';
import {
  DiagramEngine,
  PortModel,
  PortModelAlignment,
  PortModelGenerics,
  PortWidget,
} from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';

export interface DatastoreNodeWidgetProps {
  node: DatastoreNodeModel;
  engine: DiagramEngine;
  size: number;
}

namespace S {
  export const Port = styled.div`
    width: 16px;
    height: 16px;
    z-index: 10;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      background: rgba(0, 0, 0, 1);
    }
  `;
}

export class DatastoreNodeWidget extends React.Component<DatastoreNodeWidgetProps> {

  state: {
    mouseDownX: number;
    mouseDownY: number;
  };

  constructor(props) {
    super(props);
    this.state = {
      mouseDownX: 0,
      mouseDownY: 0,
    };
  };

  handleOnPortMouseDown = (event) => {
    console.log('ActorNodeWidget.onmousedown', event);
    this.setState({
      mouseDownX: event.clientX,
      mouseDownY: event.clientY,
    });
  };

  handleOnPortMouseUp = (event) => {
    console.log('ActorNodeWidget.onmouseup', event);
    if (event.clientX === this.state.mouseDownX && event.clientY === this.state.mouseDownY) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  handleOnPortClick= (event) => {
    console.log('ActorNodeWidget.onclick', event);
    event.preventDefault();
    event.stopPropagation();
  };

  render() {
    return (
      <div
        className={'datastore-node'}
        style={{
          position: 'relative',
          width: this.props.size,
          height: this.props.size - this.props.size/2,
        }}
      >
        <svg
          width={this.props.size}
          height={this.props.size - (this.props.size/2)}
          dangerouslySetInnerHTML={{
            __html:
              `
						<g id="Layer_2">
              <rect width="${this.props.size}" height="${this.props.size-(this.props.size/2)}" fill="white" stroke="${this.props.node.isSelected() ? '#56bdf9' : ''}" stroke-width="3" stroke-miterlimit="10"/>
              
              <polyline points="${0},0 ${this.props.size},0" fill="none" stroke="${this.props.node.isSelected() ? '#56bdf9' : 'black'}" stroke-width="3" />
              <polyline points="${0},${this.props.size/2} ${this.props.size},${this.props.size/2}" fill="none" stroke="${this.props.node.isSelected() ? '#56bdf9' : 'black'}" stroke-width="3" />
              
              <polyline points="${0},5 ${this.props.size},5" fill="none" stroke="${this.props.node.isSelected() ? '#56bdf9' : 'black'}" stroke-width="2" />
              <polyline points="${0},${this.props.size/2-5} ${this.props.size},${this.props.size/2-5}" fill="none" stroke="${this.props.node.isSelected() ? '#56bdf9' : 'black'}" stroke-width="2" />
							<text x="50%" y="50%" text-anchor="middle" stroke="black" stroke-width="0.5px" dy=".2em">${this.props.node.name}</text>
						</g>
					`,
          }}
        />
        <PortWidget
          style={{
            top: this.props.size / 2 - this.props.size / 4 - 8,
            left: -8,
            position: 'absolute',
          }}
          port={this.props.node.getPort(PortModelAlignment.LEFT) as PortModel<PortModelGenerics>}
          engine={this.props.engine}
        >
          <S.Port onMouseDown={this.handleOnPortMouseDown} onMouseUp={this.handleOnPortMouseUp} onClick={this.handleOnPortClick} />
        </PortWidget>
        <PortWidget
          style={{
            left: this.props.size / 2 - 8,
            top: -8,
            position: 'absolute',
          }}
          port={this.props.node.getPort(PortModelAlignment.TOP) as PortModel<PortModelGenerics>}
          engine={this.props.engine}
        >
          <S.Port onMouseDown={this.handleOnPortMouseDown} onMouseUp={this.handleOnPortMouseUp} onClick={this.handleOnPortClick} />
        </PortWidget>
        <PortWidget
          style={{
            left: this.props.size - 8,
            top: this.props.size / 2 - this.props.size / 4 - 8,
            position: 'absolute',
          }}
          port={this.props.node.getPort(PortModelAlignment.RIGHT) as PortModel<PortModelGenerics>}
          engine={this.props.engine}
        >
          <S.Port onMouseDown={this.handleOnPortMouseDown} onMouseUp={this.handleOnPortMouseUp} onClick={this.handleOnPortClick} />
        </PortWidget>
        <PortWidget
          style={{
            left: this.props.size / 2 - 8,
            top: this.props.size - this.props.size / 2 - 8,
            position: 'absolute',
          }}
          port={this.props.node.getPort(PortModelAlignment.BOTTOM) as PortModel<PortModelGenerics>}
          engine={this.props.engine}
        >
          <S.Port onMouseDown={this.handleOnPortMouseDown} onMouseUp={this.handleOnPortMouseUp} onClick={this.handleOnPortClick} />
        </PortWidget>
      </div>
    );
  }
}
