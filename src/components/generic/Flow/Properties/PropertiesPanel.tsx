import { memo, useState } from 'react';

import { ColumnLayout, Form, FormField, Textarea, Checkbox, Multiselect } from '@cloudscape-design/components';
//import { dataFeaturesOptions, securityFeaturesOptions, techFeaturesOptions } from './panel-config';

export default memo(({ component, changeHandler }: { component: any; changeHandler: any } ) => {

  const [name, setName] = useState(component?.data.name);


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
              value={name || ''}
              onChange={e => {
                setName(e.detail?.value || '');
                changeHandler({ name: e.detail?.value || '' });
              }}
              rows={3} />
          </FormField>
          <FormField
            label="description"
            stretch={true} >
            <Textarea
              value=""
              placeholder="description"
              rows={3} />
          </FormField>
          <FormField
            label="scope"
            stretch={true} >
            <Checkbox
              checked={false}
            >
            out of scope
            </Checkbox>
            <Textarea
              value=""
              placeholder="a kind reminder for future-you"
              rows={2} />
          </FormField>
        </ColumnLayout>
        <ColumnLayout
          borders="vertical"
          columns={3}
          variant="text-grid" >
          <Multiselect
            selectedOptions={[]}
            placeholder='Data features that apply to selected component'
            tokenLimit={3} // number of visible selected options
          />
          <Multiselect
            selectedOptions={[]}
            placeholder='Tech features that apply to selected component'
            tokenLimit={3} // number of visible selected options
          />
          <Multiselect
            selectedOptions={[]}
            placeholder='Security features that apply to selected component'
            tokenLimit={3} // number of visible selected options
          />
        </ColumnLayout>
      </Form>
    </form>
  );
});