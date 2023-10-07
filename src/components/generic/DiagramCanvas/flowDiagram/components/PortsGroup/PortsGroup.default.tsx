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
import styled, { css } from 'styled-components';
import { IConfig } from '../../';

export interface IPortsGroupDefaultProps {
  config: IConfig;
  side: 'top' | 'bottom' | 'left' | 'right';
};

export const PortsGroupDefault = styled.div<IPortsGroupDefaultProps>`
  position: absolute;
  display: flex;
  justify-content: center;

  ${(props) => {
    if (props.side === 'top') {
      return css`
        width: 100%;
        left: 0;
        top: -12px;
        flex-direction: row;
        > div {
          margin: 0 3px !important;
        }
      `;
    } else if (props.side === 'bottom') {
      return css`
        width: 100%;
        left: 0;
        bottom: -12px;
        flex-direction: row;
        > div {
          margin: 0 3px !important;
        }
      `;
    } else if (props.side === 'left') {
      return css`
        height: 100%;
        top: 0;
        left: -12px;
        flex-direction: column;
        > div {
          margin: 3px 0 !important;
        }
      `;
    } else {
      return css`
        height: 100%;
        top: 0;
        right: -12px;
        flex-direction: column;
        > div {
          margin: 3px 0 !important;
        }
      `;
    }
  }}
`;
