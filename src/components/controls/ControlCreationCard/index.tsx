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
import { useThreatsContext } from '../../../contexts/ThreatsContext/context';
import { Control } from '../../../customTypes';
import AssumptionLinkView from '../../assumptions/AssumptionLinkView';
import GenericEntityCreationCard, { DEFAULT_ENTITY } from '../../generic/GenericEntityCreationCard';
import ThreatLinkView from '../../threats/ThreatLinkView';

export interface ControlCreationCardProps {
  onSave?: (entity: Control, linkedAssumptionIds: string[], linkedThreatIds: string[]) => void;
}

const ControlCreationCard: FC<ControlCreationCardProps> = ({ onSave }) => {
  const [editingEntity, setEditingEntity] = useState<Control>(DEFAULT_ENTITY);
  const [linkedAssumptionIds, setLinkedAssumptionIds] = useState<string[]>([]);
  const [linkedThreatIds, setLinkedThreatIds] = useState<string[]>([]);

  const { assumptionList, saveAssumption } = useAssumptionsContext();
  const { statementList } = useThreatsContext();

  const handleSave = useCallback(() => {
    onSave?.(editingEntity, linkedAssumptionIds, linkedThreatIds);
    setEditingEntity(DEFAULT_ENTITY);
    setLinkedAssumptionIds([]);
    setLinkedThreatIds([]);
  }, [editingEntity, linkedAssumptionIds, linkedThreatIds, onSave]);

  const handleReset = useCallback(() => {
    setEditingEntity(DEFAULT_ENTITY);
    setLinkedAssumptionIds([]);
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

  return (<GenericEntityCreationCard
    editingEntity={editingEntity}
    setEditingEntity={setEditingEntity}
    header='Add new control'
    onSave={handleSave}
    onReset={handleReset}
    customEditors={<SpaceBetween direction='vertical' size='s'>
      <ThreatLinkView
        linkedThreatIds={linkedThreatIds}
        threatList={statementList}
        onAddThreatLink={(id) => setLinkedThreatIds(prev => [...prev, id])}
        onRemoveThreatLink={(id) => setLinkedThreatIds(prev => prev.filter(p => p !== id))}
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

export default ControlCreationCard;