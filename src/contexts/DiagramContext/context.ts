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

import { useContext, createContext } from 'react';
import { DiagramInfo } from '../../customTypes';
import { v4 as uuidV4 } from 'uuid';

export interface DiagramInfoContextApi {
  diagramInfo: DiagramInfo;
  setDiagramInfo: React.Dispatch<React.SetStateAction<DiagramInfo>>;
  removeDiagramInfo: () => Promise<void>;
  onDeleteWorkspace: (workspaceId: string) => Promise<void>;
}

const initialState: DiagramInfoContextApi = {
  diagramInfo: {
    id: uuidV4(),
    name: '',
    description: '',
  },
  setDiagramInfo: () => { },
  removeDiagramInfo: () => Promise.resolve(),
  onDeleteWorkspace: () => Promise.resolve(),
};

export const DiagramInfoContext = createContext<DiagramInfoContextApi>(initialState);

export const useDiagramInfoContext = () => useContext(DiagramInfoContext);