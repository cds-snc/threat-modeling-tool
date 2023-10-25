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

import { FC, PropsWithChildren, useCallback } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { LOCAL_STORAGE_KEY_CONTROL_LINK_LIST } from '../../../../configs/localStorageKeys';
import { ControlLink } from '../../../../customTypes';
import removeLocalStorageKey from '../../../../utils/removeLocalStorageKey';
import { ControlLinksContext } from '../../context';
import { ControlLinksContextProviderProps } from '../../types';
import useControlLinks from '../../useControlLinks';

const getLocalStorageKey = (workspaceId: string | null) => {
  if (workspaceId) {
    return `${LOCAL_STORAGE_KEY_CONTROL_LINK_LIST}_${workspaceId}`;
  }

  return LOCAL_STORAGE_KEY_CONTROL_LINK_LIST;
};


const ControlLinksLocalStorageContextProvider: FC<PropsWithChildren<ControlLinksContextProviderProps>> = ({
  children,
  workspaceId: currentWorkspaceId,
}) => {
  const [controlLinkList, setControlLinkList, { removeItem }] = useLocalStorageState<ControlLink[]>(getLocalStorageKey(currentWorkspaceId), {
    defaultValue: [],
  });

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
    removeItem();
  }, [removeItem]);

  const handleDeleteWorkspace = useCallback(async (workspaceId: string) => {
    window.setTimeout(() => {
      // to delete after the workspace is switched. Otherwise the default value is set again.
      removeLocalStorageKey(getLocalStorageKey(workspaceId));
    }, 1000);
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

export default ControlLinksLocalStorageContextProvider;

