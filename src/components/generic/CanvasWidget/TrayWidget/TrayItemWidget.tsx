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
import styled from '@emotion/styled';

export interface TrayItemWidgetProps {
  model: any;
}

const TrayItem = styled.div<TrayItemWidgetProps>`
  padding: 10px 30px;
  font-size: 14px;
  background: black;
  cursor: move;
  margin: 10px auto;
  color: black;

  ${ (props: any) => {
    switch (props.model) {
      case 'actor':
        return `
          &.actor {
            width: 80px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: white;
            color: black;
            border: 2px solid ;
            padding: 0;
          }
        `;
      case 'process':
        return `
          &.process {
            width: 80px;
            height: 80px;
            border-radius: 40px;
            background: white;
            line-height: 80px;
            padding: 0;
            text-align: center;
            color: black;
            border: 2px solid black;
          }
        `;
      case 'datastore':
        return `
          &.datastore {
            width: 80px;
            height: 40px;
            background: white;
            line-height: 40px;
            padding: 0;
            text-align: center;
            color: black;
            border-top: 4px solid black;
            border-bottom: 4px solid black;
          }
        `;
      case 'trust-boundary':
        return `
          &.trust-boundary {
            width: 80px;
            height: 45px;
            line-height: 22px;
            text-align: center;
            background: white;
            color: black;
            border: 2px dashed black;
            padding: 0;
          }
        `;
      default:
        return '';
    }
  }
}
`;

export class TrayItemWidget extends React.Component<TrayItemWidgetProps> {
  render() {
    return (
      <TrayItem
        draggable={true}
        onDragStart={(event) => {
          event.dataTransfer.setData(
            'storm-diagram-node',
            JSON.stringify(this.props.model),
          );
        }}
        model={this.props.model}
        className={this.props.model}
      >
        {this.props.model.replace('-', ' ')}
      </TrayItem>
    );
  }
}
