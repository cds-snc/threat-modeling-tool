import { memo, useEffect, useState } from 'react';
import {
  Modal,
  Header,
  Alert,
  Box,
  Table,
  SpaceBetween,
  Button,
} from '@cloudscape-design/components';

import OpenAI from 'openai';
import { v4 } from 'uuid';

import { useThreatsContext } from '../../../contexts/ThreatsContext/context';

const prompt = () => {
  return `You are an assitant helping to generate threat statements based on the STRIDE threat modeling framework. Threat statements are structured in a using a specific grammar. The grammar we are using is as follows: [threat source] [prerequisites] can [threat action] which leads to [threat impact], negatively impacting [impacted assets]. We are also using a data flow diagram to help generate these statements. I will provide you with information about the impacted asset in a json format, which is described either as an actor, a process, a datastore, or an edge linking any of those elements. I will also provide you with additional information about the impacted asset such as data features, technology features, security features, and tags. Based on this information and the general context of the diagram, you will generate a threat statement. Please ensure the statement follows the grammar provided. You do not need to include [] in the statement. Ensure that the threat statement you return makes logical sense in the context of threat modeling. Please always return one threat statement in a JSON array of objects that follow this structure: {threatSource: '', prerequisites: '', threatAction: '', threatImpact: '', impactedGoal: [], impactedAssets: [], statement: '', displayedStatement: []}.  For example, assume you generate a threat statement as follows:
  
  A threat actor with access to logs can access sensitive data that was not excluded or redacted, which leads to the ability to modify data, resulting in reduced confidentiality of file upload, file listing, upload status, uploaded files and authentication tokens

  You would return:

  [{"statement":"An external threat actor who is authenticated and authorized can flood the legitimate user's internet link, which leads to unnecessary and excessive costs, resulting in reduced availability of billing","threatSource":"external threat actor","prerequisites":"who is authenticated and authorized","displayedStatement":["An ",{"type":"span","content":"external threat actor","tooltip":"threat source"}," ",{"type":"span","content":"who is authenticated and authorized","tooltip":"prerequisites"}," can ",{"type":"b","content":"flood the legitimate user's internet link","tooltip":"threat action"},", which leads to ",{"type":"span","content":"unnecessary and excessive costs","tooltip":"threat impact"},", resulting in reduced ",{"type":"span","content":"availability","tooltip":"impacted goal"}," of ",{"type":"span","content":"billing","tooltip":"impacted assets"}],"threatAction":"flood the legitimate user's internet link","threatImpact":"unnecessary and excessive costs","impactedAssets":["billing"],"impactedGoal":["availability"]}]

  ONLY RETURN VALID JSON THAT IS PARSEABLE BY A JAVASCRIPT JSON PARSER. DO NOT INCLUDE \`\`\`json TAGS IN YOUR RESPONSE. DO NOT INCLUDE ANYTHING OTHER THAN THE JSON ARRAY OF OBJECTS.
  `;
};

export default memo(({ visible, setVisible, data, flow, apiKey }: { visible: boolean; setVisible: any; data: any; flow: any; apiKey: any }) => {

  const [loading, setLoading] = useState(false);
  const [threats, setThreats] = useState([]);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState<{ statement: string }[]>([]);

  const { saveStatement } = useThreatsContext();

  useEffect(() => {
    if (visible) {
      const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });
      setError(null);
      setLoading(true);
      openai.chat.completions.create({
        messages: [
          { role: 'system', content: prompt() },
          { role: 'assistant', content: 'Generate a threat statement for the impacted asset.' },
          { role: 'user', content: `Here is the information about the impacted asset in json format: ${JSON.stringify(data)} Here is the data flow diagram in json format: ${JSON.stringify(flow)}` },
        ],
        model: 'gpt-4-turbo-preview',
      }).then((response) => {
        let content = response.choices[0].message.content || '[]';
        setThreats(JSON.parse(content).map((item) => ({ id: v4(), ...item })) || []);
        setLoading(false);
        return response;
      }).catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    };
  }, [visible, apiKey, data, flow]);

  const saveSuggestedThreats = () => {
    selectedItems.forEach((item) => {
      let s = {
        id: v4(),
        numericId: -1,
        ...item,
      };
      saveStatement(s);
    });
    setVisible(false);
  };


  return <Modal
    header={<Header>AI generated threat statements</Header>}
    visible={visible}
    onDismiss={() => setVisible(false)}
    size='large'
    footer={
      <Box float="right">
        <SpaceBetween direction="horizontal" size="xs">
          <Button variant="link" onClick={() => setVisible(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => saveSuggestedThreats()}>Add selected statements</Button>
        </SpaceBetween>
      </Box>}
  >
    {(error ? <Alert
      statusIconAriaLabel='Error'
      type='error'
      header='There was an error calling the API'>
      {error}
    </Alert> :
      <Table
        columnDefinitions={[{ id: 'statement', header: 'Statement', cell: (item: { id: number; statement: string }) => item.statement || '-' }]}
        enableKeyboardNavigation
        items={threats}
        loading={loading}
        loadingText='Loading statements...'
        sortingDisabled
        trackBy="id"
        variant='embedded'
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
        selectionType="multi"
        empty={<Box margin={{ vertical: 'xs' }} textAlign='center' color='inherit'></Box>}
        wrapLines />
    )}
  </Modal>;
});