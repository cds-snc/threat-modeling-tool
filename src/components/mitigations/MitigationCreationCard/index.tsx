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
import { useAssumptionsContext } from '../../../contexts/AssumptionsContext/context';
import { useControlsContext } from '../../../contexts/ControlsContext/context';
import { useThreatsContext } from '../../../contexts/ThreatsContext/context';
import { Mitigation } from '../../../customTypes';
import AssumptionLinkView from '../../assumptions/AssumptionLinkView';
import GenericEntityCreationCard, { DEFAULT_ENTITY } from '../../generic/GenericEntityCreationCard';
import ThreatLinkView from '../../threats/ThreatLinkView';
import ControlLinkView from '../../controls/ControlLinkView';

export interface MitigationCreationCardProps {
  onSave?: (entity: Mitigation, linkedControlIds: string[], linkedAssumptionIds: string[], linkedThreatIds: string[]) => void;
}

const MitigationCreationCard: FC<MitigationCreationCardProps> = ({ onSave }) => {
  const [editingEntity, setEditingEntity] = useState<Mitigation>(DEFAULT_ENTITY);
  const [linkedAssumptionIds, setLinkedAssumptionIds] = useState<string[]>([]);
  const [linkedControlIds, setLinkedControlIds] = useState<string[]>([]);
  const [linkedThreatIds, setLinkedThreatIds] = useState<string[]>([]);

  const { assumptionList, saveAssumption } = useAssumptionsContext();
  const { controlList, saveControl } = useControlsContext();
  const { statementList } = useThreatsContext();

  const handleSave = useCallback(() => {
    onSave?.(editingEntity, linkedControlIds, linkedAssumptionIds, linkedThreatIds);
    setEditingEntity(DEFAULT_ENTITY);
    setLinkedControlIds([]);
    setLinkedAssumptionIds([]);
    setLinkedThreatIds([]);
  }, [editingEntity, linkedControlIds, linkedAssumptionIds, linkedThreatIds, onSave]);

  const handleReset = useCallback(() => {
    setEditingEntity(DEFAULT_ENTITY);
    setLinkedAssumptionIds([]);
    setLinkedControlIds([]);
    setLinkedThreatIds([]);
  }, []);

  const handleAddAssumptionLink = useCallback((assumptionIdOrNewAssumption: string) => {
    if (assumptionList.find(a => a.id === assumptionIdOrNewAssumption)) {
      setLinkedAssumptionIds(prev => [...prev, assumptionIdOrNewAssumption]);
    } else {
      const newAssumption = saveAssumption({
        numericId: -1,
        content: assumptionIdOrNewAssumption,
        id: 'new',
      });
      setLinkedAssumptionIds(prev => [...prev, newAssumption.id]);
    }
  }, [assumptionList, saveAssumption, setLinkedAssumptionIds]);

  const handleAddControlLink = useCallback((controlIdOrNewControl: string) => {
    if (controlList.find(a => a.id === controlIdOrNewControl)) {
      setLinkedControlIds(prev => [...prev, controlIdOrNewControl]);
    } else {
      const newControl = saveControl({
        numericId: -1,
        content: controlIdOrNewControl,
        id: 'new',
      });
      setLinkedControlIds(prev => [...prev, newControl.id]);
    }
  }, [controlList, saveControl, setLinkedControlIds]);

  return (<GenericEntityCreationCard
    editingEntity={editingEntity}
    setEditingEntity={setEditingEntity}
    header='Add new mitigation'
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
      <AssumptionLinkView
        linkedAssumptionIds={linkedAssumptionIds}
        assumptionList={assumptionList}
        onAddAssumptionLink={handleAddAssumptionLink}
        onRemoveAssumptionLink={(id) => setLinkedAssumptionIds(prev => prev.filter(p => p !== id))}
      />
    </SpaceBetween>}
  />);
};

export default MitigationCreationCard;