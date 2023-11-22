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
let str: string = '{"offset":{"x":-1922,"y":-935,"deltaX":1,"deltaY":0,"lastX":-1923,"lastY":-935},"nodes":{"49e45740-27a3-4b78-8eca-01f30f94ccf9":{"id":"49e45740-27a3-4b78-8eca-01f30f94ccf9","position":{"x":2161.84375,"y":1167,"deltaX":-1,"deltaY":0,"lastX":2162.84375,"lastY":1167},"orientation":0,"type":"process-point","ports":{"port1":{"id":"port1","type":"top"},"port2":{"id":"port2","type":"right"},"port3":{"id":"port3","type":"bottom"},"port4":{"id":"port4","type":"left"}},"properties":{"name":"Web browser","Id":"Web browser","nodeRole":"","description":"Web browser","dataFeatures":[{"label":"Processed","value":"cd_processed","description":"This component processes customer data"}],"techFeatures":[{"label":"React","value":"ff_react","description":"This component uses React"}],"threats":[{"id":"a394f5d6-9479-40cc-ae88-b1911a269f0a"}]},"size":{"width":124,"height":64}},"968926ef-03f4-46f6-b4af-416f7eef2da1":{"id":"968926ef-03f4-46f6-b4af-416f7eef2da1","position":{"x":2424,"y":1309,"deltaX":1,"deltaY":0,"lastX":2423,"lastY":1309},"orientation":0,"type":"start","ports":{"port1":{"id":"port1","type":"left"},"port2":{"id":"port2","type":"right"},"port3":{"id":"port3","type":"top"},"port4":{"id":"port4","type":"bottom"}},"properties":{"name":"API Gateway","Id":"","nodeRole":"","description":""},"size":{"width":104,"height":104}},"1a3e2b1f-cb71-45a4-bc63-a97cbedb1fc5":{"id":"1a3e2b1f-cb71-45a4-bc63-a97cbedb1fc5","position":{"x":2140,"y":957,"deltaX":1,"deltaY":0,"lastX":2139,"lastY":957},"orientation":0,"type":"start","ports":{"port1":{"id":"port1","type":"left"},"port2":{"id":"port2","type":"right"},"port3":{"id":"port3","type":"top"},"port4":{"id":"port4","type":"bottom"}},"properties":{"name":"AWS Aplify","Id":"","nodeRole":"","description":"","outOfScope":true},"size":{"width":104,"height":104}},"99c7a4b9-338e-4047-8660-85e6a6fcfd1d":{"id":"99c7a4b9-338e-4047-8660-85e6a6fcfd1d","position":{"x":1999,"y":1378,"deltaX":-1,"deltaY":-1,"lastX":2000,"lastY":1379},"orientation":0,"type":"start","ports":{"port1":{"id":"port1","type":"left"},"port2":{"id":"port2","type":"right"},"port3":{"id":"port3","type":"top"},"port4":{"id":"port4","type":"bottom"}},"properties":{"name":"Amazon Cognito","Id":"","nodeRole":"","description":"","outOfScope":true},"size":{"width":104,"height":104}},"3f4e63e5-55d9-411a-986b-03cf8acd2a9f":{"id":"3f4e63e5-55d9-411a-986b-03cf8acd2a9f","position":{"x":2647,"y":1178,"deltaX":-1,"deltaY":-1,"lastX":2648,"lastY":1179},"orientation":0,"type":"start","ports":{"port1":{"id":"port1","type":"left"},"port2":{"id":"port2","type":"right"},"port3":{"id":"port3","type":"top"},"port4":{"id":"port4","type":"bottom"}},"properties":{"name":"Lambda","Id":"","nodeRole":"","description":"","threats":[{"id":"7b49bdbd-25e9-446f-b44a-46fa2807e182"},{"id":"782adefc-b480-4e8f-83ee-64f6d680df0a"},{"id":"a0f523b0-bbc0-4e6a-9064-500af1f3836e"}]},"size":{"width":104,"height":104}},"86625418-843e-4420-9da9-784e8c80fe27":{"id":"86625418-843e-4420-9da9-784e8c80fe27","position":{"x":2850,"y":1120,"deltaX":-1,"deltaY":0,"lastX":2851,"lastY":1120},"orientation":0,"type":"end","ports":{"port1":{"id":"port1","type":"left"},"port2":{"id":"port2","type":"right"},"port3":{"id":"port3","type":"top"},"port4":{"id":"port4","type":"bottom"}},"properties":{"name":"Tables","Id":"","nodeRole":"","description":""},"size":{"width":120,"height":68}},"12b22e1a-b8f5-4d4e-99ab-16e05a5a53f7":{"id":"12b22e1a-b8f5-4d4e-99ab-16e05a5a53f7","position":{"x":2866,"y":1241,"deltaX":3,"deltaY":-8,"lastX":2863,"lastY":1249},"orientation":0,"type":"end","ports":{"port1":{"id":"port1","type":"left"},"port2":{"id":"port2","type":"right"},"port3":{"id":"port3","type":"top"},"port4":{"id":"port4","type":"bottom"}},"properties":{"name":"Objects","Id":"","nodeRole":"","description":""},"size":{"width":120,"height":68}}},"trustBoundaries":{},"links":{"29bda919-72e1-4753-9c2a-83dc6cbe2ce3":{"id":"29bda919-72e1-4753-9c2a-83dc6cbe2ce3","from":{"nodeId":"49e45740-27a3-4b78-8eca-01f30f94ccf9","portId":"port3"},"to":{"nodeId":"968926ef-03f4-46f6-b4af-416f7eef2da1","portId":"port1"},"properties":{"label":"Tokens, Data, Objects"}},"57e30b0f-af9e-4347-a31d-6cf1f3313ba4":{"id":"57e30b0f-af9e-4347-a31d-6cf1f3313ba4","from":{"nodeId":"968926ef-03f4-46f6-b4af-416f7eef2da1","portId":"port3"},"to":{"nodeId":"49e45740-27a3-4b78-8eca-01f30f94ccf9","portId":"port2"},"properties":{"label":"GUIDs"}},"36106d48-c02c-4042-a59b-becc9c126cb6":{"id":"36106d48-c02c-4042-a59b-becc9c126cb6","from":{"nodeId":"1a3e2b1f-cb71-45a4-bc63-a97cbedb1fc5","portId":"port4"},"to":{"nodeId":"49e45740-27a3-4b78-8eca-01f30f94ccf9","portId":"port1"},"properties":{"label":"HTML, CSS, JS"}},"d14f98c3-f375-4ad5-afec-679813f20bb5":{"id":"d14f98c3-f375-4ad5-afec-679813f20bb5","from":{"nodeId":"49e45740-27a3-4b78-8eca-01f30f94ccf9","portId":"port4"},"to":{"nodeId":"99c7a4b9-338e-4047-8660-85e6a6fcfd1d","portId":"port3"},"properties":{"label":"Challenge, tokens","outOfScope":true}},"9255df36-ea2c-4cd7-892b-c4bfb474406f":{"id":"9255df36-ea2c-4cd7-892b-c4bfb474406f","from":{"nodeId":"99c7a4b9-338e-4047-8660-85e6a6fcfd1d","portId":"port2"},"to":{"nodeId":"49e45740-27a3-4b78-8eca-01f30f94ccf9","portId":"port3"},"properties":{"label":"Challenge Response"}},"85eb5093-0fb4-4f5b-ae65-661134e3237d":{"id":"85eb5093-0fb4-4f5b-ae65-661134e3237d","from":{"nodeId":"968926ef-03f4-46f6-b4af-416f7eef2da1","portId":"port3"},"to":{"nodeId":"3f4e63e5-55d9-411a-986b-03cf8acd2a9f","portId":"port1"},"properties":{"label":"Data, Objects"}},"8839bf02-2399-498e-9ff5-2315996f8b11":{"id":"8839bf02-2399-498e-9ff5-2315996f8b11","from":{"nodeId":"3f4e63e5-55d9-411a-986b-03cf8acd2a9f","portId":"port4"},"to":{"nodeId":"968926ef-03f4-46f6-b4af-416f7eef2da1","portId":"port2"},"properties":{"label":"GUIDs"}},"ab5c794b-9dcd-4783-bc8b-b1a3f7427d65":{"id":"ab5c794b-9dcd-4783-bc8b-b1a3f7427d65","from":{"nodeId":"3f4e63e5-55d9-411a-986b-03cf8acd2a9f","portId":"port2"},"to":{"nodeId":"86625418-843e-4420-9da9-784e8c80fe27","portId":"port1"},"properties":{"label":"GUIDs, Data"}},"485d452a-90f0-4bd2-bd5a-9c6e104bb628":{"id":"485d452a-90f0-4bd2-bd5a-9c6e104bb628","from":{"nodeId":"3f4e63e5-55d9-411a-986b-03cf8acd2a9f","portId":"port2"},"to":{"nodeId":"12b22e1a-b8f5-4d4e-99ab-16e05a5a53f7","portId":"port1"},"properties":{"label":"GUIDs, Objects"}}},"selected":{},"hovered":{"type":"link","id":"c96f97ce-db7b-425e-bd0b-9a19007ffebe"},"preNodes":["49e45740-27a3-4b78-8eca-01f30f94ccf9","968926ef-03f4-46f6-b4af-416f7eef2da1","1a3e2b1f-cb71-45a4-bc63-a97cbedb1fc5","99c7a4b9-338e-4047-8660-85e6a6fcfd1d","3f4e63e5-55d9-411a-986b-03cf8acd2a9f","86625418-843e-4420-9da9-784e8c80fe27","12b22e1a-b8f5-4d4e-99ab-16e05a5a53f7"],"isModelShow":false,"nodeName":"","nodeId":"","newNodeId":"","preLinks":["29bda919-72e1-4753-9c2a-83dc6cbe2ce3","57e30b0f-af9e-4347-a31d-6cf1f3313ba4","36106d48-c02c-4042-a59b-becc9c126cb6","d14f98c3-f375-4ad5-afec-679813f20bb5","9255df36-ea2c-4cd7-892b-c4bfb474406f","85eb5093-0fb4-4f5b-ae65-661134e3237d","8839bf02-2399-498e-9ff5-2315996f8b11","ab5c794b-9dcd-4783-bc8b-b1a3f7427d65","485d452a-90f0-4bd2-bd5a-9c6e104bb628"],"showModelName":"","linkLabel":"","newLinkId":"","clickNodeId":"","modelOption":"addNode","nodeRoleOption":"","clickLinkId":"","newTrustBoundaryId":"","clickTrustBoundaryId":"","alertMessageInfo":"","alertMessageStatus":"init","nodeDescription":"","nodeOutOfScope":false,"nodeOutOfScopeReason":"","trustBoudaryDescription":"","trustBoudaryOutOfScope":false,"trustBoudaryOutOfScopeReason":"","threats":[],"tags":[],"dataFeatures":[],"techFeatures":[],"securityFeatures":[],"preTrustBoundaries":[],"trustBoundaryName":"","trustBoundaryId":"","trustBoundaryDescription":"","trustBoundaryOutOfScope":false,"trustBoundaryOutOfScopeReason":""}';
export const chartSimple: IChart = JSON.parse(str);