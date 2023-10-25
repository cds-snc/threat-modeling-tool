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

import SpaceBetween from '@cloudscape-design/components/space-between';
import { FC, useState, useCallback } from 'react';
import { useMitigationsContext } from '../../../contexts/MitigationsContext/context';
import { useControlsContext } from '../../../contexts/ControlsContext/context';
import { useThreatsContext } from '../../../contexts/ThreatsContext/context';
import { Assumption } from '../../../customTypes';
import GenericEntityCreationCard, { DEFAULT_ENTITY } from '../../generic/GenericEntityCreationCard';
import MitigationLinkView from '../../mitigations/MitigationLinkView';
import ControlLinkView from '../../controls/ControlLinkView';
import ThreatLinkView from '../../threats/ThreatLinkView';

export interface AssumptionCreationCardProps {
  onSave?: (entity: Assumption, linkedMitigationIds: string[], linkedControlIds: string[], linkedThreatIds: string[]) => void;
}

const AssumptionCreationCard: FC<AssumptionCreationCardProps> = ({ onSave }) => {
  const [editingEntity, setEditingEntity] = useState<Assumption>(DEFAULT_ENTITY);
  const [linkedMitigationIds, setLinkedMitigationIds] = useState<string[]>([]);
  const [linkedControlIds, setLinkedControlIds] = useState<string[]>([]);
  const [linkedThreatIds, setLinkedThreatIds] = useState<string[]>([]);

  const { mitigationList, saveMitigation } = useMitigationsContext();
  const { controlList, saveControl } = useControlsContext();
  const { statementList } = useThreatsContext();

  const handleSave = useCallback(() => {
    onSave?.(editingEntity, linkedMitigationIds, linkedControlIds, linkedThreatIds);
    setEditingEntity(DEFAULT_ENTITY);
    setLinkedMitigationIds([]);
    setLinkedThreatIds([]);
  }, [editingEntity, linkedMitigationIds, linkedControlIds, linkedThreatIds, onSave]);

  const handleReset = useCallback(() => {
    setEditingEntity(DEFAULT_ENTITY);
    setLinkedMitigationIds([]);
    setLinkedControlIds([]);
    setLinkedThreatIds([]);
  }, []);

  const handleAddMitigationLink = useCallback((mitigationIdOrNewMitigation: string) => {
    if (mitigationList.find(m => m.id === mitigationIdOrNewMitigation)) {
      setLinkedMitigationIds(prev => [...prev, mitigationIdOrNewMitigation]);
    } else {
      const newMitigation = saveMitigation({
        numericId: -1,
        content: mitigationIdOrNewMitigation,
        id: 'new',
      });
      setLinkedMitigationIds(prev => [...prev, newMitigation.id]);
    }
  }, [mitigationList, saveMitigation]);

  const handleAddControlLink = useCallback((controlIdOrNewControl: string) => {
    if (controlList.find(m => m.id === controlIdOrNewControl)) {
      setLinkedControlIds(prev => [...prev, controlIdOrNewControl]);
    } else {
      const newControl = saveControl({
        numericId: -1,
        content: controlIdOrNewControl,
        id: 'new',
      });
      setLinkedControlIds(prev => [...prev, newControl.id]);
    }
  }, [controlList, saveControl]);

  return (<GenericEntityCreationCard
    editingEntity={editingEntity}
    setEditingEntity={setEditingEntity}
    header='Add new assumption'
    onSave={handleSave}
    onReset={handleReset}
    customEditors={<SpaceBetween direction='vertical' size='s'>
      <ThreatLinkView
        linkedThreatIds={linkedThreatIds}
        threatList={statementList}
        onAddThreatLink={(id) => setLinkedThreatIds(prev => [...prev, id])}
        onRemoveThreatLink={(id) => setLinkedThreatIds(prev => prev.filter(p => p !== id))}
      />
      <ControlLinkView
        linkedControlIds={linkedControlIds}
        controlList={controlList}
        onAddControlLink={handleAddControlLink}
        onRemoveControlLink={(id) => setLinkedControlIds(prev => prev.filter(p => p !== id))}
      />
      <MitigationLinkView
        linkedMitigationIds={linkedMitigationIds}
        mitigationList={mitigationList}
        onAddMitigationLink={handleAddMitigationLink}
        onRemoveMitigationLink={(id) => setLinkedMitigationIds(prev => prev.filter(p => p !== id))}
      />
    </SpaceBetween>}
  />);
};

export default AssumptionCreationCard;