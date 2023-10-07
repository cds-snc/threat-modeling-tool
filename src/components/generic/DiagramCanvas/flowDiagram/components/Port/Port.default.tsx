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
import { IConfig, IPort } from '../../';

export interface IPortDefaultProps {
  config: IConfig;
  port: IPort;
  isselected: boolean;
  isHovered: boolean;
  isLinkSelected: boolean;
  isLinkHovered: boolean;
};

const PortDefaultInner = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background: cornflowerblue;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: cornflowerblue;
  }
  & svg {
    width: 15px;
    height: 15px;
  }
`;

export const PortDefault = () => (
  <PortDefaultInner />
);
