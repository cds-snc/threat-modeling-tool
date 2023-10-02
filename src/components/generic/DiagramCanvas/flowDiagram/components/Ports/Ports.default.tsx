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
import { IConfig, PortsGroupDefault } from '../../';

export interface IPortsDefaultProps {
  config: IConfig;
  children: Array<React.ReactElement<any>>;
}

export const PortsDefault = ({ children, config }: IPortsDefaultProps) => {
  return (
    <div>
      <PortsGroupDefault config={config} side="top">
        {children.filter((child) => ['top'].includes(child.props.port.type))}
      </PortsGroupDefault>
      <PortsGroupDefault config={config} side="bottom">
        {children.filter((child) => ['bottom'].includes(child.props.port.type))}
      </PortsGroupDefault>
      <PortsGroupDefault config={config} side="right">
        {children.filter((child) => ['right'].includes(child.props.port.type))}
      </PortsGroupDefault>
      <PortsGroupDefault config={config} side="left">
        {children.filter((child) => ['left'].includes(child.props.port.type))}
      </PortsGroupDefault>
    </div>
  );
};
