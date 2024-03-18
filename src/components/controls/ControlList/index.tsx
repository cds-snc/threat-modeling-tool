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
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import { FC, useCallback, useMemo, useState } from 'react';
import { useMitigationLinksContext, useControlLinksContext, useApplicationInfoContext } from '../../../contexts';
import { useControlsContext } from '../../../contexts/ControlsContext/context';
import { MitigationLink, Control, ControlLink } from '../../../customTypes';
import LinkedEntityFilter, { ALL, WITHOUT_NO_LINKED_ENTITY, WITH_LINKED_ENTITY } from '../../generic/LinkedEntityFilter';
import TagSelector from '../../generic/TagSelector';
import { OPTIONS as STRIDEOptions } from '../../generic/STRIDESelector';
import { LEVEL_NOT_SET } from '../../../configs';
import ControlCard from '../ControlCard';
import ControlCreationCard from '../ControlCreationCard';
import { Link, Multiselect } from '@cloudscape-design/components';
import { getControlProfileByName } from '../../../data/controlProfileProvider';

const ControlList: FC = () => {
  const { applicationInfo } = useApplicationInfoContext();
  const {
    //controlList,
    removeControl,
    saveControl,
  } = useControlsContext();

  const {
    addControlLinks,
    controlLinkList,
    removeControlLinksByControlId,
  } = useControlLinksContext();

  const {
    addMitigationLinks,
    mitigationLinkList,
    removeMitigationLinksByLinkedEntityId,
  } = useMitigationLinksContext();

  const [filteringText, setFilteringText] = useState('');

  let selectedCategory = (applicationInfo.securityCategory == undefined ? 'CCCS Medium' : applicationInfo.securityCategory);
  const controlList = useMemo(() => {
    return getControlProfileByName(selectedCategory) as Control[];
  }, [selectedCategory]);

  const allTags = useMemo(() => {
    return controlList
      .reduce((all: string[], cur) => {
        return [...all, ...cur.tags?.filter(ia => !all.includes(ia)) || []];
      }, []).filter(t=>t!==applicationInfo.securityCategory).concat(['Data', 'Storage', 'Application', 'Compute', 'Network']);
  }, [applicationInfo.securityCategory, controlList]);

  const [
    selectedTags,
    setSelectedTags,
  ] = useState<string[]>(allTags.filter(t => {
    return (t.includes(applicationInfo.securityCategory||'') ||
           (t === 'CSP Stacked IaaS' && applicationInfo.useIaaS) ||
           (t === 'CSP Stacked PaaS' && applicationInfo.usePaaS) ||
           (t === 'CSP Stacked SaaS' && applicationInfo.useSaaS) ||
           (t.includes('Data') && applicationInfo.useData) ||
           (t.includes('Storage') && applicationInfo.useStorage) ||
           (t.includes('Application') && applicationInfo.useApplication) ||
           (t.includes('Compute') && applicationInfo.useCompute) ||
           (t.includes('Network') && applicationInfo.useNetwork)
    );
  }).concat(['Technical']));

  const STRIDE_OPTION_NO_VALUE = {
    label: 'STRIDE Not Set', value: LEVEL_NOT_SET,
  };

  const STRIDEOptionsWithNoValue = [...STRIDEOptions, STRIDE_OPTION_NO_VALUE];

  const [
    selectedSTRIDEs,
    setSelectedSTRIDEs,
  ] = useState<string[]>([]);

  const [
    selectedLinkedThreatsFilter,
    setSelectedLinkedThreatsFilter,
  ] = useState(ALL);

  const [
    selectedLinkedMitigationsFilter,
    setSelectedLinkedMitigationsFilter,
  ] = useState(ALL);

  const handleRemove = useCallback(async (controlId: string) => {
    removeControl(controlId);
    await removeMitigationLinksByLinkedEntityId(controlId);
    await removeControlLinksByControlId(controlId);
  }, [removeMitigationLinksByLinkedEntityId, removeControl, removeControlLinksByControlId]);

  const hasNoFilter = useMemo(() => {
    return (filteringText === ''
      && selectedLinkedMitigationsFilter === ALL
      && selectedLinkedThreatsFilter === ALL
      && selectedTags.length === 0);
  }, [filteringText, selectedTags,
    selectedLinkedThreatsFilter, selectedLinkedMitigationsFilter]);

  const handleClearFilter = useCallback(() => {
    setFilteringText('');
    setSelectedTags([]);
    setSelectedLinkedMitigationsFilter(ALL);
    setSelectedLinkedThreatsFilter(ALL);
  }, []);

  const handleAddTagToEntity = useCallback((control: Control, tag: string) => {
    const updated: Control = {
      ...control,
      tags: control.tags ?
        (!control.tags.includes(tag) ?
          [...control.tags, tag] : control.tags) :
        [tag],
    };
    saveControl(updated);
  }, [saveControl]);

  const handleRemoveTagFromEntity = useCallback((control: Control, tag: string) => {
    const updated: Control = {
      ...control,
      tags: control.tags?.filter(t => t !== tag),
    };
    saveControl(updated);
  }, [saveControl]);


  const filteredList = useMemo(() => {
    // display only controls that have at least one linked threat
    let output = controlList;//.filter(c => {return controlLinkList?.some(cl => cl.controlId.toLowerCase() === c.id.toLowerCase());});

    if (filteringText) {
      output = output.filter(c => c.content && c.content.toLowerCase().indexOf(filteringText.toLowerCase()) >= 0);
    }
    if (selectedTags && selectedTags.length > 0) {
      console.log('selectedTags', selectedTags);
      output = output.filter(c => {
        return c.tags?.some(t => selectedTags.includes(t));
      });
    }
    if (selectedSTRIDEs && selectedSTRIDEs.length > 0) {
      output = output.filter(c => {
        const stride = c.metadata?.find(m => m.key === 'STRIDE');
        const includedNoValue = selectedSTRIDEs.includes(LEVEL_NOT_SET);
        if (includedNoValue && (!stride || !stride.value || stride.value.length === 0 || (stride.value.length === 1 && stride.value[0]===''))) {
          return true;
        }

        return stride?.value && (stride.value as string[]).some(t => selectedSTRIDEs.includes(t));
      });
    }

    if (selectedLinkedThreatsFilter !== ALL) {
      output = output.filter(c => {
        return controlLinkList.some(cl => cl. controlId === c.id) ?
          selectedLinkedThreatsFilter === WITH_LINKED_ENTITY :
          selectedLinkedThreatsFilter === WITHOUT_NO_LINKED_ENTITY;
      });
    }

    if (selectedLinkedMitigationsFilter !== ALL) {
      output = output.filter(c => {
        return mitigationLinkList.some(ml => ml.linkedId === c.id) ?
          selectedLinkedMitigationsFilter === WITH_LINKED_ENTITY :
          selectedLinkedMitigationsFilter === WITHOUT_NO_LINKED_ENTITY;
      });
    }
    output = output.sort((op1, op2) => (op2.displayOrder || Number.MAX_VALUE) - (op1.displayOrder || Number.MAX_VALUE));
    return output;
  }, [filteringText, controlList, selectedTags, selectedSTRIDEs,
    mitigationLinkList, controlLinkList,
    selectedLinkedMitigationsFilter, selectedLinkedThreatsFilter]);


  const handleSaveNew = useCallback((control: Control,
    linkedMitigationIds: string[],
    linkedThreatIds: string[]) => {
    const updated = saveControl(control);

    const controlLinks: ControlLink[] = [];
    linkedThreatIds.forEach(id => {
      controlLinks.push({
        linkedId: id,
        controlId: updated.id,
      });
    });

    addControlLinks(controlLinks);

    const mitigationLinks: MitigationLink[] = [];
    linkedMitigationIds.forEach(id => {
      mitigationLinks.push({
        linkedId: updated.id,
        mitigationId: id,
      });
    });

    addMitigationLinks(mitigationLinks);

  }, [saveControl, addControlLinks, addMitigationLinks]);

  return (<div>
    <SpaceBetween direction='vertical' size='s'>
      <Container header={
        <Header
          counter={`(${filteredList.length})`}
          info={<Link variant="info">Info</Link>}
        >Control List</Header>
      }>
        <SpaceBetween direction='vertical' size='s'>
          <TextFilter
            filteringText={filteringText}
            filteringPlaceholder="Find controls"
            filteringAriaLabel="Filter controls"
            onChange={({ detail }) =>
              setFilteringText(detail.filteringText)
            }
          />
          <Grid
            gridDefinition={[
              { colspan: { default: 12, xs: 2 } },
              { colspan: { default: 12, xs: 3 } },
              { colspan: { default: 12, xs: 3 } },
              { colspan: { default: 12, xs: 3 } },
              { colspan: { default: 1 } },
            ]}
          >
            <TagSelector
              allTags={allTags}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
            <Multiselect
              tokenLimit={3}
              selectedOptions={[...STRIDEOptions.filter(x => selectedSTRIDEs.includes(x.value)),
                ...selectedSTRIDEs.includes(LEVEL_NOT_SET) ? [STRIDE_OPTION_NO_VALUE] : []]}
              onChange={({ detail }) =>
                setSelectedSTRIDEs(detail.selectedOptions?.map(o => o.value || '') || [])
              }
              deselectAriaLabel={e => `Remove ${e.label}`}
              options={STRIDEOptionsWithNoValue}
              placeholder="Filtered by STRIDE"
              selectedAriaLabel="Selected"
            />
            <LinkedEntityFilter
              label='Linked threats'
              entityDisplayName='threats'
              callerName='controls'
              selected={selectedLinkedThreatsFilter}
              setSelected={setSelectedLinkedThreatsFilter}
            />
            <LinkedEntityFilter
              label='Linked mitigations'
              entityDisplayName='mitigations'
              callerName='controls'
              selected={selectedLinkedMitigationsFilter}
              setSelected={setSelectedLinkedMitigationsFilter}
            />
            <Button onClick={handleClearFilter}
              variant='icon'
              iconSvg={<svg
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                tabIndex={-1}
              >
                <path d="M19.79 5.61C20.3 4.95 19.83 4 19 4H6.83l7.97 7.97 4.99-6.36zM2.81 2.81 1.39 4.22 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.17l5.78 5.78 1.41-1.41L2.81 2.81z"></path>
              </svg>}
              ariaLabel='Clear filters'
              disabled={hasNoFilter}
            />
          </Grid>
        </SpaceBetween>
      </Container>
      {filteredList?.map(entity => (<ControlCard
        key={entity.id}
        entity={entity}
        onRemove={handleRemove}
        onEdit={saveControl}
        onAddTagToEntity={handleAddTagToEntity}
        onRemoveTagFromEntity={handleRemoveTagFromEntity}
        controlList={controlList}
      />))}
      <ControlCreationCard
        onSave={handleSaveNew}
        controlList={controlList}
      />
    </SpaceBetween>
  </div>);
};

export default ControlList;