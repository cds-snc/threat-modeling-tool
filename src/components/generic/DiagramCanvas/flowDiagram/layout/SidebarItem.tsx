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
import styled from 'styled-components';
import { INode, REACT_FLOW_CHART } from '../';


export interface IOuterProps {
  className: string;
  draggable: boolean;
  itemStyle: string;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
}

const Outer = styled.div<IOuterProps>`
  padding: 20px 30px;
  font-size: 14px;
  background: white;
  cursor: move;
  margin: 10px auto;
  color: white;

  ${ (props: any) => {
    const { className, itemStyle } = props;
    switch (className) {
      case 'start':
        if (!!itemStyle) {
          return `
            &.start ${itemStyle}  
          `;
        }
        return `
          &.start {
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
      case 'process-queue':
        if (!!itemStyle) {
          return `&.process-queue ${itemStyle}  `;
        }
        return `
          &.process-queue {
            width: 80px;
            height: 45px;
            line-height: 22px;
            text-align: center;
            border-radius: 10px;
            background: white;
            color: black;
            border: 2px dashed black;
            padding: 0;
          }
        `;
      case 'process-point':
        if (!!itemStyle) {
          return `&.process-point ${itemStyle}`;
        }
        return `
          &.process-point {
            width: 80px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: white;
            color: black;
            border: 2px solid black;
            padding: 0;
          }
        `;
      case 'end':
        if (!!itemStyle) {
          return `&.end ${itemStyle}`;
        }
        return `
          &.end {
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
      default:
        return '';
    }
  } }

`;

export interface ISidebarItemProps {
  type: string;
  ports?: INode['ports'];
  properties?: any;
  itemStyle?: string;
}

const defaultPorts = {
  port1: {
    id: 'port1',
    type: 'top',
  },
  port2: {
    id: 'port2',
    type: 'right',
  },
  port3: {
    id: 'port3',
    type: 'bottom',
  },
  port4: {
    id: 'port4',
    type: 'left',
  },
};

const transposeName = (type) => {
  switch (type) {
    case 'start':
      return 'Process';
    case 'process-queue':
      return 'Trust boundary';
    case 'process-point':
      return 'Actor';
    case 'end':
      return 'Store';
    default:
      return 'Process';
  }
};

export const SidebarItem = ({ type, ports = defaultPorts, properties, itemStyle='' }: ISidebarItemProps) => {
  return (
    <Outer
      className={type}
      draggable={true}
      itemStyle={itemStyle}
      onDragStart={ (event) => {
        event.dataTransfer.setData(REACT_FLOW_CHART, JSON.stringify({ type, ports, properties }));
      } }
    >
      {transposeName(type)}
    </Outer>
  );
};
