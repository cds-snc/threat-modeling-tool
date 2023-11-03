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
import styled, { css } from 'styled-components';
import { IConfig, ITrustBoundary } from '../../';

export interface ITrustBoundaryDefaultProps {
  config: IConfig;
  trustBoundary: ITrustBoundary;
  children: any;
  isSelected: boolean;
  onClick: (e: React.MouseEvent) => void;
  style?: object;
  ref?: React.Ref<any>;
  outOfScope?: boolean;
};

const TrustBoundary = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(148, 80, 81);
  color: white;
  border-radius: 50%;
  ${(props: any) => props.isSelected && css`box-shadow: 0 10px 20px rgba(0,0,0,.1); margin-top: -2px`}
`;


export const TrustBoundaryDefault = React.forwardRef(
  ({ trustBoundary, children, ...otherProps }: ITrustBoundaryDefaultProps,
    ref: React.Ref<HTMLDivElement>) => {
    return (
      <TrustBoundary ref={ref} {...otherProps}>
        {children}
      </TrustBoundary>
    );
  });