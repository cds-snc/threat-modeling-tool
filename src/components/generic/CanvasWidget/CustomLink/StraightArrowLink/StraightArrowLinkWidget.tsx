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
import { DiagramEngine, LinkWidget, PointModel, DefaultLinkModel, DefaultLinkPointWidget, DefaultLinkSegmentWidget } from '@projectstorm/react-diagrams';
import * as React from 'react';
import { MouseEvent, useEffect, useRef } from 'react';

export interface DefaultLinkProps {
  link: DefaultLinkModel;
  diagramEngine: DiagramEngine;
  pointAdded?: (point: PointModel, event: MouseEvent) => any;
  renderPoints?: boolean;
  selected?: (event: MouseEvent) => any;
}

const CustomLinkArrowWidget = (props) => {
  const { point, previousPoint } = props;

  const angle =
    90 +
    (Math.atan2(
      point.getPosition().y - previousPoint.getPosition().y,
      point.getPosition().x - previousPoint.getPosition().x,
    ) *
      180) /
      Math.PI;

  //translate(50, -10),
  return (
    <g
      className='arrow'
      transform={
        'translate(' +
        point.getPosition().x +
        ', ' +
        point.getPosition().y +
        ')'
      }
    >
      <g style={{ transform: 'rotate(' + angle + 'deg)' }}>
        <g transform={'translate(0, -3)'}>
          <polygon
            points='0,10 8,30 -8,30'
            fill={props.color}
            data-id={point.getID()}
            data-linkid={point.getLink().getID()}
          />
        </g>
      </g>
    </g>
  );
};

export const StraightArrowLinkWidget: React.FC<DefaultLinkProps> = (props) => {
  const [selected, setSelected] = React.useState(false);
  const refPaths = useRef<React.RefObject<SVGPathElement>[]>([]);

  const renderPoints = () => {
    return props.renderPoints ?? true;
  };

  useEffect(() => {
    props.link.setRenderedPaths(refPaths.current.map((ref) => ref.current).filter(Boolean) as SVGPathElement[]);
    return () => {
      props.link.setRenderedPaths([]);
    };
  }, [props.link]);

  const generateRef = () => {
    const ref = React.createRef<SVGPathElement>();
    refPaths.current.push(ref);
    return ref;
  };

  const addPointToLink = (event: MouseEvent, index: number) => {
    if (
      !event.shiftKey &&
      !props.link.isLocked() &&
      props.link.getPoints().length - 1 <= props.diagramEngine.getMaxNumberPointsPerLink()
    ) {
      const position = props.diagramEngine.getRelativeMousePoint(event);
      const point = props.link.point(position.x, position.y, index);
      event.persist();
      event.stopPropagation();
      props.diagramEngine.getActionEventBus().fireAction({
        event,
        model: point,
      });
    }
  };

  const generatePoint = (point: PointModel): JSX.Element => {
    return (
      <DefaultLinkPointWidget
        key={point.getID()}
        point={point as any}
        colorSelected={props.link.getOptions().selectedColor ?? ''}
        color={props.link.getOptions().color}
      />
    );
  };

  const generateLink = (path: string, extraProps: any, id: string | number): JSX.Element => {
    return (
      <DefaultLinkSegmentWidget
        key={`link-${id}`}
        path={path}
        selected={selected}
        diagramEngine={props.diagramEngine}
        factory={props.diagramEngine.getFactoryForLink(props.link)}
        link={props.link}
        forwardRef={generateRef()}
        onSelection={setSelected}
        extras={extraProps}
      />
    );
  };

  const generateArrow = (point: PointModel, previousPoint: PointModel): JSX.Element => {
    return (
      <CustomLinkArrowWidget
        key={point.getID()}
        point={point as any}
        previousPoint={previousPoint as any}
        colorSelected={props.link.getOptions().selectedColor}
        color={props.link.getOptions().color}
      />
    );
  };

  const points = props.link.getPoints();
  const paths: JSX.Element[] = [];
  refPaths.current = []; // Reset the refPaths for the current render

  if (points.length === 2) {
    paths.push(
      generateLink(
        LinkWidget.generateLinePath(points[1], points[0]),
        {
          'data-linkid': props.link.getID(),
          'data-point': 0,
          'onMouseDown': (event: MouseEvent) => {
            if (props.link.getOptions().selected) {
              addPointToLink(event, 1);
            }
            props.selected?.(event);
          },
        },
        0,
      ),
    );

    if (props.link.getTargetPort() == null) {
      paths.push(generatePoint(points[1]));
    }
    if (props.link.getTargetPort() !== null) {
      paths.push(
        generateArrow(points[1], points[0]),
      );
    } else {
      paths.push(generatePoint(points[1]));
    }
  } else {
    for (let j = 0; j < points.length - 1; j++) {
      paths.push(
        generateLink(
          LinkWidget.generateLinePath(points[j], points[j + 1]),
          {
            'data-linkid': props.link.getID(),
            'data-point': j,
            'onMouseDown': (event: MouseEvent) => {
              if (props.link.getOptions().selected) {
                addPointToLink(event, j + 1);
              }
              props.selected?.(event);
            },
          },
          j,
        ),
      );
    }
    if (renderPoints()) {
      for (let i = 1; i < points.length - 1; i++) {
        paths.push(generatePoint(points[i]));
      }

      if (props.link.getTargetPort() !== null) {
        paths.push(
          generateArrow(points[points.length - 1], points[points.length - 2]),
        );
      } else {
        paths.push(generatePoint(points[points.length - 1]));
      }
    }
  }

  return <g data-default-link-test={props.link.getOptions().testName} >{paths}</g>;

};