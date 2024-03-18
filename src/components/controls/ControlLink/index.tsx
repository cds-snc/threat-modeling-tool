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

import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { ControlLink, Control } from '../../../customTypes';
import { useControlLinksContext } from '../../../contexts/ControlLinksContext/context';
import ControlLookupComponent from '../../controls/ControlLookup';
import { getControlProfileByName } from '../../../data/controlProfileProvider';
import { useApplicationInfoContext } from '../../../contexts';

export interface ControlLinkProps {
  linkedEntityId: string;
}

const ControlLinkComponent: FC<ControlLinkProps> = ({
  linkedEntityId,
}) => {

  const { applicationInfo } = useApplicationInfoContext();

  let selectedCategory = (applicationInfo.securityCategory == undefined ? 'CCCS Medium' : applicationInfo.securityCategory);
  const controlList = useMemo(() => {
    return getControlProfileByName(selectedCategory) as Control[];
  }, [selectedCategory]);

  const [controlLinks, setControlLinks] = useState<ControlLink[]>([]);

  const { getLinkedControlLinks } = useControlLinksContext();

  useEffect(() => {
    const _controlLinks = getLinkedControlLinks(linkedEntityId);
    setControlLinks(_controlLinks || []);
  }, [getLinkedControlLinks, linkedEntityId]);

  const {
    addControlLink,
    removeControlLink,
  } = useControlLinksContext();

  const handleAddControlLink = useCallback((controlIdOrNewControl: string) => {
    if (controlList.find(m => m.id === controlIdOrNewControl)) {
      addControlLink({
        linkedId: linkedEntityId,
        controlId: controlIdOrNewControl,
      });
    }
  }, [linkedEntityId, controlList, addControlLink]);

  return (<ControlLookupComponent
    controlList={controlList}
    linkedControlIds={controlLinks.map(ml => ml.controlId)}
    onAddControlLink={handleAddControlLink}
    onRemoveControlLink={(controlId) => removeControlLink(controlId, linkedEntityId)}
  />);
};

export default ControlLinkComponent;