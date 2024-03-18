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
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import SpaceBetween from '@cloudscape-design/components/space-between';
//import TextContent from '@cloudscape-design/components/text-content';
import { FC, useState, useCallback, useRef, useMemo, ReactNode } from 'react';
import { Control } from '../../../customTypes';
import MitigationLink from '../../mitigations/MitigationLink';
import CopyToClipbord from '../../generic/CopyToClipboard';
import { DeleteConfirmationDialog } from '@aws-northstar/ui';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import * as awsui from '@cloudscape-design/design-tokens';
import { css } from '@emotion/react';
import ControlThreatLink from '../ControlThreatLink';
import getMobileMediaQuery from '../../../utils/getMobileMediaQuery';
import Tooltip from '../../generic/Tooltip';
import Tags from './components/Tags';
import { Select, TextContent } from '@cloudscape-design/components';
import { OptionDefinition } from '@cloudscape-design/components/internal/components/option/interfaces';

export interface ControlCardProps {
  entity: Control;
  info?: ReactNode;
  onRemove?: (id: string) => void;
  onEdit?: (entity: Control) => void;
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

const ControlCard: FC<ControlCardProps> = ({
  entity,
  info,
  onRemove,
  onEdit,
  onAddTagToEntity,
  onRemoveTagFromEntity,
  controlList,
}) => {
  const ref = useRef<any>(null);
  const [editingMode, setEditingMode] = useState(false);
  const [editingValue, setEditingValue] = useState(entity.content);
  const [removeDialogVisible, setRemoveDialogVisible] = useState(false);
  const [controlId, setControlId] = useState(entity.id);
  const [tags, setTags] = useState(entity.tags);
  const [metadataComments, setMetadataComments] = useState(entity.metadata?.find(m => m.key === 'Comments')?.value);
  //const [linkedControlIds, setLinkedControlIds] = useState<string[]>([]);
  const [selectedControl, setSelectedControl] = useState<OptionDefinition>({
    label: entity.content,
    value: entity.id,
    description: entity.metadata?.find(m => m.key === 'Comments')?.value as string,
    tags: entity.tags,
  });

  const handleSave = useCallback(() => {
    const updated = {
      ...entity,
      content: editingValue,
    };
    onEdit?.(updated);
    setEditingMode(false);
  }, [editingValue, entity, onEdit]);

  const handleCancel = useCallback(() => {
    setEditingValue(entity.content);
    setSelectedControl({
      label: entity.content,
      value: entity.id,
      description: entity.metadata?.find(m => m.key === 'Comments')?.value as string,
      tags: entity.tags,
    });
    setTags(entity.tags);
    setMetadataComments(entity.metadata?.find(m => m.key === 'Comments')?.value as string);
    setEditingMode(false);
  }, [entity]);

  const handleControlChange = (selectedOption) => {
    setSelectedControl(selectedOption);
    setControlId(selectedOption.id);
    setTags(selectedOption.tags);
    setMetadataComments(selectedOption.description);
  };

  // const handleAddControlLink = useCallback((controlIdOrNewControl: string) => {
  //   if (controlList.find(a => a.id === controlIdOrNewControl)) {
  //     setLinkedControlIds(prev => [...prev, controlIdOrNewControl]);
  //   }

  // }, [setLinkedControlIds, controlList]);

  const actions = useMemo(() => {
    return (<SpaceBetween direction='horizontal' size='s'>
      {onRemove && <Tooltip tooltip='Remove From Workspace'><Button onClick={() => setRemoveDialogVisible(true)} variant='icon' iconName='remove' /></Tooltip>}
      {onEdit && <Tooltip tooltip='Edit'><Button onClick={() => setEditingMode(true)} variant='icon' iconName='edit' /></Tooltip>}
    </SpaceBetween>);
  }, [onRemove, onEdit]);

  return (
    <div ref={ref}>
      <Container
        header={
          <Header actions={actions}>
            <div css={styles.header}>
              {`Control ${entity.numericId}`}
              <div css={styles.info}>{info}</div>
              <div css={styles.tags}><Tags
                tags={tags}
                entityId={controlId}
                onAddTagToEntity={(_entityId, tag) => onAddTagToEntity?.(entity, tag)}
                onRemoveTagFromEntity={(_entityId, tag) => onRemoveTagFromEntity?.(entity, tag)}
              />
              </div>
            </div>
          </Header>
        }
      >
        <SpaceBetween direction='vertical' size='s'>
          <ColumnLayout columns={2}>
            {editingMode ? (
              <SpaceBetween direction='vertical' size='s'>
                <Select
                  selectedOption={selectedControl}
                  onChange={({ detail }) => handleControlChange(detail.selectedOption)}
                  options={controlList?.map(c => ({
                    label: c.content,
                    value: c.id,
                    description: c.metadata?.find(m => m.key === 'Comments')?.value as string,
                    tags: c.tags,
                  }))}
                  filteringType="auto"
                />
                <SpaceBetween direction='horizontal' size='s'>
                  <Button onClick={handleCancel}>Cancel</Button>
                  <Button variant='primary' onClick={handleSave}>Save</Button>
                </SpaceBetween>
              </SpaceBetween>
            ) : (<div css={styles.metadataContainer}>
              <TextContent>
                <CopyToClipbord content={entity.content}>
                  {entity.content}
                </CopyToClipbord>
              </TextContent>
            </div>
            )}
            <SpaceBetween direction='vertical' size='s'>
              <ControlThreatLink controlId={controlId} />
              <MitigationLink linkedEntityId={controlId} />
            </SpaceBetween>
          </ColumnLayout>
          <TextContent>
            <CopyToClipbord content={entity.content || ''}>
              {metadataComments || ''}
            </CopyToClipbord>
          </TextContent>
        </SpaceBetween>
      </Container>
      {removeDialogVisible && <DeleteConfirmationDialog
        variant='confirmation'
        title={`Remove Control ${entity.numericId}?`}
        visible={removeDialogVisible}
        onCancelClicked={() => setRemoveDialogVisible(false)}
        onDeleteClicked={() => onRemove?.(controlId)}
        deleteButtonText='Remove'
      ></DeleteConfirmationDialog>}
    </div>
  );
};

export default ControlCard;