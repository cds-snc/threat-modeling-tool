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
import { IPosition } from '../../../';

export const generateLinkPath = (startPos: IPosition, endPos: IPosition): string => {
  //console.log('start point: ', startPos);
  //console.log('end point: ', endPos);
  if (!endPos.portType) {
    return curvePath(startPos, endPos);
  } else {
    return foldPath(startPos, endPos);
  }
};


function curvePath(startPos: IPosition, endPos: IPosition): string {
  const width = Math.abs(startPos.x - endPos.x);
  const height = Math.abs(startPos.y - endPos.y);
  const leftToRight = startPos.x < endPos.x;
  const topToBottom = startPos.y < endPos.y;
  const isHorizontal = width > height;

  let start;
  let end;
  if (isHorizontal) {
    start = leftToRight ? startPos : endPos;
    end = leftToRight ? endPos : startPos;
  } else {
    start = topToBottom ? startPos : endPos;
    end = topToBottom ? endPos : startPos;
  }

  const curve = isHorizontal ? width / 3 : height / 3;
  const curveX = isHorizontal ? curve : 0;
  const curveY = isHorizontal ? 0 : curve;

  return `M${start.x},${start.y} C ${start.x + curveX},${start.y + curveY} ${end.x - curveX},${end.y - curveY} ${end.x},${end.y}`;
}

function foldPath(startPos: IPosition, endPos: IPosition): string {
  let linkPath = '';
  let startNodeWidth = !!startPos.nodeWidth ? startPos.nodeWidth : 0;
  let startNodeHeight = !!startPos.nodeHeight ? startPos.nodeHeight : 0;

  if (startPos.portType === 'top' && endPos.portType === 'top') {
    linkPath += `
      M ${startPos.x} ${startPos.y}
      L ${startPos.x} ${startPos.y - 30}
    `;
    if (startPos.x > endPos.x && startPos.y > endPos.y) {
      linkPath += `L ${startPos.x} ${endPos.y - 30}`;
    }
    if (startPos.x > endPos.x && startPos.y < endPos.y) {
      linkPath += `L ${endPos.x} ${startPos.y - 30}`;
    }
    if (startPos.x < endPos.x && startPos.y > endPos.y) {
      linkPath += `L ${startPos.x} ${endPos.y - 30}`;
    }
    if (startPos.x < endPos.x && startPos.y < endPos.y) {
      linkPath += `L ${endPos.x} ${startPos.y - 30}`;
    }

    linkPath += `
      L ${endPos.x} ${endPos.y - 30}
      L ${endPos.x} ${endPos.y}
    `;
    return linkPath;
  }

  if (startPos.portType === 'top' && endPos.portType === 'right') {
    linkPath += `
      M ${startPos.x} ${startPos.y}
      L ${startPos.x} ${startPos.y - 30}
    `;
    if (startPos.x >= endPos.x + 30 && startPos.y >= endPos.y + 30) {
      linkPath += `L ${startPos.x} ${endPos.y}`;
    }
    if (startPos.x >= endPos.x && startPos.y < endPos.y + 30) {
      linkPath += `L ${endPos.x + 30} ${startPos.y - 30}`;
    }
    if (startPos.x < endPos.x + 30 && startPos.y >= endPos.y) {
      linkPath += `L ${endPos.x + 30} ${startPos.y - 30}`;
    }
    if (startPos.x < endPos.x && startPos.y < endPos.y) {
      linkPath += `L ${endPos.x + 30} ${startPos.y - 30}`;
    }

    linkPath += `
      L ${endPos.x + 30} ${endPos.y}
      L ${endPos.x} ${endPos.y}
    `;
    return linkPath;
  }

  if (startPos.portType === 'top' && endPos.portType === 'bottom') {
    linkPath += `
      M ${startPos.x} ${startPos.y}
      L ${startPos.x} ${startPos.y - 30}
    `;
    if (startPos.x >= endPos.x && startPos.y >= endPos.y + 60) {
      linkPath += `L ${startPos.x} ${endPos.y + 30}`;
    }
    if (startPos.x >= endPos.x && startPos.y < endPos.y + 60) {
      linkPath += `
        L ${startPos.x - startNodeWidth} ${startPos.y - 30}
        L ${startPos.x - startNodeWidth} ${endPos.y + 30}
      `;
    }
    if (startPos.x < endPos.x && startPos.y >= endPos.y + 60) {
      linkPath += `L ${endPos.x} ${startPos.y - 30}`;
    }
    if (startPos.x < endPos.x && startPos.y <= endPos.y + 60) {
      linkPath += `
        L ${startPos.x + startNodeWidth} ${startPos.y - 30}
        L ${startPos.x + startNodeWidth} ${endPos.y + 30}
      `;
    }

    linkPath += `
      L ${endPos.x} ${endPos.y + 30}
      L ${endPos.x} ${endPos.y}
    `;
    return linkPath;
  }

  if (startPos.portType === 'top' && endPos.portType === 'left') {
    linkPath += `
      M ${startPos.x} ${startPos.y}
      L ${startPos.x} ${startPos.y - 30}
    `;
    if (startPos.x >= endPos.x - 30 && startPos.y >= endPos.y) {
      linkPath += `L ${endPos.x - 30} ${startPos.y - 30}`;
    }
    if (startPos.x >= endPos.x && startPos.y < endPos.y) {
      linkPath += `L ${endPos.x - 30} ${startPos.y - 30}`;
    }
    if (startPos.x < endPos.x - 30 && startPos.y >= endPos.y + 30) {
      linkPath += `L ${startPos.x} ${endPos.y}`;
    }
    if (startPos.x < endPos.x && startPos.y < endPos.y + 30) {
      linkPath += `L ${endPos.x - 30} ${startPos.y - 30}`;
    }

    linkPath += `
      L ${endPos.x - 30} ${endPos.y}
      L ${endPos.x} ${endPos.y}
    `;
    return linkPath;
  }

  if (startPos.portType === 'right' && endPos.portType === 'top') {
    linkPath += `
      M ${startPos.x} ${startPos.y}
      L ${startPos.x + 30} ${startPos.y}
    `;
    if (startPos.x >= endPos.x && startPos.y > endPos.y) {
      linkPath += `L ${startPos.x + 30} ${endPos.y - 30}`;
    }
    if (startPos.x >= endPos.x - 30 && startPos.y <= endPos.y) {
      linkPath += `L ${startPos.x + 30} ${endPos.y - 30}`;
    }
    if (startPos.x < endPos.x && startPos.y >= endPos.y - 30) {
      linkPath += `L ${startPos.x + 30} ${endPos.y - 30}`;
    }
    if (startPos.x < endPos.x - 30 && startPos.y < endPos.y - 30) {
      linkPath += `L ${endPos.x} ${startPos.y}`;
    }

    linkPath += `
      L ${endPos.x} ${endPos.y - 30}
      L ${endPos.x} ${endPos.y}
    `;
    return linkPath;
  }

  if (startPos.portType === 'right' && endPos.portType === 'right') {
    linkPath += `
      M ${startPos.x} ${startPos.y}
      L ${startPos.x > endPos.x ? startPos.x + 30 : endPos.x + 30} ${startPos.y}
      L ${startPos.x > endPos.x ? startPos.x + 30 : endPos.x + 30} ${endPos.y}
      L ${startPos.x > endPos.x ? startPos.x + 30 : endPos.x + 30} ${endPos.y}
      L ${endPos.x} ${endPos.y}
      `;
    return linkPath;
  }

  if (startPos.portType === 'right' && endPos.portType === 'bottom') {
    linkPath += `
      M ${startPos.x} ${startPos.y}
      L ${startPos.x + 30} ${startPos.y}
      L ${startPos.x + 30} ${endPos.y + 30}
      L ${endPos.x} ${endPos.y + 30}
      L ${endPos.x} ${endPos.y}
    `;
    return linkPath;
  }

  if (startPos.portType === 'right' && endPos.portType === 'left') {
    linkPath += `
      M ${startPos.x} ${startPos.y}
      L ${startPos.x + 30} ${startPos.y}
    `;
    if (startPos.x >= endPos.x - 60 && startPos.y > endPos.y) {
      linkPath += `
        L ${startPos.x + 30} ${startPos.y - startNodeHeight}        
        L ${endPos.x - 30} ${startPos.y - startNodeHeight}        
      `;
    }
    if (startPos.x >= endPos.x - 60 && startPos.y < endPos.y) {
      linkPath += `
        L ${startPos.x + 30} ${startPos.y + startNodeHeight}        
        L ${endPos.x - 30} ${startPos.y + startNodeHeight}        
      `;
    }
    if (startPos.x < endPos.x - 60 && startPos.y >= endPos.y - 30) {
      linkPath += `L ${startPos.x + 30} ${endPos.y}`;
    }
    if (startPos.x < endPos.x - 60 && startPos.y < endPos.y - 30) {
      linkPath += `L ${startPos.x + 30} ${endPos.y}`;
    }

    linkPath += `
      L ${endPos.x - 30} ${endPos.y}
      L ${endPos.x} ${endPos.y}
    `;
    return linkPath;
  }

  if (startPos.portType === 'bottom' && endPos.portType === 'top') {
    linkPath += `
      M ${startPos.x} ${startPos.y}
      L ${startPos.x} ${startPos.y + 30}
    `;
    if (startPos.x >= endPos.x - 60 && startPos.y >= endPos.y -60) {
      linkPath += `
        L ${startPos.x - startNodeWidth} ${startPos.y + 30}
        L ${startPos.x - startNodeWidth} ${endPos.y - 30}
      `;
    }
    if (startPos.x >= endPos.x && startPos.y < endPos.y - 60) {
      linkPath += `L ${startPos.x} ${endPos.y - 30}`;
    }
    if (startPos.x < endPos.x - 60 && startPos.y >= endPos.y - 60) {
      linkPath += `
        L ${startPos.x + startNodeWidth} ${startPos.y + 30}
        L ${startPos.x + startNodeWidth} ${endPos.y - 30}
      `;
    }
    if (startPos.x < endPos.x && startPos.y < endPos.y - 60) {
      linkPath += `L ${startPos.x} ${endPos.y - 30}`;
    }

    linkPath += `
      L ${endPos.x} ${endPos.y - 30}
      L ${endPos.x} ${endPos.y}
    `;
    return linkPath;
  }

  if (startPos.portType === 'bottom' && endPos.portType === 'right') {
    linkPath += `
      M ${startPos.x} ${startPos.y}
      L ${startPos.x} ${startPos.y + 30}
      L ${endPos.x + 30} ${startPos.y + 30}
      L ${endPos.x + 30} ${endPos.y}
      L ${endPos.x} ${endPos.y}
    `;
    return linkPath;
  }

  if (startPos.portType === 'bottom' && endPos.portType === 'bottom') {
    linkPath += `
      M ${startPos.x} ${startPos.y}
      L ${startPos.x} ${startPos.y + 30}
    `;
    if (startPos.x >= endPos.x - 60 && startPos.y >= endPos.y) {
      linkPath += `L ${endPos.x} ${startPos.y + 30}`;
    }
    if (startPos.x >= endPos.x && startPos.y < endPos.y) {
      linkPath += `L ${startPos.x} ${endPos.y + 30}`;
    }
    if (startPos.x < endPos.x - 60 && startPos.y >= endPos.y) {
      linkPath += `L ${endPos.x} ${startPos.y + 30}`;
    }
    if (startPos.x < endPos.x && startPos.y < endPos.y) {
      linkPath += `L ${startPos.x} ${endPos.y + 30}`;
    }

    linkPath += `
      L ${endPos.x} ${endPos.y + 30}
      L ${endPos.x} ${endPos.y}
    `;
    return linkPath;
  }

  if (startPos.portType === 'bottom' && endPos.portType === 'left') {
    linkPath += `
      M ${startPos.x} ${startPos.y}
      L ${startPos.x} ${startPos.y + 30}
      L ${endPos.x - 30} ${startPos.y + 30}
      L ${endPos.x - 30} ${endPos.y}
      L ${endPos.x} ${endPos.y}
    `;
    return linkPath;
  }

  if (startPos.portType === 'left' && endPos.portType === 'top') {
    linkPath += `
      M ${startPos.x} ${startPos.y}
      L ${startPos.x - 30} ${startPos.y}
    `;
    if (startPos.x >= endPos.x - 60 && startPos.y >= endPos.y - 30) {
      linkPath += `L ${startPos.x - 30} ${endPos.y - 30}`;
    }
    if (startPos.x >= endPos.x + 30 && startPos.y < endPos.y - 30) {
      linkPath += `L ${endPos.x} ${startPos.y}`;
    }
    if (startPos.x < endPos.x - 60 && startPos.y >= endPos.y) {
      linkPath += `L ${startPos.x - 30} ${endPos.y - 30}`;
    }
    if (startPos.x < endPos.x + 30 && startPos.y < endPos.y) {
      linkPath += `L ${startPos.x - 30} ${endPos.y - 30}`;
    }

    linkPath += `
      L ${endPos.x} ${endPos.y - 30}
      L ${endPos.x} ${endPos.y}
    `;
    return linkPath;
  }

  if (startPos.portType === 'left' && endPos.portType === 'right') {
    linkPath += `
      M ${startPos.x} ${startPos.y}
      L ${startPos.x - 30} ${startPos.y}
    `;
    if (startPos.x >= endPos.x + 60 && startPos.y >= endPos.y) {
      linkPath += `L ${startPos.x - 30} ${endPos.y}`;
    }
    if (startPos.x >= endPos.x + 60 && startPos.y < endPos.y) {
      linkPath += `L ${endPos.x + 30} ${startPos.y}`;
    }
    if (startPos.x < endPos.x + 60 && startPos.y >= endPos.y) {
      linkPath += `
        L ${startPos.x - 30} ${startPos.y - startNodeHeight}
        L ${endPos.x + 30} ${startPos.y - startNodeHeight}
      `;
    }
    if (startPos.x < endPos.x + 60 && startPos.y < endPos.y) {
      linkPath += `
        L ${startPos.x - 30} ${startPos.y - startNodeHeight}
        L ${endPos.x + 30} ${startPos.y - startNodeHeight}
      `;
    }

    linkPath += `
      L ${endPos.x + 30} ${endPos.y}
      L ${endPos.x} ${endPos.y}
    `;
    return linkPath;
  }

  if (startPos.portType === 'left' && endPos.portType === 'bottom') {
    linkPath += `
      M ${startPos.x} ${startPos.y}
      L ${startPos.x - 30} ${startPos.y}
    `;
    if (startPos.x >= endPos.x + 30 && startPos.y >= endPos.y + 30) {
      linkPath += `L ${endPos.x} ${startPos.y}`;
    }
    if (startPos.x >= endPos.x && startPos.y < endPos.y + 30) {
      linkPath += `L ${startPos.x - 30} ${endPos.y + 30}`;
    }
    if (startPos.x < endPos.x + 30 && startPos.y >= endPos.y) {
      linkPath += `L ${startPos.x - 30} ${endPos.y + 30}`;
    }
    if (startPos.x < endPos.x && startPos.y < endPos.y) {
      linkPath += `L ${startPos.x - 30} ${endPos.y + 30}`;
    }

    linkPath += `
      L ${endPos.x} ${endPos.y + 30}
      L ${endPos.x} ${endPos.y}
    `;
    return linkPath;
  }

  if (startPos.portType === 'left' && endPos.portType === 'left') {
    linkPath += `
      M ${startPos.x} ${startPos.y}
      L ${startPos.x - 30} ${startPos.y}
    `;
    if (startPos.x >= endPos.x && startPos.y >= endPos.y + 30) {
      linkPath += `L ${endPos.x - 30} ${startPos.y}`;
    }
    if (startPos.x >= endPos.x && startPos.y < endPos.y + 30) {
      linkPath += `L ${endPos.x - 30} ${startPos.y}`;
    }
    if (startPos.x < endPos.x && startPos.y >= endPos.y) {
      linkPath += `L ${startPos.x - 30} ${endPos.y}`;
    }
    if (startPos.x < endPos.x && startPos.y < endPos.y) {
      linkPath += `L ${startPos.x - 30} ${endPos.y}`;
    }

    linkPath += `
      L ${endPos.x - 30} ${endPos.y}
      L ${endPos.x} ${endPos.y}
    `;
    return linkPath;
  }

  return linkPath;
}