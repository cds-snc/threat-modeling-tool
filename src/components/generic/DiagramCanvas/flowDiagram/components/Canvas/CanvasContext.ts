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

// NB: always import CanvasContext directly from this file to prevent circular module imports
// see https://github.com/facebook/react/issues/13969#issuecomment-433253469

const CanvasContext = React.createContext({ offsetX: 0, offsetY: 0 });

export default CanvasContext;
