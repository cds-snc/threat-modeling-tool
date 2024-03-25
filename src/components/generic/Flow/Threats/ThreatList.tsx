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
import { memo, useState, useEffect } from 'react';
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
import { useThreatsContext } from '../../../../contexts/ThreatsContext';

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

export default memo(({ threats, component, changeHandler }: { threats: any; component: any; changeHandler: any } ) => {

  const [data, setData] = useState((component && component.data) || {});

  useEffect(() => {
    setData((component && component.data) || {});
  }, [component]);

  const updateData = (key, value, defaultValue) => {
    if (component) {
      setData({ ...data, [key]: value || defaultValue });
      changeHandler({ [key]: value || defaultValue });
    }
  };

  const { onThreatListView } = useThreatsContext();

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
    threats.map((item) => {
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
            action={<Button onClick={() => onThreatListView?.()}>Add threats</Button>}
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
        defaultSelectedItems: component?.data.threats,
        keepSelection: true,
        trackBy: 'id',
      },
    });

  if (!component) {
    return <EmptyState title="Select a component to view and assign threats" subtitle="" action={null} />;
  }

  return (
    <Table
      {...collectionProps}
      selectionType="multi"
      header={
        <Header
          counter={
            data.threats?.length
              ? `(${data.threats.length}/${threats.length})`
              : `(${threats.length})`
          }
        >
          Threats
        </Header>
      }
      columnDefinitions={columnDefinitions}
      visibleColumns={preferences.visibleContent}
      items={items}
      trackBy="id"
      selectedItems={data.threats}
      onSelectionChange={(e) => updateData('threats', e.detail.selectedItems, [])}
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
});