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
import { PropertyFilterProperty } from '@cloudscape-design/collection-hooks';
import { Link, Badge, FormField, Checkbox, RadioGroup } from '@cloudscape-design/components';

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
    header: 'id',
    cell: item => <Link href={`#${item.id}`}>{item.id}</Link>,
    ariaLabel: createLabelFunction('id'),
    sortingField: 'id',
    isRowHeader: false,
  },
  {
    id: 'statement',
    header: 'statement',
    cell: item => item.statement,
    ariaLabel: createLabelFunction('Threat'),
    sortingField: 'statement',
  },
  {
    id: 'priority',
    header: 'priority',
    cell: item => <Badge color={item.priority === 'High' ? 'red' : item.priority === 'Medium' ? 'blue' : item.priority ==='Low' ? 'green':'grey'}>{item.priority || 'Priority Not Set'}</Badge>,
    ariaLabel: createLabelFunction('Priority'),
    sortingField: 'priority',
    width: 150,
  },
  {
    id: 'stride',
    header: 'stride',
    cell: item => item.stride,
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

export const filteringConstants = {
  filteringAriaLabel: 'Filter threats',
  dismissAriaLabel: 'Dismiss',
  clearAriaLabel: 'Clear',

  filteringPlaceholder: 'Filter threats by statement, priority or STRIDE category',
  groupValuesText: 'Values',
  groupPropertiesText: 'Properties',
  operatorsText: 'Operators',

  operationAndText: 'and',
  operationOrText: 'or',

  operatorLessText: 'Less than',
  operatorLessOrEqualText: 'Less than or equal',
  operatorGreaterText: 'Greater than',
  operatorGreaterOrEqualText: 'Greater than or equal',
  operatorContainsText: 'Contains',
  operatorDoesNotContainText: 'Does not contain',
  operatorEqualsText: 'Equals',
  operatorDoesNotEqualText: 'Does not equal',

  editTokenHeader: 'Edit filter',
  propertyText: 'Property',
  operatorText: 'Operator',
  valueText: 'Value',
  cancelActionText: 'Cancel',
  applyActionText: 'Apply',
  allPropertiesLabel: 'All properties',

  tokenLimitShowMore: 'Show more',
  tokenLimitShowFewer: 'Show fewer',
  clearFiltersText: 'Clear filters',
  removeTokenButtonAriaLabel: (token) =>
    `Remove token ${token.propertyKey} ${token.operator} ${token.value}`,
  enteredTextLabel: (text) => `Use: "${text}"`,
};

export const filteringProperties:PropertyFilterProperty<any>[] = [
  {
    propertyLabel: 'statement',
    key: 'statement',
    groupValuesLabel: 'statement',
    operators: [':', '!:', '=', '!='],
  },
  {
    propertyLabel: 'priority',
    key: 'priority',
    groupValuesLabel: 'priority',
    operators: [
      {
        operator: '=',
        form: ({ value, onChange }) => {
          const categories = [
            'Low',
            'Medium',
            'High',
          ].map(val => ({ value: val, label: val }));
          return (
            <FormField>
              <RadioGroup
                onChange={({ detail }) => onChange(detail.value)}
                value={value}
                items={categories}
              />
            </FormField>
          );
        },
      },
    ],
  },
  {
    propertyLabel: 'stride',
    key: 'stride',
    groupValuesLabel: 'stride',
    operators: [
      {
        operator: '=',
        form: ({ value, onChange }) => {
          const categories = [
            'S',
            'T',
            'R',
            'I',
            'D',
            'E',
            'LM',
          ].map(val => ({ val, label: val }));
          return (
            <FormField>
              {categories.map((option, i) => (
                <Checkbox
                  key={i}
                  checked={(value || []).includes(
                    option.val,
                  )}
                  onChange={event => {
                    const newValue = [
                      ...(value || []),
                    ];
                    if (event.detail.checked) {
                      newValue.push(option.val);
                    } else {
                      newValue.splice(newValue.indexOf(option.val), 1);
                    }
                    onChange(newValue.sort());
                  }}
                >
                  {option.val}
                </Checkbox>
              ))}
            </FormField>
          );
        },
        format: values => (values || []).join(','),
      },
    ],
  },
];