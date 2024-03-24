import { memo, useEffect, useState } from 'react';

import { ColumnLayout, Form, FormField, Textarea, Checkbox, TagEditor, ExpandableSection, Multiselect } from '@cloudscape-design/components';
import { dataFeaturesOptions, securityFeaturesOptions, techFeaturesOptions } from './panel-config';

export default memo(({ component, changeHandler }: { component: any; changeHandler: any } ) => {

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

  return (
    <form onSubmit={e => e.preventDefault()} key={component?.id} >
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
              value={data.name || ''}
              onChange={e => updateData('name', e.detail?.value, '')}
              placeholder='name'
              rows={3} />
          </FormField>
          <FormField
            label="description"
            stretch={true} >
            <Textarea
              value={data.description || ''}
              onChange={e => updateData('description', e.detail?.value, '')}
              placeholder="description"
              rows={3} />
          </FormField>
          <FormField
            label="scope"
            stretch={true} >
            <Checkbox
              checked={data?.outOfScope || false}
              onChange={e => updateData('outOfScope', e.detail?.checked, false)}
            >
            out of scope
            </Checkbox>
            <Textarea
              value={data.scopeReason || ''}
              onChange={e => updateData('scopeReason', e.detail?.value, '')}
              placeholder="a kind reminder for future-you"
              rows={2} />
          </FormField>
        </ColumnLayout>
        <ColumnLayout
          borders="vertical"
          columns={3}
          variant="text-grid" >
          <Multiselect
            selectedOptions={data?.dataTags || []}
            placeholder='Data features that apply to selected component'
            tokenLimit={3} // number of visible selected options
            disabled={data?.outOfScope || false}
            options={dataFeaturesOptions(component?.type)}
            onChange={e => updateData('dataTags', e.detail?.selectedOptions, [])}
          />
          <Multiselect
            selectedOptions={data?.techTags || []}
            placeholder='Tech features that apply to selected component'
            tokenLimit={3} // number of visible selected options
            disabled={data?.outOfScope || false}
            options={techFeaturesOptions(component?.type)}
            onChange={e => updateData('techTags', e.detail?.selectedOptions, [])}
          />
          <Multiselect
            selectedOptions={data?.securityTags || []}
            placeholder='Security features that apply to selected component'
            tokenLimit={3} // number of visible selected options
            disabled={data?.outOfScope || false}
            options={securityFeaturesOptions(component?.type)}
            onChange={e => updateData('securityTags', e.detail?.selectedOptions, [])}
          />
        </ColumnLayout>
        <ColumnLayout
          borders="vertical"
          columns={1}
          variant="text-grid" >
          <ExpandableSection headerText={`Tags (${data.tags?.length || 0})`}>
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
              tags={data.tags}
              onChange={e => updateData('tags', e.detail?.tags, [])}
              tagLimit={5}
            />
          </ExpandableSection>
        </ColumnLayout>
      </Form>
    </form>
  );
});