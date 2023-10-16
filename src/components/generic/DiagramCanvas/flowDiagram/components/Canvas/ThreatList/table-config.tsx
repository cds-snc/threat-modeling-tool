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
import { Link, Badge } from '@cloudscape-design/components';

export function getMatchesCountText(count) {
  return count === 1 ? '1 match' : `${count} matches`;
}

function createLabelFunction(columnName) {
  return ({ sorted, descending }) => {
    const sortState = sorted ? `sorted ${descending ? 'descending' : 'ascending'}` : 'not sorted';
    return `${columnName}, ${sortState}.`;
  };
}

export const columnDefinitions = [
  {
    id: 'id',
    header: 'ID',
    cell: item => <Link href={`#${item.id}`}>{item.id}</Link>,
    ariaLabel: createLabelFunction('id'),
    sortingField: 'id',
    isRowHeader: false,
  },
  {
    id: 'statement',
    header: 'Statement',
    cell: item => item.statement,
    ariaLabel: createLabelFunction('Threat'),
    sortingField: 'statement',
  },
  {
    id: 'priority',
    header: 'Priority',
    cell: item => <Badge color={item.metadata?.find(m => m.key === 'Priority')?.value === 'High' ? 'red' : item.metadata?.find(m => m.key === 'Priority')?.value === 'Medium' ? 'blue' : item.metadata?.find(m => m.key === 'Priority')?.value ==='Low' ? 'green':'grey'}>{item.metadata?.find(m => m.key === 'Priority')?.value || 'Priority Not Set'}</Badge>,
    ariaLabel: createLabelFunction('Priority'),
    sortingField: 'priority',
    width: 150,
  },
  {
    id: 'stride',
    header: 'STRIDE',
    cell: item => item.metadata?.find(m => m.key === 'STRIDE')?.value.join(','),
    ariaLabel: createLabelFunction('STRIDE'),
    sortingField: 'stride',
    width: 150,
  },
];

export const paginationLabels = {
  nextPageLabel: 'Next page',
  pageLabel: pageNumber => `Go to page ${pageNumber}`,
  previousPageLabel: 'Previous page',
};

const pageSizePreference = {
  title: 'Select page size',
  options: [
    { value: 10, label: '10 rows' },
    { value: 20, label: '20 rows' },
    { value: 100, label: '100 rows' },
    { value: 1000, label: '1000 rows' },
  ],
};

const visibleContentPreference = {
  title: 'Select visible content',
  options: [
    {
      label: 'Main properties',
      options: columnDefinitions.map(({ id, header }) => ({ id, label: header, editable: id !== 'id' })),
    },
  ],
};
export const collectionPreferencesProps = {
  pageSizePreference,
  visibleContentPreference,
  cancelLabel: 'Cancel',
  confirmLabel: 'Confirm',
  title: 'Preferences',
};
