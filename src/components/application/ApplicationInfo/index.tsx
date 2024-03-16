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

import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import FormField from '@cloudscape-design/components/form-field';
import SegmentedControl from '@cloudscape-design/components/segmented-control';
import Checkbox from '@cloudscape-design/components/checkbox';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { FC, useState, useCallback, useMemo, useEffect } from 'react';
import { useApplicationInfoContext } from '../../../contexts/ApplicationContext/context';
import { ApplicationInfoSchema, EditableComponentBaseProps } from '../../../customTypes';
import Input from '../../generic/Input';
import MarkdownEditor from '../../generic/MarkdownEditor';
import MarkdownViewer from '../../generic/MarkdownViewer';

const ApplicationInfo: FC<EditableComponentBaseProps> = ({
  onEditModeChange,
}) => {
  const { applicationInfo, setApplicationInfo } = useApplicationInfoContext();
  const [editMode, setEditMode] = useState(!applicationInfo.name && !applicationInfo.description );
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [securityCategory, setSecurityCategory] = useState('CCCS Medium');
  const [checkedIaaS, setCheckedIaaS] = useState(false);
  const [checkedPaaS, setCheckedPaaS] = useState(false);
  const [checkedSaaS, setCheckedSaaS] = useState(false);
  const [checkedData, setCheckedData] = useState(true);
  const [checkedStorage, setCheckedStorage] = useState(true);
  const [checkedApplication, setCheckedApplication] = useState(false);
  const [checkedCompute, setCheckedCompute] = useState(false);
  const [checkedNetwork, setCheckedNetwork] = useState(true);

  useEffect(() => {
    onEditModeChange?.(editMode);
  }, [editMode, onEditModeChange]);

  const handleSaveApplicationInfo = useCallback(() => {
    setApplicationInfo(prev => ({
      ...prev,
      description: content,
      name,
      securityCategory: securityCategory,
      useIaaS: checkedIaaS,
      usePaaS: checkedPaaS,
      useSaaS: checkedSaaS,
      useData: checkedData,
      useStorage: checkedStorage,
      useApplication: checkedApplication,
      useCompute: checkedCompute,
      useNetwork: checkedNetwork,
    }));
    setEditMode(false);
  }, [checkedApplication, checkedCompute, checkedData,
    checkedIaaS, checkedNetwork, checkedPaaS, checkedSaaS,
    checkedStorage, content, name, securityCategory, setApplicationInfo]);

  const handleEdit = useCallback(() => {
    setContent(applicationInfo.description || '');
    setName(applicationInfo.name || '');
    setSecurityCategory(applicationInfo.securityCategory || 'CCCS Medium');
    setCheckedIaaS(applicationInfo.useIaaS || false);
    setCheckedPaaS(applicationInfo.usePaaS || false);
    setCheckedSaaS(applicationInfo.useSaaS || false);
    setCheckedData(applicationInfo.useData || false);
    setCheckedStorage(applicationInfo.useStorage || false);
    setCheckedApplication(applicationInfo.useApplication || false);
    setCheckedCompute(applicationInfo.useCompute || false);
    setCheckedNetwork(applicationInfo.useNetwork || false);
    setEditMode(true);
  }, [applicationInfo]);

  const actions = useMemo(() => {
    return editMode ? (<SpaceBetween direction='horizontal' size='s'>
      <Button onClick={() => setEditMode(false)}>Cancel</Button>
      <Button variant='primary' onClick={handleSaveApplicationInfo}>Confirm</Button>
    </SpaceBetween>) : (<Button onClick={handleEdit}>Edit</Button>);
  }, [editMode, handleSaveApplicationInfo, handleEdit, setEditMode]);

  return (<Container
    header={<Header actions={actions}>{applicationInfo.name || 'Application Introduction'}</Header>}
  >{editMode ? (
      <SpaceBetween direction='vertical' size='l'>
        <FormField
          label="Application or feature name"
        >
          <Input
            value={name}
            onChange={event =>
              setName(event.detail.value)
            }
            validateData={ApplicationInfoSchema.shape.name.safeParse}
            placeholder='Enter application or feature name'
          />
        </FormField>
        <MarkdownEditor
          value={content}
          onChange={setContent}
          label='Description'
          parentHeaderLevel='h2'
          validateData={ApplicationInfoSchema.shape.description.safeParse}
        />
        <FormField
          label="This application / feature requires the following GC Cloud Profile"
          description="CCCS Low (formerly PALL) -> Targets: Protected A, Low Integrity, Low Availability | CCCS Medium (formerly PBMM) -> Targets: Protected B, Medium Integrity, Medium Availability"
        >
          <SegmentedControl
            selectedId={securityCategory}
            onChange={({ detail }) =>
              setSecurityCategory(detail.selectedId)
            }
            label="This application / feature require the following GC Cloud Profile"
            options={[
              { text: 'CCCS Low', id: 'CCCS Low' },
              { text: 'CCCS Medium', id: 'CCCS Medium' },
              { text: 'CCCS High', id: 'CCCS High' },
            ]}
          />
        </FormField>
        <FormField
          label="Cloud service model">
          <Checkbox
            onChange={({ detail }) =>
              setCheckedIaaS(detail.checked)
            }
            checked={checkedIaaS}
          >
          IaaS
          </Checkbox>
          <Checkbox
            onChange={({ detail }) =>
              setCheckedPaaS(detail.checked)
            }
            checked={checkedPaaS}
          >
          PaaS
          </Checkbox>
          <Checkbox
            onChange={({ detail }) =>
              setCheckedSaaS(detail.checked)
            }
            checked={checkedSaaS}
          >
          SaaS
          </Checkbox>
        </FormField>
        <FormField
          label="Cloud stack component">
          <Checkbox
            onChange={({ detail }) =>
              setCheckedData(detail.checked)
            }
            checked={checkedData}
          >
          Data
          </Checkbox>
          <Checkbox
            onChange={({ detail }) =>
              setCheckedStorage(detail.checked)
            }
            checked={checkedStorage}
          >
          Storage
          </Checkbox>
          <Checkbox
            onChange={({ detail }) =>
              setCheckedApplication(detail.checked)
            }
            checked={checkedApplication}
          >
          Application
          </Checkbox>
          <Checkbox
            onChange={({ detail }) =>
              setCheckedCompute(detail.checked)
            }
            checked={checkedCompute}
          >
          Compute
          </Checkbox>
          <Checkbox
            onChange={({ detail }) =>
              setCheckedNetwork(detail.checked)
            }
            checked={checkedNetwork}
          >
          Network
          </Checkbox>
        </FormField>
      </SpaceBetween>) :
      (
        <SpaceBetween direction='vertical' size='l'>
          <MarkdownViewer>
            {applicationInfo.description || ''}
          </MarkdownViewer>
          <Header>{'GC cloud profile'}</Header>
          <MarkdownViewer>
            {applicationInfo.securityCategory || ''}
          </MarkdownViewer>
          <Header>{'Cloud service models'}</Header>
          <MarkdownViewer>
            {[(applicationInfo.useIaaS ? 'IaaS' : ''), (applicationInfo.usePaaS ? 'PaaS' : ''), (applicationInfo.useSaaS ? 'SaaS' : '')].filter(Boolean).join(', ')}
          </MarkdownViewer>
          <Header>{'Cloud stack components'}</Header>
          <MarkdownViewer>
            {[(applicationInfo.useData ? 'Data' : ''), (applicationInfo.useStorage ? 'Storage' : ''), (applicationInfo.useApplication ? 'Application' : ''), (applicationInfo.useCompute ? 'Compute' : ''), (applicationInfo.useNetwork ? 'Network' : '')].filter(Boolean).join(', ')}
          </MarkdownViewer>
        </SpaceBetween>)}
  </Container>);
};

export default ApplicationInfo;