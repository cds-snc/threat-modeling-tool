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
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Form from '@cloudscape-design/components/form';
import FormField from '@cloudscape-design/components/form-field';
import Textarea from '@cloudscape-design/components/textarea';
import Checkbox from '@cloudscape-design/components/checkbox';

export default function PropertiesPanel(props) {
  //console.log('clickedObjectProperties ', props);
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
              placeholder="reason for out of scope"
              rows={2} />
          </FormField>
        </ColumnLayout>
      </Form>
    </form>
  );
}