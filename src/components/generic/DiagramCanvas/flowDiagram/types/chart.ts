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
import { IPosition, ISize } from './generics';

export interface IChart {
  offset: IPosition;
  nodes: {
    [id: string]: INode;
  };
  links: {
    [id: string]: ILink;
  };
  properties?: any;

  /** System Temp */
  selected: ISelectedOrHovered;
  hovered: ISelectedOrHovered;

  isModelShow: boolean;
  showModelName: string;
  nodeName: string;
  nodeId: string;
  nodeDescription: string;
  nodeOutOfScope: boolean;
  nodeOutOfScopeReason: string;
  threats: {id: string}[];
  nodeRoleOption: string;
  linkLabel: string;
  newNodeId: string;
  newLinkId: string;
  clickNodeId: string;
  modelOption: string;
  alertMessageInfo: string;
  alertMessageStatus: string;
  clickLinkId: string;
  preNodes: any;
  preLinks: any;
}

export interface ISelectedOrHovered {
  type?: 'link' | 'node' | 'port';
  id?: string;
}

export interface INode {
  id: string;
  type: string;
  position: IPosition;
  orientation?: number;
  ports: {
    [id: string]: IPort;
  };
  properties?: any;
  /** System Temp */
  size?: ISize;
}

export interface IPort {
  id: string;
  type: string;
  value?: string;
  properties?: any;
  /** System Temp */
  position?: IPosition;
}

export interface ILink {
  id: string;
  from: {
    nodeId: string;
    portId: string;
  };
  to: {
    nodeId?: string;
    portId?: string;
    /** System Temp */
    position?: IPosition;
  };
  properties?: any;
}
