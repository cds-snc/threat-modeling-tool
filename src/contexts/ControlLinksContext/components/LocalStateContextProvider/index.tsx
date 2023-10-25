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

import { FC, PropsWithChildren, useCallback, useState } from 'react';
import { ControlLink } from '../../../../customTypes';
import { LocalStateContextProviderBaseProps } from '../../../types';
import { ControlLinksContext } from '../../context';
import { ControlLinksContextProviderProps } from '../../types';
import useControlLinks from '../../useControlLinks';

const ControlLinksLocalStateContextProvider: FC<PropsWithChildren<
ControlLinksContextProviderProps & LocalStateContextProviderBaseProps<ControlLink[]>>> = ({
  children,
  initialValue,
}) => {
  const [controlLinkList, setControlLinkList] = useState<ControlLink[]>(initialValue || []);

  const {
    handlRemoveControlLink,
    handleRemoveControlLinks,
    handlRemoveControlLinksByControlId,
    handlRemoveControlLinksByLinkedEntityId,
    handleAddControlLink,
    handleAddControlLinks,
    handleGetLinkedControlLinks,
    handleGetControlThreatLinks,
  } = useControlLinks(controlLinkList, setControlLinkList);

  const handleRemoveAllControlLinks = useCallback(async () => {
    setControlLinkList([]);
  }, []);

  const handleDeleteWorkspace = useCallback(async (_workspaceId: string) => {
    setControlLinkList([]);
  }, []);

  return (<ControlLinksContext.Provider value={{
    controlLinkList,
    setControlLinkList,
    getLinkedControlLinks: handleGetLinkedControlLinks,
    getMitigtaionThreatLinks: handleGetControlThreatLinks,
    removeControlLink: handlRemoveControlLink,
    removeControlLinksByControlId: handlRemoveControlLinksByControlId,
    removeControlLinksByLinkedEntityId: handlRemoveControlLinksByLinkedEntityId,
    removeControlLinks: handleRemoveControlLinks,
    addControlLink: handleAddControlLink,
    addControlLinks: handleAddControlLinks,
    removeAllControlLinks: handleRemoveAllControlLinks,
    onDeleteWorkspace: handleDeleteWorkspace,
  }}>
    {children}
  </ControlLinksContext.Provider>);
};

export default ControlLinksLocalStateContextProvider;

