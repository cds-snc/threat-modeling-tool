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

import * as React from 'react';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Form from '@cloudscape-design/components/form';
import FormField from '@cloudscape-design/components/form-field';
//import Input from '@cloudscape-design/components/input';
import Textarea from '@cloudscape-design/components/textarea';
import Checkbox from '@cloudscape-design/components/checkbox';

export default function PropertiesPanel({ clickedObjectProperties }) {
  console.log('clickedObjectProperties ', clickedObjectProperties);
  const [name, setName] = React.useState(clickedObjectProperties?.id);
  const [description, setDescription] = React.useState('');
  const [outOfScope, setOutOfScope] = React.useState(false);
  const [outOfScopeReason, setOutOfScopeReason] = React.useState('');
  return (
    <form onSubmit={e => e.preventDefault()} >
      <Form
        variant="embedded" >
        <ColumnLayout
          borders="vertical"
          columns={3}
          variant="text-grid" >
          <FormField
            label="Name"
            stretch={true} >
            <Textarea
              value={name}
              onChange={({ detail }) => setName(detail.value)}
              placeholder="Name"
              rows={3} />
          </FormField>
          <FormField
            label="Description"
            stretch={true} >
            <Textarea
              value={description}
              onChange={({ detail }) => setDescription(detail.value)}
              placeholder="Description"
              rows={3} />
          </FormField>
          <FormField
            label="Scope"
            stretch={true} >
            <Checkbox
              checked={outOfScope}
              onChange={({ detail }) => setOutOfScope(detail.checked)} >
                    Out of scope
            </Checkbox>
            <Textarea
              value={outOfScopeReason}
              onChange={({ detail }) => setOutOfScopeReason(detail.value)}
              placeholder="Reason for out of scope"
              rows={2} />
          </FormField>
        </ColumnLayout>
      </Form>
    </form>
  );
}