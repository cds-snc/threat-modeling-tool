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
import { DatastoreNodeWidget } from './DatastoreNodeWidget';
import DatastoreNodeModel from './DatastoreNodeModel';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import { OptionDefinition } from '@cloudscape-design/components/internal/components/option/interfaces';

export class DatastoreNodeFactory extends AbstractReactFactory<DatastoreNodeModel, DiagramEngine> {
  public filterStatementsCallback?: (
    strideFilter: string,
    objectId: string,
    objectType: string,
    objectName?: string,
    objectDescription?: string,
    objectOutOfScope?: boolean,
    objectOutOfScopeReason?: string,
    objectTags?: string[],
    dataFeatures?: ReadonlyArray<OptionDefinition>,
    techFeatures?: ReadonlyArray<OptionDefinition>,
    securityFeatures?: ReadonlyArray<OptionDefinition>,
    threats?: {id: string}[]) => void;

  constructor(props) {
    super('datastore');
    this.filterStatementsCallback = props;
  }

  generateReactWidget(event): JSX.Element {
    return <DatastoreNodeWidget engine={this.engine} size={120} node={event.model} />;
  }

  generateModel(_event) {
    return new DatastoreNodeModel({ filterStatementsCallback: this.filterStatementsCallback });
  }
}