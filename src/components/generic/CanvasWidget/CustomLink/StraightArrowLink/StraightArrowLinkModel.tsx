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

import { OptionDefinition } from '@cloudscape-design/components/internal/components/option/interfaces';
import { DefaultLinkModel } from '@projectstorm/react-diagrams';

export default class StraightArrowLinkModel extends DefaultLinkModel {
  filterSTRIDE: string;
  name: string | undefined;
  description: string | undefined;
  outOfScope?: boolean;
  outOfScopeReason?: string;
  tags?: string[];
  dataFeatures?: ReadonlyArray<OptionDefinition>;
  techFeatures?: ReadonlyArray<OptionDefinition>;
  securityFeatures?: ReadonlyArray<OptionDefinition>;
  threats?: {id: string}[];

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

  constructor(props: any = {}) {
    super({
      ...props,
      type: 'straight-arrow',
      width: 3,
    },
    );
    this.registerListener({ selectionChanged: this.handleSelectionChanged });
    this.filterStatementsCallback = props.filterStatementsCallback;
    this.filterSTRIDE = 'T,I,D';
    this.name = props.name;
    this.description = props.description;
    this.outOfScope = props.outOfScope;
    this.outOfScopeReason = props.outOfScopeReason;
    this.tags = props.tags;
    this.dataFeatures = props.dataFeatures;
    this.techFeatures = props.techFeatures;
    this.securityFeatures = props.securityFeatures;
  }

  serialize() {
    return {
      ...super.serialize(),
      name: this.name,
      description: this.description,
      outOfScope: this.outOfScope,
      outOfScopeReason: this.outOfScopeReason,
      tags: this.tags,
      dataFeatures: this.dataFeatures,
      techFeatures: this.techFeatures,
      securityFeatures: this.securityFeatures,
      threats: this.threats,
    };
  };

  deserialize(event:any): void {
    super.deserialize(event);
    this.name = event.data.name;
    this.description = event.data.description;
    this.outOfScope = event.data.outOfScope;
    this.outOfScopeReason = event.data.outOfScopeReason;
    this.tags = event.data.tags;
    this.dataFeatures = event.data.dataFeatures;
    this.techFeatures = event.data.techFeatures;
    this.securityFeatures = event.data.securityFeatures;
    this.threats = event.data.threats;
  };

  handleSelectionChanged = (event) => {
    if (this.filterStatementsCallback) {
      if (event.isSelected) {
        this.filterStatementsCallback(
          this.filterSTRIDE,
          this.getID(),
          'straight-arrow',
          this.name || '',
          this.description || '',
          this.outOfScope || false,
          this.outOfScopeReason || '',
          this.tags || [],
          this.dataFeatures || [],
          this.techFeatures || [],
          this.securityFeatures || [],
          this.threats || [],
        );
      } else {
        this.filterStatementsCallback(
          '',
          '',
          'straight-arrow',
          '',
          '',
          false,
          '',
          [],
          [],
          [],
          [],
          [],
        );
      }
    };
  };
}