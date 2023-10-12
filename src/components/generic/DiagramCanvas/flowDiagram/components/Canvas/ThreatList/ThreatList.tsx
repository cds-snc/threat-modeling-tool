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
  Header,
  Pagination,
  Table,
  TextFilter,
} from '@cloudscape-design/components';
import { columnDefinitions, getMatchesCountText, paginationLabels, collectionPreferencesProps } from './table-config';

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

export default function ThreatList( { threats, clickedObjectId } ) {
  const [selectedDFDObjectId] = useState(clickedObjectId);
  selectedDFDObjectId;
  //console.log('selectedDFDObjectId', selectedDFDObjectId);
  const [preferences] = useState({
    pageSize: 100,
    visibleContent: ['statement', 'priority', 'stride'],
    wrapLines: true,
  });
  const {
    items,
    actions,
    filteredItemsCount,
    collectionProps,
    filterProps,
    paginationProps,
  } = useCollection(threats, {
    filtering: {
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
    pagination: { pageSize: preferences.pageSize },
    sorting: {},
    selection: {},
  });
  const { selectedItems } = collectionProps;
  return (
    <Table
      {...collectionProps}
      selectionType="multi"
      header={
        <Header
          counter={
            selectedItems?.length
              ? `(${selectedItems.length}/${threats.length})`
              : `(${threats.length})`
          }
        >
          Threats
        </Header>
      }
      columnDefinitions={columnDefinitions}
      visibleColumns={preferences.visibleContent}
      items={items}
      stickyHeader
      resizableColumns
      wrapLines
      stripedRows
      pagination={
        <Pagination {...paginationProps} ariaLabels={paginationLabels} />
      }
      filter={
        <TextFilter
          {...filterProps}
          countText={getMatchesCountText(filteredItemsCount)}
          filteringAriaLabel="Filter instances"
        />
      }
      preferences={
        <CollectionPreferences
          {...collectionPreferencesProps}
          preferences={preferences}
        />
      }
    />
  );
}