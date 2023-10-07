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
import { DraggableData } from 'react-draggable';
import { INode, IPort } from './chart';
import { IConfig } from './config';
import { IOffset, IPosition, ISize } from './generics';

export type IOnDragNode = (input: { config?: IConfig; event: MouseEvent; data: DraggableData; id: string }) => void;

export type IOnDragCanvas = (input: { config?: IConfig; event: MouseEvent; data: DraggableData }) => void;

export type IOnPortPositionChange =
(input: { config?: IConfig; node: INode; port: IPort; el: HTMLDivElement; nodesEl: HTMLDivElement | IOffset }) => void;

export interface IOnLinkBaseEvent {
  config?: IConfig;
  linkId: string;
  startEvent: React.MouseEvent;
  fromNodeId: string;
  fromPortId: string;
}

export type IOnLinkStart = (input: IOnLinkBaseEvent) => void

export interface IOnLinkMoveInput extends IOnLinkBaseEvent {
  toPosition: {
    x: number;
    y: number;
  };
}
export type IOnLinkMove = (input: IOnLinkMoveInput) => void;

export type IOnLinkCancel = (input: IOnLinkBaseEvent) => void;

export interface IOnLinkCompleteInput extends IOnLinkBaseEvent {
  toNodeId: string;
  toPortId: string;
}
export type IOnLinkComplete = (input: IOnLinkCompleteInput) => void;

export type IOnLinkMouseEnter = (input: { config?: IConfig; linkId: string }) => void;

export type IOnLinkMouseLeave = (input: { config?: IConfig; linkId: string }) => void;

export type IOnLinkClick = (input: { config?: IConfig; linkId: string }) => void;

export type IOnCanvasClick = (input: { config?: IConfig }) => void;

export type IOnDeleteKey = (input: { config?: IConfig }) => void;

export type IOnNodeClick = (input: { config?: IConfig; nodeId: string }) => void;

export type IOnNodeDoubleClick = (input: { config?: IConfig; nodeId: string }) => void;

export type IOnLabelDoubleClick = (input: { config?: IConfig; linkId: string }) => void;

export type IOnNodeSizeChange = (input: { config?: IConfig; nodeId: string; size: ISize }) => void;

export type IOnCanvasDrop = (input: { config?: IConfig; data: any; position: IPosition }) => void;
