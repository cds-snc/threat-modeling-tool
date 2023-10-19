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

import styled from 'styled-components';
import { IConfig } from '../../types';

export interface ICanvasOuterDefaultProps {
  config: IConfig;
  children: any;
  ref?: React.Ref<any>;
};

export const CanvasOuterDefault = styled.div<ICanvasOuterDefaultProps>`
  position: relative;
  border-radius: 15px;
  background-size: 20px 20px;
  background-color: rgba(0,0,0,0.08);
  background-image:
    linear-gradient(90deg,hsla(0,0%,100%,.2) 1px,transparent 0),
    linear-gradient(180deg,hsla(0,0%,100%,.2) 1px,transparent 0);
  width: 100%;
  overflow: hidden;
  cursor: not-allowed;
` as any;
