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

import Autosuggest from '@cloudscape-design/components/autosuggest';
import ExpandableSection, { ExpandableSectionProps } from '@cloudscape-design/components/expandable-section';
import TokenGroup from '@cloudscape-design/components/token-group';
import React, { FC, useMemo } from 'react';
import { Control } from '../../../customTypes';

export interface ControlLinkProps {
  variant?: ExpandableSectionProps['variant'];
  linkedControlIds: string[];
  controlList: Control[];
  onAddControlLink: (controlId: string) => void;
  onRemoveControlLink: (controlId: string) => void;
}

const ControlLinkComponent: FC<ControlLinkProps> = ({
  variant,
  linkedControlIds,
  controlList,
  onAddControlLink,
  onRemoveControlLink,
}) => {
  const [searchValue, setSearchValue] = React.useState('');

  const linkedControls = useMemo(() => {
    return controlList.filter(al => linkedControlIds.includes(al.id));
  }, [linkedControlIds, controlList]);

  const filteredControls = useMemo(() => {
    const controls = controlList.filter(x => !linkedControlIds.includes(x.id));

    if (!searchValue) {
      return controls;
    }

    return controls.filter(x => x.content.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0);
  }, [searchValue, controlList, linkedControlIds]);

  return (<ExpandableSection
    variant={variant}
    headingTagOverride={variant === 'container' ? 'h3' : undefined}
    headerText={`Linked controls (${linkedControls.length})`}>
    <Autosuggest
      onChange={({ detail }) => setSearchValue(detail.value)}
      value={searchValue}
      options={filteredControls.map(x => ({
        value: x.id,
        label: x.content,
      }))}
      onSelect={({ detail }) => {
        onAddControlLink(detail.value);
        setSearchValue('');
      }}
      filteringType='manual'
      enteredTextLabel={value => `Add new control: "${value}"`}
      placeholder="Search control"
      empty="No matches found"
    />
    <div
      style={{
        display: 'flex',
      }}
    >
      <TokenGroup
        items={
          linkedControls.map(x => ({
            label: x.content,
            dismissLabel: `Unlink control ${x.numericId}`,
          }))
        }
        onDismiss={({ detail: { itemIndex } }) => {
          onRemoveControlLink(linkedControls[itemIndex].id);
        }}
      />
    </div>
  </ExpandableSection>);
};

export default ControlLinkComponent;