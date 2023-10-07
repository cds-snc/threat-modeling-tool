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
import { INode, IPosition } from '../../../';

export const getLinkPosition = (node: INode, portId: string): IPosition => {
  const port = node.ports[portId];
  let nodeWidth = (!!node && !!node.size) ? node.size.width : 0;
  let nodeHeight = (!!node && !!node.size) ? node.size.height : 0;
  return {
    x: node.position.x + (port.position ? port.position.x : 0),
    y: node.position.y + (port.position ? port.position.y : 0),
    portType: port.type,
    nodeWidth,
    nodeHeight,
  };
};