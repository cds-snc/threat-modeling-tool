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
import { DefaultLinkFactory } from '@projectstorm/react-diagrams';
import StraightArrowLinkModel from './StraightArrowLinkModel';
import { StraightArrowLinkWidget } from './StraightArrowLinkWidget';
import { OptionDefinition } from '@cloudscape-design/components/internal/components/option/interfaces';

export class StraightArrowLinkFactory extends DefaultLinkFactory {
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
    super('straight-arrow');
    this.filterStatementsCallback = props;
  }

  generateModel(_event): StraightArrowLinkModel {
    //console.log('StraightArrowLinkFactory.generateModel.pointsPosition', event.initialConfig.name, event.initialConfig.points[1].x, event.initialConfig.points[1].y);
    return new StraightArrowLinkModel({ filterStatementsCallback: this.filterStatementsCallback });
  }

  generateReactWidget(event): JSX.Element {
    return (
      <StraightArrowLinkWidget link={event.model} diagramEngine={this.engine} />
    );
  }
}