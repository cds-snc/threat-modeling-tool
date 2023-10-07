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
import { IPosition } from '../../';

// center = rotation center
// current = current position
// x, y = rotated positions
// angle = angle of rotation
export const rotate = (center: IPosition, current: IPosition, angle: number): IPosition => {
  const radians = (Math.PI / 180) * angle;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const x = (cos * (current.x - center.x)) + (sin * (current.y - center.y)) + center.x;
  const y = (cos * (current.y - center.y)) - (sin * (current.x - center.x)) + center.y;
  return { x, y };
};
