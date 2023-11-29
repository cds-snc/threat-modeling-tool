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
import { IOnDragTrustBoundary, IOnTrustBoundaryClick, IPosition, ISize, ITrustBoundary, ITrustBoundaryDefaultProps, TrustBoundaryDefault } from './TrustBoundary.default';

export interface ITrustBoundaryWrapperProps {
  trustBoundary: ITrustBoundary;
  Component: React.FunctionComponent<ITrustBoundaryDefaultProps>;
  offset: IPosition;
  isSelected: boolean;
  onTrustBoundaryClick: IOnTrustBoundaryClick;
  onDragTrustBoundary: IOnDragTrustBoundary;
}

export const TrustBoundaryWrapper = ({
  trustBoundary,
  isSelected,
  offset,
  Component = TrustBoundaryDefault,
  onDragTrustBoundary,
  onTrustBoundaryClick,
}: ITrustBoundaryWrapperProps) => {
  const [size, setSize] = React.useState<ISize>({ width: 0, height: 0 });
  isSelected;
  Component;
  trustBoundary;
  offset;
  size;
  const aref = React.useRef(null);

  const trustBoundaryStyle = {
    display: 'flex',
    alignItems: 'first baseline',
    justifyContent: 'start',
    border: 'dashed 2px red',
    background: 'transparent',
  };

  const trustBoundaryLabelStyle = {
    border: 'dashed 2px red',
    background: 'red',
    filter: 'opacity(60%)',
    color: 'white',
    fontSize: '9px',
    paddingTop: '1px',
    paddingBottom: '1px',
    paddingLeft: '2px',
    paddingRight: '2px',
    width: 'fit-content',
    height: 'fit-content',
  };

  function handleDrag(event, data: DraggableData) {
    onDragTrustBoundary({ event, data, id: trustBoundary.id });
  };

  function handleClick(e, _data: DraggableData) {
    onTrustBoundaryClick({ trustBoundaryId: trustBoundary.id });
    e.stopPropagation();
  };

  return (
    <Rnd
      ref={aref}
      style={trustBoundaryStyle}
      default={{
        x: trustBoundary.position.x, //offset.x,
        y: trustBoundary.position.y, //offset.y,
        width: 200, //size.width || 100,
        height: 100, //size.width || 100,
      }}
      onClick={handleClick}
      onDrag={handleDrag}
      onDragStart={(e) => {
        e.stopPropagation();
      }}
      //onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
      onResizeStop={(_e, _direction, ref, _delta, _position) => {
        setSize({
          width: ref.style.width as unknown as number,
          height: ref.style.height as unknown as number,
        });
      }} >
      <div style={trustBoundaryLabelStyle}>{trustBoundary.properties?.name}</div>
    </Rnd>
  );
};