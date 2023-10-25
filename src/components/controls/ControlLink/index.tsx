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

import { FC, useCallback, useEffect, useState } from 'react';
import { useControlsContext } from '../../../contexts/ControlsContext/context';
import { ControlLink } from '../../../customTypes';
import ControlLinkView from '../ControlLinkView';
import { useControlLinksContext } from '../../../contexts/ControlLinksContext/context';

export interface ControlLinkProps {
  linkedEntityId: string;
}

const ControlLinkComponent: FC<ControlLinkProps> = ({
  linkedEntityId,
}) => {
  const { controlList, saveControl } = useControlsContext();
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
    } else {
      const newControl = saveControl({
        numericId: -1,
        content: controlIdOrNewControl,
        id: 'new',
      });
      addControlLink({
        linkedId: linkedEntityId,
        controlId: newControl.id,
      });
    }
  }, [linkedEntityId, controlList, addControlLink, saveControl]);

  return (<ControlLinkView
    controlList={controlList}
    linkedControlIds={controlLinks.map(ml => ml.controlId)}
    onAddControlLink={handleAddControlLink}
    onRemoveControlLink={(controlId) => removeControlLink(controlId, linkedEntityId)}
  />);
};

export default ControlLinkComponent;