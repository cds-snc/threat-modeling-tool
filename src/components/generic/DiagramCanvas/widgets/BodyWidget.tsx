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
import * as _ from 'lodash';
import { TrayWidget } from './TrayWidget';
import { Application } from '../Application';
import { TrayItemWidget } from './TrayItemWidget';
import { DefaultNodeModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { CanvasWidgetHelper } from './CanvasWidgetHelper';
import styled from '@emotion/styled';

export interface BodyWidgetProps {
  app: Application;
}

namespace S {
  export const Body = styled.div`
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		min-height: 100%;
	`;

  export const Header = styled.div`
		display: flex;
		background: rgb(30, 30, 30);
		flex-grow: 0;
		flex-shrink: 0;
		color: white;
		font-family: Helvetica, Arial, sans-serif;
		padding: 10px;
		align-items: center;
	`;

  export const Content = styled.div`
		display: flex;
		flex-grow: 1;
	`;

  export const Layer = styled.div`
		position: relative;
		flex-grow: 1;
	`;
}

export class BodyWidget extends React.Component<BodyWidgetProps> {
  render() {
    return (
      <S.Body>
        <S.Header>
	        <div className="title">Storm React Diagrams - DnD demo</div>
        </S.Header>
        <S.Content>
	      <TrayWidget>
		      <TrayItemWidget model={{ type: 'in' }} name="Process" color="rgb(192,255,0)" />
		      <TrayItemWidget model={{ type: 'out' }} name="Store" color="rgb(0,192,255)" />
	      </TrayWidget>
	      <S.Layer
		      onDrop={(event) => {
              var data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
              var nodesCount = _.keys(this.props.app.getDiagramEngine().getModel().getNodes()).length;

              var node: DefaultNodeModel = null;
              if (data.type === 'in') {
	              node = new DefaultNodeModel('Node ' + (nodesCount + 1), 'rgb(192,255,0)');
	              node.addInPort('In');
              } else {
	              node = new DefaultNodeModel('Node ' + (nodesCount + 1), 'rgb(0,192,255)');
	              node.addOutPort('Out');
              }
              var point = this.props.app.getDiagramEngine().getRelativeMousePoint(event);
              node.setPosition(point);
              this.props.app.getDiagramEngine().getModel().addNode(node);
              this.forceUpdate();
		   }}
		    onDragOver={(event) => {
		      event.preventDefault();
		   }}
          >
            <CanvasWidgetHelper>
              <CanvasWidget engine={this.props.app.getDiagramEngine()} />
            </CanvasWidgetHelper>
	      </S.Layer>
        </S.Content>
      </S.Body>
    );
  }
}