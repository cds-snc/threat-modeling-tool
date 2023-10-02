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

const generateArrowPath = (startPos: IPosition, endPos: IPosition): string => {
  console.log('----startPos: ', startPos);
  console.log('----endPos: ', endPos);

  if (!endPos.portType) {
    return '';
  }
  if (endPos.portType === 'top') {
    return `M ${endPos.x} ${endPos.y} L ${endPos.x - 10} ${endPos.y - 20} L ${endPos.x + 10 } ${endPos.y - 20} Z`;
  }
  if (endPos.portType === 'right') {
    return `M ${endPos.x} ${endPos.y} L ${endPos.x + 20} ${endPos.y - 10} L ${endPos.x + 20 } ${endPos.y + 10} Z`;
  }
  if (endPos.portType === 'bottom') {
    return `M ${endPos.x} ${endPos.y} L ${endPos.x - 10} ${endPos.y + 20} L ${endPos.x + 10 } ${endPos.y + 20} Z`;
  }
  if (endPos.portType === 'left') {
    return `M ${endPos.x} ${endPos.y} L ${endPos.x - 20} ${endPos.y - 10} L ${endPos.x - 20 } ${endPos.y + 10} Z`;
  }

  return '';
};

export default generateArrowPath;