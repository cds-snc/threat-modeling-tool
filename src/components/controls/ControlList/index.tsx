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
import { useAssumptionLinksContext, useControlLinksContext } from '../../../contexts';
import { useControlsContext } from '../../../contexts/ControlsContext/context';
import { AssumptionLink, Control, ControlLink } from '../../../customTypes';
import LinkedEntityFilter, { ALL, WITHOUT_NO_LINKED_ENTITY, WITH_LINKED_ENTITY } from '../../generic/LinkedEntityFilter';
import TagSelector from '../../generic/TagSelector';
import ControlCard from '../ControlCard';
import ControlCreationCard from '../ControlCreationCard';

const ControlList: FC = () => {
  const {
    controlList,
    removeControl,
    saveControl,
  } = useControlsContext();

  const {
    addControlLinks,
    controlLinkList,
    removeControlLinksByControlId,
  } = useControlLinksContext();

  const {
    addAssumptionLinks,
    assumptionLinkList,
    removeAssumptionLinksByLinkedEntityId,
  } = useAssumptionLinksContext();

  const [filteringText, setFilteringText] = useState('');

  const [
    selectedTags,
    setSelectedTags,
  ] = useState<string[]>([]);

  const [
    selectedLinkedThreatsFilter,
    setSelectedLinkedThreatsFilter,
  ] = useState(ALL);

  const [
    selectedLinkedAssumptionsFilter,
    setSelectedLinkedAssumptionsFilter,
  ] = useState(ALL);

  const handleRemove = useCallback(async (controlId: string) => {
    removeControl(controlId);
    await removeAssumptionLinksByLinkedEntityId(controlId);
    await removeControlLinksByControlId(controlId);
  }, [removeAssumptionLinksByLinkedEntityId, removeControl, removeControlLinksByControlId]);

  const hasNoFilter = useMemo(() => {
    return (filteringText === ''
      && selectedLinkedAssumptionsFilter === ALL
      && selectedLinkedThreatsFilter === ALL
      && selectedTags.length === 0);
  }, [filteringText, selectedTags,
    selectedLinkedThreatsFilter, selectedLinkedAssumptionsFilter]);

  const handleClearFilter = useCallback(() => {
    setFilteringText('');
    setSelectedTags([]);
    setSelectedLinkedAssumptionsFilter(ALL);
    setSelectedLinkedThreatsFilter(ALL);
  }, []);

  const allTags = useMemo(() => {
    return controlList
      .reduce((all: string[], cur) => {
        return [...all, ...cur.tags?.filter(ia => !all.includes(ia)) || []];
      }, []);
  }, [controlList]);

  const handleAddTagToEntity = useCallback((assumption: Control, tag: string) => {
    const updated: Control = {
      ...assumption,
      tags: assumption.tags ?
        (!assumption.tags.includes(tag) ?
          [...assumption.tags, tag] : assumption.tags) :
        [tag],
    };
    saveControl(updated);
  }, [saveControl]);

  const handleRemoveTagFromEntity = useCallback((assumption: Control, tag: string) => {
    const updated: Control = {
      ...assumption,
      tags: assumption.tags?.filter(t => t !== tag),
    };
    saveControl(updated);
  }, [saveControl]);

  const filteredList = useMemo(() => {
    let output = controlList;

    if (filteringText) {
      output = output.filter(st => st.content && st.content.toLowerCase().indexOf(filteringText.toLowerCase()) >= 0);
    }

    if (selectedTags && selectedTags.length > 0) {
      output = output.filter(st => {
        return st.tags?.some(t => selectedTags.includes(t));
      });
    }

    if (selectedLinkedThreatsFilter !== ALL) {
      output = output.filter(st => {
        return controlLinkList.some(ml => ml. controlId === st.id) ?
          selectedLinkedThreatsFilter === WITH_LINKED_ENTITY :
          selectedLinkedThreatsFilter === WITHOUT_NO_LINKED_ENTITY;
      });
    }

    if (selectedLinkedAssumptionsFilter !== ALL) {
      output = output.filter(st => {
        return assumptionLinkList.some(al => al.linkedId === st.id) ?
          selectedLinkedAssumptionsFilter === WITH_LINKED_ENTITY :
          selectedLinkedAssumptionsFilter === WITHOUT_NO_LINKED_ENTITY;
      });
    }

    output = output.sort((op1, op2) => (op2.displayOrder || Number.MAX_VALUE) - (op1.displayOrder || Number.MAX_VALUE));

    return output;
  }, [filteringText, controlList, selectedTags,
    assumptionLinkList, controlLinkList,
    selectedLinkedAssumptionsFilter, selectedLinkedThreatsFilter]);

  const handleSaveNew = useCallback((control: Control,
    linkedAssumptionIds: string[],
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

    const assumptionLinks: AssumptionLink[] = [];
    linkedAssumptionIds.forEach(id => {
      assumptionLinks.push({
        linkedId: updated.id,
        assumptionId: id,
        type: 'Control',
      });
    });

    addAssumptionLinks(assumptionLinks);

  }, [saveControl, addControlLinks, addAssumptionLinks]);

  return (<div>
    <SpaceBetween direction='vertical' size='s'>
      <Container header={
        <Header
          counter={`(${filteredList.length})`}
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
              { colspan: { default: 12, xs: 3 } },
              { colspan: { default: 12, xs: 4 } },
              { colspan: { default: 12, xs: 4 } },
              { colspan: { default: 1 } },
            ]}
          >
            <TagSelector
              allTags={allTags}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
            <LinkedEntityFilter
              label='Linked threats'
              entityDisplayName='threats'
              selected={selectedLinkedThreatsFilter}
              setSelected={setSelectedLinkedThreatsFilter}
            />
            <LinkedEntityFilter
              label='Linked assumptions'
              entityDisplayName='assumptions'
              selected={selectedLinkedAssumptionsFilter}
              setSelected={setSelectedLinkedAssumptionsFilter}
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
      />))}
      <ControlCreationCard
        onSave={handleSaveNew}
      />
    </SpaceBetween>
  </div>);
};

export default ControlList;