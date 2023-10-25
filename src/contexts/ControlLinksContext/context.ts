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
import { ControlLink } from '../../customTypes';
export interface ControlLinksContextApi {
  controlLinkList: ControlLink[];
  setControlLinkList: (list: ControlLink[]) => void;
  getLinkedControlLinks: (linkedEntityId: string) => ControlLink[];
  getMitigtaionThreatLinks: (controlId: string) => ControlLink[];
  removeControlLink: (controlId: string, linkedEntityId: string) => void;
  removeControlLinksByControlId: (controlId: string) => Promise<void>;
  removeControlLinksByLinkedEntityId: (linkedEntityId: string) => Promise<void>;
  removeControlLinks: (entity: ControlLink[]) => void;
  addControlLink: (entity: ControlLink) => void;
  addControlLinks: (entity: ControlLink[]) => void;
  removeAllControlLinks: () => Promise<void>;
  onDeleteWorkspace: (workspaceId: string) => Promise<void>;
}

const initialState: ControlLinksContextApi = {
  controlLinkList: [],
  setControlLinkList: () => { },
  getLinkedControlLinks: () => [],
  getMitigtaionThreatLinks: () => [],
  removeControlLink: () => { },
  removeControlLinksByControlId: () => Promise.resolve(),
  removeControlLinksByLinkedEntityId: () => Promise.resolve(),
  removeControlLinks: () => { },
  addControlLink: () => { },
  addControlLinks: () => { },
  removeAllControlLinks: () => Promise.resolve(),
  onDeleteWorkspace: () => Promise.resolve(),
};

export const ControlLinksContext = createContext<ControlLinksContextApi>(initialState);

export const useControlLinksContext = () => useContext(ControlLinksContext);