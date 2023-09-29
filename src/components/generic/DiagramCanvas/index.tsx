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
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { css } from '@emotion/react';
import { BodyWidget } from './widgets/BodyWidget';
import { Application } from './Application';

import { FC, useCallback, useState, useMemo, useEffect } from 'react';
import { BaseImageInfo, EditableComponentBaseProps } from '../../../customTypes';


export interface DiagramCanvasProps extends EditableComponentBaseProps {
  entity: BaseImageInfo;
  headerTitle: string;
  diagramTitle: string;
  onConfirm: (info: BaseImageInfo) => void;
}

const DiagramCanvas: FC<DiagramCanvasProps> = ({
  headerTitle,
  diagramTitle,
  entity,
  onConfirm,
  onEditModeChange,
}) => {
  const [editMode, setEditMode] = useState(!entity.description && !entity.image);
  const [image, setImage] = useState<string>('');
  const [content, setContent] = useState('');

  useEffect(() => {
    onEditModeChange?.(editMode);
  }, [editMode]);

  const handleSaveDiagramCanvas = useCallback(() => {
    onConfirm({
      image,
      description: content,
    });
    setEditMode(false);
  }, [image, content, onConfirm]);

  const handleEdit = useCallback(() => {
    setContent(entity.description || '');
    setImage(entity.image || '');
    setEditMode(true);
  }, [entity, setContent, setEditMode, setImage]);

  const actions = useMemo(() => {
    return editMode ? (<SpaceBetween direction='horizontal' size='s'>
      <Button key='cancelBtn' onClick={() => setEditMode(false)}>Cancel</Button>
      <Button key='confirmBtn' variant='primary' onClick={handleSaveDiagramCanvas}>Confirm</Button>
    </SpaceBetween>) : (<Button onClick={handleEdit}>Edit</Button>);
  }, [editMode, handleSaveDiagramCanvas, handleEdit, setEditMode]);

  const diagramWrapper = css({
    display: 'grid',
    height: '75vh',
    minHeight: '100%',
    width: '50vw',
    minWidth: '100%',
  });

  const app = new Application();

  return (
    <Container header={<Header actions={actions}>{headerTitle}</Header>}>
      {editMode ? (
        <SpaceBetween direction='vertical' size='s'>

          <div css={diagramWrapper}>
            <BodyWidget app={app} />
          </div>
        </SpaceBetween>) :
        (<SpaceBetween direction='vertical' size='s'>
          <Header variant='h3' key='diagramInfo'>Description</Header>
          <Header variant='h3' key='diagram'>{diagramTitle}</Header>
        </SpaceBetween>)
      }

    </Container>
  );
};

export default DiagramCanvas;