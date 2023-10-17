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
import { useState } from 'react';
import { useCollection } from '@cloudscape-design/collection-hooks';
import {
  Box,
  Button,
  CollectionPreferences,
  CollectionPreferencesProps,
  Header,
  Pagination,
  Table,
  PropertyFilter,
} from '@cloudscape-design/components';
import { columnDefinitions, getMatchesCountText, paginationLabels, collectionPreferencesProps, filteringConstants, filteringProperties } from './table-config';

function EmptyState({ title, subtitle, action }) {
  return (
    <Box textAlign="center" color="inherit">
      <Box variant="strong" textAlign="center" color="inherit">
        {title}
      </Box>
      <Box variant="p" padding={{ bottom: 's' }} color="inherit">
        {subtitle}
      </Box>
      {action}
    </Box>
  );
}

export default function ThreatList( props ) {
  function handleThreatsSelectionChange(event) {
    props.onThreatsSelectionChange(event.detail.selectedItems.map( ({ id }) => ( { id: id } ) ));
  };
  const [selectedDFDObjectId] = useState(props.clickedObjectId);
  selectedDFDObjectId;
  //console.log('selectedDFDObjectId', selectedDFDObjectId);
  const [preferences, setPreferences] = useState<CollectionPreferencesProps.Preferences>({
    pageSize: 10,
    visibleContent: ['statement', 'priority', 'stride'],
    wrapLines: true,
  });
  const {
    items,
    actions,
    filteredItemsCount,
    collectionProps,
    paginationProps,
    propertyFilterProps,
  } = useCollection(
    props.threats.map((item) => {
      const output: any = {};
      output.id = item.id;
      output.statement = item.statement;
      output.priority = item.metadata?.find(m => m.key === 'Priority')?.value;
      output.stride = item.metadata?.find(m => m.key === 'STRIDE')?.value.sort().join(',');
      return output;
    }),
    {
      propertyFiltering: {
        filteringProperties: filteringProperties,
        empty: (
          <EmptyState
            title="No threats defined"
            subtitle=""
            action={<Button>Add threat</Button>}
          />
        ),
        noMatch: (
          <EmptyState
            title="No matches"
            subtitle=""
            action={
              <Button onClick={() => actions.setFiltering('')}>
              Clear filter
              </Button>
            }
          />
        ),
      },
      sorting: {},
      pagination: { pageSize: preferences.pageSize },
      selection: {
        defaultSelectedItems: props.selectedThreats,
        keepSelection: true,
        trackBy: 'id',
      },
    });

  return (
    <Table
      {...collectionProps}
      selectionType="multi"
      header={
        <Header
          counter={
            props.selectedThreats?.length
              ? `(${props.selectedThreats.length}/${props.threats.length})`
              : `(${props.threats.length})`
          }
        >
          Threats
        </Header>
      }
      columnDefinitions={columnDefinitions}
      visibleColumns={preferences.visibleContent}
      items={items}
      trackBy="id"
      selectedItems={props.selectedThreats}
      onSelectionChange={handleThreatsSelectionChange}
      stickyHeader
      resizableColumns
      wrapLines
      stripedRows
      pagination={
        <Pagination {...paginationProps} ariaLabels={paginationLabels} />
      }
      preferences={
        <CollectionPreferences
          {...collectionPreferencesProps}
          preferences={preferences}
          onConfirm={({ detail }) => setPreferences(detail)}
        />
      }
      filter={
        <PropertyFilter
          {...propertyFilterProps}
          countText={getMatchesCountText(filteredItemsCount)}
          expandToViewport={true}
          i18nStrings={filteringConstants}
        />
      }
    />
  );
}