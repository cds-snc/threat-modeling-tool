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
import ActorNodeModel from './ActorNodeModel';
import {
  DiagramEngine,
  PortModel,
  PortModelAlignment,
  PortModelGenerics,
  PortWidget,
} from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';

export interface ActorNodeWidgetProps {
  node: ActorNodeModel;
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

export class ActorNodeWidget extends React.Component<ActorNodeWidgetProps> {
  constructor(props) {
    super(props);
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
              <rect width="${this.props.size}" height="${this.props.size-(this.props.size/2)}" fill="white" stroke="${this.props.node.isSelected() ? '#56bdf9' : 'black'}" stroke-width="3" stroke-miterlimit="10"/>
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
          <S.Port />
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
          <S.Port />
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
          <S.Port />
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
          <S.Port />
        </PortWidget>
      </div>
    );
  }
}
