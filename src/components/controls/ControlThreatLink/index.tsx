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

import { FC, useEffect, useState } from 'react';
import { useThreatsContext } from '../../../contexts/ThreatsContext/context';
import { ControlLink } from '../../../customTypes';
import ThreatLinkView from '../../threats/ThreatLinkView';
import { useControlLinksContext } from '../../../contexts/ControlLinksContext/context';

export interface ControlThreatLinkProps {
  controlId: string;
}

const ControlThreatLinkComponent: FC<ControlThreatLinkProps> = ({
  controlId,
}) => {
  const { statementList } = useThreatsContext();
  const [controlLinks, setControlLinks] = useState<ControlLink[]>([]);

  const { getMitigtaionThreatLinks } = useControlLinksContext();

  useEffect(() => {
    const _controlLinks = getMitigtaionThreatLinks(controlId);
    setControlLinks(_controlLinks || []);
  }, [getMitigtaionThreatLinks, controlId]);

  const {
    addControlLink,
    removeControlLink,
  } = useControlLinksContext();

  return (<ThreatLinkView
    threatList={statementList}
    linkedThreatIds={controlLinks.map(ml => ml.linkedId)}
    onAddThreatLink={(threatId) => addControlLink({
      linkedId: threatId,
      controlId,
    })}
    onRemoveThreatLink={(threatId) => removeControlLink(controlId, threatId)}
  />);
};

export default ControlThreatLinkComponent;