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
// eslint-disable-next-line import/no-extraneous-dependencies
import { DraggableData, Rnd } from 'react-rnd';

import {
  IConfig, IOnDragTrustBoundary, IOnTrustBoundaryClick, IPosition, ISize, ITrustBoundary,
} from '../../';
import { ITrustBoundaryDefaultProps, TrustBoundaryDefault } from './TrustBoundary.default';

export interface ITrustBoundaryWrapperProps {
  config: IConfig;
  trustBoundary: ITrustBoundary;
  Component: React.FunctionComponent<ITrustBoundaryDefaultProps>;
  offset: IPosition;
  isSelected: boolean;
  onTrustBoundaryClick?: IOnTrustBoundaryClick;
  onDragTrustBoundary: IOnDragTrustBoundary;
}

export const TrustBoundaryWrapper = ({
  config,
  trustBoundary,
  isSelected,
  offset,
  Component = TrustBoundaryDefault,
  onDragTrustBoundary,
}: ITrustBoundaryWrapperProps) => {
  const [size, setSize] = React.useState<ISize>({ width: 0, height: 0 });
  isSelected;
  Component;
  config;
  trustBoundary;
  offset;
  size;
  const aref = React.useRef(null);

  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'dashed 2px red',
    background: 'transparent',
  };

  function handleDrag(event, data: DraggableData) {
    onDragTrustBoundary({ config, event, data, id: trustBoundary.id });
  };

  return (
    <Rnd
      ref={aref}
      style={style}
      default={{
        x: trustBoundary.position.x, //offset.x,
        y: trustBoundary.position.y, //offset.y,
        width: 100, //size.width || 100,
        height: 100, //size.width || 100,
      }}
      onDrag={handleDrag}
      onDragStart={(e) => {
        console.log('onDragStart', e);
        e.stopPropagation();
      }}
      //onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
      onResizeStop={(_e, _direction, ref, _delta, _position) => {
        setSize({
          width: ref.style.width as unknown as number,
          height: ref.style.height as unknown as number,
        });
      }} >
    </Rnd>
  );
};