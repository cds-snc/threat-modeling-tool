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

//import * as React from 'react';
import { ColumnLayout, Form, FormField, Textarea, Checkbox, TagEditor, ExpandableSection, Multiselect } from '@cloudscape-design/components';
import { dataFeaturesOptions, securityFeaturesOptions, techFeaturesOptions } from './panel-config';
//import { OptionDefinition } from '@cloudscape-design/components/internal/components/option/interfaces';

export default function PropertiesPanel(props) {
  function handleNameChange(event) {
    props.onChangeName(event.detail.value);
  };
  function handleDescriptionChange(event) {
    props.onChangeDescription(event.detail.value);
  };
  function handleOutOfScopeChange(event) {
    props.onChangeOutOfScope(event.detail.checked);
  };
  function handleOutOfScopeReasonChange(event) {
    props.onChangeOutOfScopeReason(event.detail.value);
  };
  function handleTagsChange(event) {
    props.onChangeTags(event.detail.tags);
  };
  function handleDataFeaturesChange(event) {
    props.onChangeDataFeatures(event.detail.selectedOptions);
  };
  function handleTechFeaturesChange(event) {
    props.onChangeTechFeatures(event.detail.selectedOptions);
  };
  function handleSecurityFeaturesChange(event) {
    props.onChangeSecurityFeatures(event.detail.selectedOptions);
  };

  return (
    <form onSubmit={e => e.preventDefault()} >
      <Form
        variant="embedded" >
        <ColumnLayout
          borders="vertical"
          columns={3}
          variant="text-grid" >
          <FormField
            label="name"
            stretch={true} >
            <Textarea
              value={props.name}
              onChange={handleNameChange}
              placeholder="name"
              rows={3} />
          </FormField>
          <FormField
            label="description"
            stretch={true} >
            <Textarea
              value={props.description}
              onChange={handleDescriptionChange}
              placeholder="description"
              rows={3} />
          </FormField>
          <FormField
            label="scope"
            stretch={true} >
            <Checkbox
              checked={props.outOfScope}
              onChange={handleOutOfScopeChange}
            >
            out of scope
            </Checkbox>
            <Textarea
              value={props.outOfScopeReason}
              onChange={handleOutOfScopeReasonChange}
              placeholder="a kind reminder for future-you"
              rows={2} />
          </FormField>
        </ColumnLayout>
        <ColumnLayout
          borders="vertical"
          columns={3}
          variant="text-grid" >
          <Multiselect
            selectedOptions={props.dataFeatures}
            onChange={handleDataFeaturesChange}
            placeholder='Data features that apply to selected component'
            tokenLimit={3} // number of visible selected options
            disabled={props.outOfScope}
            options={dataFeaturesOptions(props.type)}
          />
          <Multiselect
            selectedOptions={props.techFeatures}
            onChange={handleTechFeaturesChange}
            placeholder='Tech features that apply to selected component'
            tokenLimit={3} // number of visible selected options
            disabled={props.outOfScope}
            options={techFeaturesOptions(props.type)}
          />
          <Multiselect
            selectedOptions={props.securityFeatures}
            onChange={handleSecurityFeaturesChange}
            placeholder='Security features that apply to selected component'
            tokenLimit={3} // number of visible selected options
            disabled={props.outOfScope}
            options={securityFeaturesOptions(props.type)}
          />
        </ColumnLayout>
        <ColumnLayout
          borders="vertical"
          columns={1}
          variant="text-grid" >
          <ExpandableSection headerText={`Tags (${props.tags?.length || 0})`}>
            <TagEditor
              i18nStrings={{
                tagLimit: (availableTags, tagLimit) =>
                  availableTags === tagLimit
                    ? 'You can add up to ' + tagLimit + ' tags.'
                    : availableTags === 1
                      ? 'You can add up to 1 more tag.'
                      : 'You can add up to ' + availableTags + ' more tags.',
                keyHeader: 'Key',
                valueHeader: 'Value (optional)',
                addButton: 'Add new tag',
                removeButton: 'Remove',
                keyPlaceholder: 'Enter key',
                valuePlaceholder: 'Enter value',
                emptyKeyError: 'You must specify a tag key',
              }}
              tags={props.tags}
              onChange={handleTagsChange}
              tagLimit={5}
            />
          </ExpandableSection>
        </ColumnLayout>
      </Form>
    </form>
  );
}