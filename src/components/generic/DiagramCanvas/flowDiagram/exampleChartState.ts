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
import { IChart } from '../flowDiagram/types';

//let str: string = '{"offset":{"x":-1948,"y":-901,"deltaX":-2,"deltaY":0,"lastX":-1946,"lastY":-901},"nodes":{"6e87da0f-6f8e-406d-8515-1fa159a5b9c0":{"id":"6e87da0f-6f8e-406d-8515-1fa159a5b9c0","position":{"x":2719,"y":1251,"deltaX":0,"deltaY":-1,"lastX":2719,"lastY":1252},"orientation":0,"type":"process-queue","ports":{"port1":{"id":"port1","type":"top","position":{"x":100,"y":-2}},"port2":{"id":"port2","type":"right","position":{"x":202,"y":60}},"port3":{"id":"port3","type":"bottom","position":{"x":100,"y":122}},"port4":{"id":"port4","type":"left","position":{"x":-2,"y":60}}},"properties":{"name":"Queue","Id":"002"},"size":{"width":200,"height":120}},"df45278c-3e6f-4dd3-b3fe-902893fc4a67":{"id":"df45278c-3e6f-4dd3-b3fe-902893fc4a67","position":{"x":2243,"y":1067,"deltaX":2,"deltaY":0,"lastX":2241,"lastY":1067},"orientation":0,"type":"start","ports":{"port1":{"id":"port1","type":"left","position":{"x":-2,"y":50}},"port2":{"id":"port2","type":"right","position":{"x":102,"y":50}},"port3":{"id":"port3","type":"top","position":{"x":50,"y":-2}},"port4":{"id":"port4","type":"bottom","position":{"x":50,"y":102}}},"properties":{"name":"Start Point","Id":"001"},"size":{"width":100,"height":100}}},"links":{"e5b5ba54-084b-4ef2-b667-4297a6559f24":{"id":"e5b5ba54-084b-4ef2-b667-4297a6559f24","from":{"nodeId":"df45278c-3e6f-4dd3-b3fe-902893fc4a67","portId":"port1"},"to":{"nodeId":"6e87da0f-6f8e-406d-8515-1fa159a5b9c0","portId":"port3"},"properties":{"label":"Left Bottom 002"}}},"selected":{},"hovered":{"type":"link","id":"6a138303-37e9-40ae-8d49-ac1fb3dc2c7c"},"preNodes":["6e87da0f-6f8e-406d-8515-1fa159a5b9c0","df45278c-3e6f-4dd3-b3fe-902893fc4a67"],"isModelShow":false,"nodeName":"","nodeId":"","newNodeId":"","preLinks":["e5b5ba54-084b-4ef2-b667-4297a6559f24"],"showModelName":"newLinkModel","linkLabel":"Left Bottom 002","newLinkId":"e5b5ba54-084b-4ef2-b667-4297a6559f24","clickNodeId":"","modelOption":"addNode"}';
let str: string = '{"offset":{"x":-1922,"y":-935,"deltaX":1,"deltaY":0,"lastX":-1923,"lastY":-935},"nodes":{"49e45740-27a3-4b78-8eca-01f30f94ccf9":{"id":"49e45740-27a3-4b78-8eca-01f30f94ccf9","position":{"x":1957.84375,"y":967,"deltaX":0,"deltaY":1,"lastX":1957.84375,"lastY":966},"orientation":0,"type":"process-point","ports":{"port1":{"id":"port1","type":"top"},"port2":{"id":"port2","type":"right"},"port3":{"id":"port3","type":"bottom"},"port4":{"id":"port4","type":"left"}},"properties":{"name":"Web browser","Id":"Web browser","nodeRole":"","description":"Web browser","dataFeatures":[{"label":"Processed","value":"cd_processed","description":"This component processes customer data"}],"techFeatures":[{"label":"React","value":"ff_react","description":"This component uses React"}],"threats":[{"id":"a394f5d6-9479-40cc-ae88-b1911a269f0a"}]},"size":{"width":124,"height":64}},"2bfff1f2-41c0-48c2-b04b-f0f335fdd149":{"id":"2bfff1f2-41c0-48c2-b04b-f0f335fdd149","position":{"x":2223.84375,"y":1102,"deltaX":1,"deltaY":0,"lastX":2222.84375,"lastY":1102},"orientation":0,"type":"start","ports":{"port1":{"id":"port1","type":"left"},"port2":{"id":"port2","type":"right"},"port3":{"id":"port3","type":"top"},"port4":{"id":"port4","type":"bottom"}},"properties":{"name":"Web application","Id":"Web application","nodeRole":"","description":"Web application","dataFeatures":[{"label":"Processed","value":"cd_processed","description":"This component processes customer data"},{"label":"Processed","value":"pii_processed","description":"This component processes PII"},{"label":"JSON","value":"df_json","description":"Text-based data format","labelTag":"human-readable"}],"techFeatures":[{"label":"Python","value":"lan_python","description":"This component uses Python"},{"label":"Serverless","value":"ts_serverless","description":"This component uses serverless computing"},{"label":"Django","value":"bf_django","description":"This component uses Django (Python)"}],"securityFeatures":[{"label":"OpenID","value":"authn_openid","description":"This component uses OpenID"},{"label":"OAuth 2.0","value":"authz_oauth","description":"This component uses OAuth 2.0"},{"label":"Implements session management","value":"ssm_session","description":"This component implements session management"}],"threats":[{"id":"782adefc-b480-4e8f-83ee-64f6d680df0a"},{"id":"a0f523b0-bbc0-4e6a-9064-500af1f3836e"},{"id":"99648023-86fe-4b7d-829a-7011be545fa4"},{"id":"6529dd8d-0b40-4eec-b4c4-5ee4f06619c0"},{"id":"1649e8e4-f100-45f2-8c13-51dafc8a8251"},{"id":"fec8777c-68b3-4569-84ce-9b9b1b9f5e9c"},{"id":"0a264de2-c2e5-45c0-9075-0d437b9defa0"},{"id":"7820db4a-1043-4dfa-bbc2-59774bb1f2fc"}]},"size":{"width":104,"height":104}},"6fefe7d1-0fda-422b-b2fe-31fa142a2542":{"id":"6fefe7d1-0fda-422b-b2fe-31fa142a2542","position":{"x":2217.84375,"y":1337,"deltaX":1,"deltaY":0,"lastX":2216.84375,"lastY":1337},"orientation":0,"type":"end","ports":{"port1":{"id":"port1","type":"left"},"port2":{"id":"port2","type":"right"},"port3":{"id":"port3","type":"top"},"port4":{"id":"port4","type":"bottom"}},"properties":{"name":"Application configuration","Id":"Application logs datastore","nodeRole":"","description":"Application configuration datastore","dataFeatures":[{"label":"Stored","value":"cd_stored","description":"This component stores customer data"},{"label":"Data is encrypted at rest","value":"lce_data_encrypted_at_rest","description":"This component uses encryption at rest"},{"label":"Stores credentials","value":"lce_store_credentials","description":"This component stores credentials"}],"techFeatures":[{"label":"PostgresSQL","value":"dsq_postgres","description":"This component uses PostgresSQL"}],"securityFeatures":[{"label":"Other","value":"authn_other","description":"This component uses other authentication standard"}]},"size":{"width":124,"height":68}},"eaf82c04-3443-43df-85e6-d6eb8cc63ea4":{"id":"eaf82c04-3443-43df-85e6-d6eb8cc63ea4","position":{"x":2838.84375,"y":1036,"deltaX":1,"deltaY":-1,"lastX":2837.84375,"lastY":1037},"orientation":0,"type":"end","ports":{"port1":{"id":"port1","type":"left"},"port2":{"id":"port2","type":"right"},"port3":{"id":"port3","type":"top"},"port4":{"id":"port4","type":"bottom"}},"properties":{"name":"Message broker logs","Id":"Message broker logs datastore","nodeRole":"","description":"Message broker logs datastore","dataFeatures":[{"label":"Store logs","value":"lce_store_logs","description":"This component stores logs"},{"label":"Data is encrypted at rest","value":"lce_data_encrypted_at_rest","description":"This component uses encryption at rest"}],"techFeatures":[{"label":"PostgresSQL","value":"dsq_postgres","description":"This component uses PostgresSQL"}],"securityFeatures":[{"label":"Other","value":"authn_other","description":"This component uses other authentication standard"}],"threats":[{"id":"a0f523b0-bbc0-4e6a-9064-500af1f3836e"},{"id":"6529dd8d-0b40-4eec-b4c4-5ee4f06619c0"},{"id":"1649e8e4-f100-45f2-8c13-51dafc8a8251"},{"id":"fec8777c-68b3-4569-84ce-9b9b1b9f5e9c"},{"id":"0a264de2-c2e5-45c0-9075-0d437b9defa0"},{"id":"7820db4a-1043-4dfa-bbc2-59774bb1f2fc"},{"id":"19b98451-70ee-4814-af80-c1293b90cb9f"},{"id":"cbba3276-5ce2-47e0-bc77-aebc162c519f"},{"id":"2ffb1f47-743e-4cbc-94e6-62d10817acc0"},{"id":"6fb7ef9a-175d-49f1-b85b-652b668581d4"}]},"size":{"width":120,"height":68}},"9539cd25-dc00-40da-9670-ad24b520032e":{"id":"9539cd25-dc00-40da-9670-ad24b520032e","position":{"x":2542.84375,"y":1020,"deltaX":0,"deltaY":1,"lastX":2542.84375,"lastY":1019},"orientation":0,"type":"start","ports":{"port1":{"id":"port1","type":"left"},"port2":{"id":"port2","type":"right"},"port3":{"id":"port3","type":"top"},"port4":{"id":"port4","type":"bottom"}},"properties":{"name":"Messaging bus","Id":"Message broker process","nodeRole":"","description":"Message broker process","dataFeatures":[{"label":"Processed","value":"cd_processed","description":"This component processes customer data"},{"label":"JSON","value":"df_json","description":"Text-based data format","labelTag":"human-readable"}],"techFeatures":[{"label":"Serverless","value":"ts_serverless","description":"This component uses serverless computing"},{"label":"Java","value":"lan_java","description":"This component uses Java"},{"label":"Spring","value":"bf_spring","description":"This component uses Spring (Java)"},{"label":"Third-party software","value":"of_3rdparty","description":"This component uses third-party software"}],"securityFeatures":[{"label":"OAuth 2.0","value":"authz_oauth","description":"This component uses OAuth 2.0"}],"threats":[{"id":"782adefc-b480-4e8f-83ee-64f6d680df0a"},{"id":"7b49bdbd-25e9-446f-b44a-46fa2807e182"},{"id":"99648023-86fe-4b7d-829a-7011be545fa4"}]},"size":{"width":104,"height":104}}},"links":{"efe1b630-6671-4ff0-a5c4-781bafcc8250":{"id":"efe1b630-6671-4ff0-a5c4-781bafcc8250","from":{"nodeId":"49e45740-27a3-4b78-8eca-01f30f94ccf9","portId":"port2"},"to":{"nodeId":"2bfff1f2-41c0-48c2-b04b-f0f335fdd149","portId":"port3"},"properties":{"label":"HTTPS Request"}},"94f0d3e1-2044-4037-bcd2-ec9ceb6145e1":{"id":"94f0d3e1-2044-4037-bcd2-ec9ceb6145e1","from":{"nodeId":"2bfff1f2-41c0-48c2-b04b-f0f335fdd149","portId":"port1"},"to":{"nodeId":"49e45740-27a3-4b78-8eca-01f30f94ccf9","portId":"port3"},"properties":{"label":"HTTPS Response"}},"8c666048-def6-47f5-a557-326808e3c578":{"id":"8c666048-def6-47f5-a557-326808e3c578","from":{"nodeId":"2bfff1f2-41c0-48c2-b04b-f0f335fdd149","portId":"port4"},"to":{"nodeId":"6fefe7d1-0fda-422b-b2fe-31fa142a2542","portId":"port3"},"properties":{"label":"set"}},"49b6b0e1-edbf-45fc-8c20-d0002e3e08f0":{"id":"49b6b0e1-edbf-45fc-8c20-d0002e3e08f0","from":{"nodeId":"6fefe7d1-0fda-422b-b2fe-31fa142a2542","portId":"port2"},"to":{"nodeId":"2bfff1f2-41c0-48c2-b04b-f0f335fdd149","portId":"port2"},"properties":{"label":"get"}},"d72b35d5-1ab4-45f9-ae9c-66f8b315980b":{"id":"d72b35d5-1ab4-45f9-ae9c-66f8b315980b","from":{"nodeId":"2bfff1f2-41c0-48c2-b04b-f0f335fdd149","portId":"port2"},"to":{"nodeId":"9539cd25-dc00-40da-9670-ad24b520032e","portId":"port1"},"properties":{"label":"messages"}},"9aeac824-1e5f-43ba-9b21-dc768eb3a3ca":{"id":"9aeac824-1e5f-43ba-9b21-dc768eb3a3ca","from":{"nodeId":"9539cd25-dc00-40da-9670-ad24b520032e","portId":"port4"},"to":{"nodeId":"2bfff1f2-41c0-48c2-b04b-f0f335fdd149","portId":"port2"},"properties":{"label":"message response"}},"27a28673-25af-4554-b234-4948f33f74c7":{"id":"27a28673-25af-4554-b234-4948f33f74c7","from":{"nodeId":"9539cd25-dc00-40da-9670-ad24b520032e","portId":"port2"},"to":{"nodeId":"eaf82c04-3443-43df-85e6-d6eb8cc63ea4","portId":"port1"},"properties":{"label":"set"}}},"selected":{"type":"node","id":"6fefe7d1-0fda-422b-b2fe-31fa142a2542"},"hovered":{"type":"link","id":"c96f97ce-db7b-425e-bd0b-9a19007ffebe"},"preNodes":["49e45740-27a3-4b78-8eca-01f30f94ccf9","2bfff1f2-41c0-48c2-b04b-f0f335fdd149","6fefe7d1-0fda-422b-b2fe-31fa142a2542","eaf82c04-3443-43df-85e6-d6eb8cc63ea4","9539cd25-dc00-40da-9670-ad24b520032e"],"isModelShow":false,"nodeName":"","nodeId":"","newNodeId":"9539cd25-dc00-40da-9670-ad24b520032e","preLinks":["efe1b630-6671-4ff0-a5c4-781bafcc8250","94f0d3e1-2044-4037-bcd2-ec9ceb6145e1","8c666048-def6-47f5-a557-326808e3c578","49b6b0e1-edbf-45fc-8c20-d0002e3e08f0","d72b35d5-1ab4-45f9-ae9c-66f8b315980b","9aeac824-1e5f-43ba-9b21-dc768eb3a3ca","27a28673-25af-4554-b234-4948f33f74c7"],"showModelName":"newLinkModel","linkLabel":"","newLinkId":"27a28673-25af-4554-b234-4948f33f74c7","clickNodeId":"6fefe7d1-0fda-422b-b2fe-31fa142a2542","modelOption":"addLabel","nodeRoleOption":"","clickLinkId":"","alertMessageInfo":"Please input the node name!","alertMessageStatus":"hide","nodeDescription":"","nodeOutOfScope":false,"nodeOutOfScopeReason":"","threats":[],"tags":[],"dataFeatures":[],"techFeatures":[],"securityFeatures":[]}';
export const chartSimple: IChart = JSON.parse(str);