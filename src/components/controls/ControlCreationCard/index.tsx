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
/** @jsxImportSource @emotion/react */
import SpaceBetween from '@cloudscape-design/components/space-between';
import { FC, useState, useCallback, useRef, useMemo } from 'react';
import { Control } from '../../../customTypes';
import { Button, ColumnLayout, Container, Header, Select, TextContent, Alert } from '@cloudscape-design/components';
import { OptionDefinition } from '@cloudscape-design/components/internal/components/option/interfaces';
import getMobileMediaQuery from '../../../utils/getMobileMediaQuery';
import * as awsui from '@cloudscape-design/design-tokens';
import { css } from '@emotion/react';
import Tags from '../ControlCard/components/Tags';
import { DEFAULT_NEW_ENTITY_ID } from '../../../configs';
import ThreatLinkView from '../../threats/ThreatLinkView';
import { useMitigationsContext, useThreatsContext } from '../../../contexts';
import MitigationLinkView from '../../mitigations/MitigationLinkView';

export interface ControlCreationCardProps {
  onSave?: (entity: Control, linkedMitigationIds: string[], linkedThreatIds: string[]) => void;
  onAddTagToEntity?: (entity: Control, tag: string) => void;
  onRemoveTagFromEntity?: (entity: Control, tag: string) => void;
  controlList?: Control[];
}

const styles = {
  header: css({
    display: 'inline-flex',
    alignItems: 'center',
    [getMobileMediaQuery()]: {
      display: 'block',
      marginTop: awsui.spaceScaledS,
    },
  }),
  tags: css({
    marginRight: awsui.spaceScaledS,
    marginLeft: awsui.spaceScaledS,
    [getMobileMediaQuery()]: {
      marginLeft: '0px',
    },
  }),
  info: css({
    marginLeft: awsui.spaceScaledS,
    [getMobileMediaQuery()]: {
      marginLeft: '0px',
    },
  }),
  finalStatementSection: css({
    '&:hover': {
      backgroundColor: awsui.colorBackgroundDropdownItemHover,
    },
  }),
  metadataContainer: css({
    'h3>span>span': {
      fontSize: '20px',
    },
  }),
};

const ControlCreationCard: FC<ControlCreationCardProps> = ({
  onSave,
  onAddTagToEntity,
  onRemoveTagFromEntity,
  controlList,
}) => {
  const ref = useRef<any>(null);
  const DEFAULT_ENTITY = useMemo( () => {
    return {
      id: DEFAULT_NEW_ENTITY_ID,
      numericId: -1,
      content: '',
      metadata: [
        {
          key: 'Comments',
          value: '',
        },
        {
          key: 'STRIDE',
          value: '',
        },
      ],
    };
  }, []);
  const [editingEntity, setEditingEntity] = useState<Control>(DEFAULT_ENTITY);
  const [linkedThreatIds, setLinkedThreatIds] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  const [selectedControl, setSelectedControl] = useState<OptionDefinition | null>(null);
  const [controlId, setControlId] = useState(editingEntity.id);
  const [tags, setTags] = useState(editingEntity.tags);
  const [metadataComments, setMetadataComments] = useState(editingEntity.metadata?.find(m => m.key === 'Comments')?.value);
  const { statementList } = useThreatsContext();
  const { mitigationList, saveMitigation } = useMitigationsContext();
  const [linkedMitigationIds, setLinkedMitigationIds] = useState<string[]>([]);

  const handleSave = useCallback(() => {
    if (linkedThreatIds.length === 0) {
      setShowAlert(true);
      return;
    }

    editingEntity.id = controlId || 'new';
    editingEntity.content = selectedControl?.label as string || '';
    editingEntity.tags = tags || [];
    if ( editingEntity.metadata && editingEntity.metadata.find(m => m.key === 'Comments') ) {
      editingEntity.metadata!.find(m => m.key === 'Comments')!.value = selectedControl?.description || '';
    }
    if ( editingEntity.metadata && editingEntity.metadata.find(m => m.key === 'STRIDE') ) {
      editingEntity.metadata!.find(m => m.key === 'STRIDE')!.value = selectedControl?.filteringTags as string[] || [];
    }
    onSave?.(editingEntity, linkedMitigationIds, linkedThreatIds);
    setEditingEntity(DEFAULT_ENTITY);
    setControlId('new');
    setSelectedControl(null);
    setTags([]);
    setMetadataComments('');
    setLinkedMitigationIds([]);
    setLinkedThreatIds([]);
  }, [controlId, editingEntity, linkedMitigationIds, linkedThreatIds,
    onSave, selectedControl?.label, selectedControl?.description, tags, DEFAULT_ENTITY, selectedControl?.filteringTags]);

  const handleReset = useCallback(() => {
    setEditingEntity(DEFAULT_ENTITY);
    setControlId('new');
    setSelectedControl(null);
    setTags([]);
    setMetadataComments('');
    setLinkedMitigationIds([]);
    setLinkedThreatIds([]);
  }, [DEFAULT_ENTITY]);

  const handleControlChange = (selectedOption) => {
    setSelectedControl(selectedOption);
    setControlId(selectedOption.value);
    setTags(selectedOption.tags);
    setMetadataComments(selectedOption.description);
  };

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

  const handleOnDismissAlert = (_event) => {
    setShowAlert(false);
  };

  return (
    <div ref={ref}>
      <Container
        header={
          <Header>
            <div css={styles.header}>
              {'Add new control'}
              <div css={styles.tags}><Tags
                tags={tags}
                entityId={controlId}
                onAddTagToEntity={(_entityId, tag) => onAddTagToEntity?.(editingEntity, tag)}
                onRemoveTagFromEntity={(_entityId, tag) => onRemoveTagFromEntity?.(editingEntity, tag)}
              />
              </div>
            </div>
          </Header>
        }
      >
        <SpaceBetween direction='vertical' size='s'>
          <SpaceBetween direction='horizontal' size='s'>
            <Button onClick={handleReset}>Reset</Button>
            <Button variant='primary' disabled={selectedControl===null} onClick={handleSave}>Save</Button>
            <Alert
              dismissible
              statusIconAriaLabel="Error"
              type="error"
              visible={showAlert}
              onDismiss={handleOnDismissAlert}
              header="Validation error" >
              Select at least one threat from the list.
            </Alert>
          </SpaceBetween>
          <ColumnLayout columns={2}>
            <Select
              selectedOption={selectedControl}
              onChange={({ detail }) => {
                handleControlChange(detail.selectedOption);
                setShowAlert(false);
              }}
              options={controlList?.map(c => ({
                label: c.content,
                labelTag: (c.metadata?.find(m => m.key === 'STRIDE')?.value as string[]).join(','),
                value: c.id,
                description: c.metadata?.find(m => m.key === 'Comments')?.value as string,
                tags: c.tags,
                filteringTags: c.metadata?.find(m => m.key === 'STRIDE')?.value as string[],
              }))}
              filteringType="auto"
              placeholder="Choose a security control"
            />
            <SpaceBetween direction='vertical' size='s'>
              <ThreatLinkView
                linkedThreatIds={linkedThreatIds}
                threatList={statementList}
                onAddThreatLink={(id) => setLinkedThreatIds(prev => [...prev, id])}
                onRemoveThreatLink={(id) => setLinkedThreatIds(prev => prev.filter(p => p !== id))}
              />
              <MitigationLinkView
                linkedMitigationIds={linkedMitigationIds}
                mitigationList={mitigationList}
                onAddMitigationLink={handleAddMitigationLink}
                onRemoveMitigationLink={(id) => setLinkedMitigationIds(prev => prev.filter(p => p !== id))}
              />
            </SpaceBetween>
          </ColumnLayout>
          <TextContent>
            {metadataComments || ''}
          </TextContent>
        </SpaceBetween>
      </Container>
    </div>
  );
};

export default ControlCreationCard;