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
import * as SRD from '@projectstorm/react-diagrams';

export class Application {
  protected activeModel: SRD.DiagramModel;
  protected diagramEngine: SRD.DiagramEngine;

  constructor() {
    this.diagramEngine = SRD.default();
    this.newModel();
  }

  public newModel() {
    this.activeModel = new SRD.DiagramModel();
    this.diagramEngine.setModel(this.activeModel);

    // create default node
    var node1 = new SRD.DefaultNodeModel('Node 1', 'rgb(0,192,255)');
    let port = node1.addOutPort('Out');
    node1.addInPort('');
    node1.setPosition(100, 100);

    //create another default node
    var node2 = new SRD.DefaultNodeModel('Node 2', 'rgb(192,255,0)');
    let port2 = node2.addInPort('In');
    node2.setPosition(400, 100);

    // link the ports
    let link1 = port.link(port2);

    this.activeModel.addAll(node1, node2, link1);
  }

  public getActiveDiagram(): SRD.DiagramModel {
    return this.activeModel;
  }

  public getDiagramEngine(): SRD.DiagramEngine {
    return this.diagramEngine;
  }
}
