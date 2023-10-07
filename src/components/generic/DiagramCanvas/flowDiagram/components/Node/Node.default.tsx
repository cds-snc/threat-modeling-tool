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
import { IConfig, INode } from '../../';

export interface INodeDefaultProps {
  config: IConfig;
  node: INode;
  children: any;
  isSelected: boolean;
  onClick: (e: React.MouseEvent) => void;
  onDoubleClick?: (e: React.MouseEvent) => void;
  style?: object;
  ref?: React.Ref<any>;
};

const StartPoint = styled.div`
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
  ${(props: any) => props.isSelected && css`
    box-shadow: 0 10px 20px rgba(0,0,0,.1);
    margin-top: -2px
    `
}
`;

const EndPoint = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(110, 97, 107);
  color: white;
  border-radius: 50%;
  ${(props: any) => props.isSelected && css`
    box-shadow: 0 10px 20px rgba(0,0,0,.1);
    margin-top: -2px
    `
}
`;

const ProcessQueue = styled.div`
  width: 200px;
  height: 120px;
  position: absolute;
  padding: 30px;
  background: rgb(217, 207, 138);
  color: white;
  border-radius: 10px;
  & div {
    padding: 0px;
    margin: 0px;
  }
  ${(props: any) => props.isSelected && css`
    box-shadow: 0 10px 20px rgba(0,0,0,.1);
    margin-top: -2px
    `
}
`;

const ProcessPoint = styled.div`
  width: 200px;
  height: 120px;
  position: absolute;
  padding: 30px;
  background: rgb(155, 127, 105);
  color: white;
  & div {
    padding: 0px;
    margin: 0px;
  }
  ${
  (props: any) => props.isSelected && css`
    box-shadow: 0 10px 20px rgba(0,0,0,.1);
    margin-top: -2px
    `
}
`;

export const NodeDefault = React.forwardRef(({ node, children, ...otherProps }: INodeDefaultProps, ref: React.Ref<HTMLDivElement>) => {
  switch (node.type) {
    case 'start':
      return (
        <StartPoint ref={ref}
          {...otherProps}>
          {children}
        </StartPoint>
      );
    case 'end':
      return (
        <EndPoint ref={ref} {...otherProps}>
          {children}
        </EndPoint>
      );
    case 'process-queue':
      return (
        <ProcessQueue ref={ref} {...otherProps}>
          {children}
        </ProcessQueue>
      );
    case 'process-point':
      return (
        <ProcessPoint ref={ref} {...otherProps}>
          {children}
        </ProcessPoint>
      );
  }
  return (
    <StartPoint ref={ref} {...otherProps}>
      {children}
    </StartPoint>
  );
});