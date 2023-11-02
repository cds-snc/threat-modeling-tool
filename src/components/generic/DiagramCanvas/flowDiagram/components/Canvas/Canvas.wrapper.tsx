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
import Draggable, { DraggableData } from 'react-draggable';
import { IConfig, IOnCanvasClick, IOnCanvasDrop, IOnDeleteKey, IOnDragCanvas, REACT_FLOW_CHART } from '../../';
import CanvasContext from './CanvasContext';
import { ICanvasInnerDefaultProps } from './CanvasInner.default';
import { ICanvasOuterDefaultProps } from './CanvasOuter.default';

export interface ICanvasWrapperProps {
  config: IConfig;
  position: {
    x: number;
    y: number;
  };
  onDragCanvas: IOnDragCanvas;
  onDeleteKey: IOnDeleteKey;
  onCanvasClick: IOnCanvasClick;
  onCanvasDrop: IOnCanvasDrop;
  ComponentInner: React.FunctionComponent<ICanvasInnerDefaultProps>;
  ComponentOuter: React.FunctionComponent<ICanvasOuterDefaultProps>;
  onSizeChange: (x: number, y: number) => void;
  children: any;
};

interface IState {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
}

export class CanvasWrapper extends React.Component<ICanvasWrapperProps, IState> {
  constructor(props) {
    super(props);
    this.draggableNodeRef = React.createRef();
  };

  public state = {
    width: 0,
    height: 0,
    offsetX: 0,
    offsetY: 0,
  };

  private draggableNodeRef: any = null;
  private ref = React.createRef<HTMLElement>();

  public componentDidMount () {
    window.addEventListener('error', function (e) {
      console.error(e);
    });
    this.updateSize();

    if (this.ref.current) {
      if ((window as any).ResizeObserver) {
        const ro = new (window as any).ResizeObserver(this.updateSize);
        ro.observe(this.ref.current);
      } else {
        window.addEventListener('resize', this.updateSize);
      }
      window.addEventListener('scroll', this.updateSize);
    }
  }

  public componentDidUpdate () {
    this.updateSize();
  }

  public componentWillUnmount () {
    window.removeEventListener('resize', this.updateSize);
    window.removeEventListener('scroll', this.updateSize);
  }

  public render () {
    const {
      config,
      ComponentInner,
      ComponentOuter,
      position,
      onDragCanvas,
      children,
      onCanvasClick,
      onDeleteKey,
      onCanvasDrop,
    } = this.props;

    const {
      offsetX,
      offsetY,
    } = this.state;

    function handleDrag(event, data: DraggableData) {
      console.log('onDragCanvas', config);
      onDragCanvas({ config, event, data });
    };

    return (
      <CanvasContext.Provider value={{ offsetX: this.state.offsetX, offsetY: this.state.offsetY }}>
        <ComponentOuter config={config} ref={this.ref}>
          <Draggable
            ref={this.draggableNodeRef}
            axis="both"
            position={position}
            grid={[1, 1]}
            onDrag={handleDrag}
            disabled={config.readonly}
          >
            <ComponentInner
              config={config}
              children={children}
              onClick={onCanvasClick}
              tabIndex={0}
              onKeyDown={ (e: React.KeyboardEvent) => {
                // delete or backspace keys
                if (e.keyCode === 46 || e.keyCode === 8) {
                  onDeleteKey({ config });
                }
              }}
              onDrop={ (e) => {
                const data = JSON.parse(e.dataTransfer.getData(REACT_FLOW_CHART));
                if (data) {
                  onCanvasDrop({
                    data,
                    position: {
                      x: e.clientX - (position.x + offsetX),
                      y: e.clientY - (position.y + offsetY),
                    },
                  } );
                }
              } }
              onDragOver={(e) => e.preventDefault()}
            />
          </Draggable>
        </ComponentOuter>
      </CanvasContext.Provider>
    );
  };

  private updateSize = () => {
    const el = this.ref.current;

    if (el) {
      const rect = el.getBoundingClientRect();

      if (el.offsetWidth !== this.state.width || el.offsetHeight !== this.state.height) {
        this.setState({ width: el.offsetWidth, height: el.offsetHeight });
        this.props.onSizeChange(el.offsetWidth, el.offsetHeight);
      }

      if (rect.left !== this.state.offsetX || rect.top !== this.state.offsetY) {
        this.setState({ offsetX: rect.left, offsetY: rect.top });
      }
    }
  };
};
