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

import { useCallback } from 'react';
import { ControlLink } from '../../customTypes';

export const isSameControlLink = (entity1: ControlLink, entity2: ControlLink) => {
  return entity1.controlId === entity2.controlId
      && entity1.linkedId === entity2.linkedId;
};

const useControlLinks = (
  controlLinkList: ControlLink[],
  setControlLinkList: React.Dispatch<React.SetStateAction<ControlLink[]>>,
) => {
  const handlRemoveControlLink = useCallback((controlId: string, linkedEntityId: string) => {
    setControlLinkList((prevList) => prevList.filter(x => !(
      x.controlId === controlId && x.linkedId === linkedEntityId
    )));
  }, [setControlLinkList]);

  const handleRemoveControlLinks = useCallback((controlLinks: ControlLink[]) => {
    setControlLinkList((prevList) => {
      return prevList.filter(pl =>
        controlLinks.findIndex(ml => isSameControlLink(ml, pl)) < 0);
    });
  }, [setControlLinkList]);

  const handlRemoveControlLinksByControlId = useCallback(async (controlId: string) => {
    setControlLinkList((prevList) => prevList.filter(x => !(
      x.controlId === controlId
    )));
  }, [setControlLinkList]);

  const handlRemoveControlLinksByLinkedEntityId = useCallback(async (linkedEntityId: string) => {
    setControlLinkList((prevList) => prevList.filter(x => !(
      x.linkedId === linkedEntityId
    )));
  }, [setControlLinkList]);

  const handleAddControlLink = useCallback((controlLink: ControlLink) => {
    setControlLinkList((prevList) => {
      const foundIndex = prevList.findIndex(st =>
        st.controlId === controlLink.controlId &&
            st.linkedId === controlLink.linkedId,
      );
      if (foundIndex < 0) {
        return [...prevList, controlLink];
      };

      return [...prevList];
    });
  }, [setControlLinkList]);

  const handleAddControlLinks = useCallback((controlLinks: ControlLink[]) => {
    setControlLinkList((prevList) => {
      const filteredLinks = controlLinks.filter(al =>
        prevList.findIndex(pl => pl.controlId === al.controlId && pl.linkedId === al.controlId) < 0);
      return [...prevList, ...filteredLinks];
    });
  }, [setControlLinkList]);

  const handleGetLinkedControlLinks = useCallback((linkedEntityId: string) => {
    return controlLinkList.filter(x => x.linkedId === linkedEntityId);
  }, [controlLinkList]);

  const handleGetControlThreatLinks = useCallback((controlId: string) => {
    return controlLinkList.filter(x => x.controlId === controlId);
  }, [controlLinkList]);

  return {
    handlRemoveControlLink,
    handleRemoveControlLinks,
    handlRemoveControlLinksByControlId,
    handlRemoveControlLinksByLinkedEntityId,
    handleAddControlLink,
    handleAddControlLinks,
    handleGetLinkedControlLinks,
    handleGetControlThreatLinks,
  };
};

export default useControlLinks;