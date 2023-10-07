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

let str: string = '{"offset":{"x":-1948,"y":-901,"deltaX":-2,"deltaY":0,"lastX":-1946,"lastY":-901},"nodes":{"6e87da0f-6f8e-406d-8515-1fa159a5b9c0":{"id":"6e87da0f-6f8e-406d-8515-1fa159a5b9c0","position":{"x":2719,"y":1251,"deltaX":0,"deltaY":-1,"lastX":2719,"lastY":1252},"orientation":0,"type":"process-queue","ports":{"port1":{"id":"port1","type":"top","position":{"x":100,"y":-2}},"port2":{"id":"port2","type":"right","position":{"x":202,"y":60}},"port3":{"id":"port3","type":"bottom","position":{"x":100,"y":122}},"port4":{"id":"port4","type":"left","position":{"x":-2,"y":60}}},"properties":{"name":"Queue","Id":"002"},"size":{"width":200,"height":120}},"df45278c-3e6f-4dd3-b3fe-902893fc4a67":{"id":"df45278c-3e6f-4dd3-b3fe-902893fc4a67","position":{"x":2243,"y":1067,"deltaX":2,"deltaY":0,"lastX":2241,"lastY":1067},"orientation":0,"type":"start","ports":{"port1":{"id":"port1","type":"left","position":{"x":-2,"y":50}},"port2":{"id":"port2","type":"right","position":{"x":102,"y":50}},"port3":{"id":"port3","type":"top","position":{"x":50,"y":-2}},"port4":{"id":"port4","type":"bottom","position":{"x":50,"y":102}}},"properties":{"name":"Start Point","Id":"001"},"size":{"width":100,"height":100}}},"links":{"e5b5ba54-084b-4ef2-b667-4297a6559f24":{"id":"e5b5ba54-084b-4ef2-b667-4297a6559f24","from":{"nodeId":"df45278c-3e6f-4dd3-b3fe-902893fc4a67","portId":"port1"},"to":{"nodeId":"6e87da0f-6f8e-406d-8515-1fa159a5b9c0","portId":"port3"},"properties":{"label":"Left Bottom 002"}}},"selected":{},"hovered":{"type":"link","id":"6a138303-37e9-40ae-8d49-ac1fb3dc2c7c"},"preNodes":["6e87da0f-6f8e-406d-8515-1fa159a5b9c0","df45278c-3e6f-4dd3-b3fe-902893fc4a67"],"isModelShow":false,"nodeName":"","nodeId":"","newNodeId":"","preLinks":["e5b5ba54-084b-4ef2-b667-4297a6559f24"],"showModelName":"newLinkModel","linkLabel":"Left Bottom 002","newLinkId":"e5b5ba54-084b-4ef2-b667-4297a6559f24","clickNodeId":"","modelOption":"addNode"}';

export const chartSimple: IChart = JSON.parse(str);