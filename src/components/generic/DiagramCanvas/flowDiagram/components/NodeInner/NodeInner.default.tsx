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
//import * as React from 'react';
import styled from 'styled-components';
import { IConfig, INode } from '../../';

export interface INodeInnerDefaultProps {
  config: IConfig;
  node: INode;
}

const Outer = styled.div`
  padding: 30px;
`;

export const NodeInnerDefault = ({ node }: INodeInnerDefaultProps) => {
  return (
    <Outer>
      <p> {(!!node.properties && !!node.properties.name) && `${node.properties.name}`} </p>
      <p> {(!!node.properties && !!node.properties.Id) && `${node.properties.Id}`} </p>
    </Outer>
  );
};
