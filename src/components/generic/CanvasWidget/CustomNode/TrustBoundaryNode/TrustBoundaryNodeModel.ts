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
import { NodeModel, NodeModelGenerics } from '@projectstorm/react-diagrams';

export interface TrustBoundaryNodeModelGenerics {
  nodeWidth?: number;
  nodeHeight?: number;
  nodeX?: number;
  nodeY?: number;
  name?: string;
  description?: string;
  outOfScope?: boolean;
  outOfScopeReason?: string;
  tags?: string[];
  filterStatementsCallback?: (
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
}

export default class TrustBoundaryNodeModel extends NodeModel<NodeModelGenerics & TrustBoundaryNodeModelGenerics> {
  nodeX: number | undefined;
  nodeY: number | undefined;
  nodeWidth: number | undefined;
  nodeHeight: number | undefined;
  name: string | undefined;
  description: string | undefined;
  outOfScope?: boolean;
  outOfScopeReason?: string;
  tags?: string[];
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

  constructor(props: TrustBoundaryNodeModelGenerics = {}) {
    super({
      ...props,
		  type: 'trust-boundary',
      selected: true,
	  });
    console.log('dimensions', props.nodeWidth, props.nodeHeight);
    this.nodeWidth = props.nodeWidth;
    this.nodeHeight = props.nodeHeight;
    this.nodeX = props.nodeX;
    this.nodeY = props.nodeY;
    this.filterStatementsCallback = props.filterStatementsCallback;
    this.name = props.name;
    this.description = props.description;
    this.outOfScope = props.outOfScope;
    this.outOfScopeReason = props.outOfScopeReason;
    this.tags = props.tags;
  };

  serialize() {
    return {
      ...super.serialize(),
      nodeWidth: this.nodeWidth,
      nodeHeight: this.nodeHeight,
      nodeX: this.nodeX,
      nodeY: this.nodeY,
      name: this.name,
      description: this.description,
      outOfScope: this.outOfScope,
      outOfScopeReason: this.outOfScopeReason,
      tags: this.tags,
    };
  };

  deserialize(event:any): void {
    console.log('tb-event', event);
    super.deserialize(event);
    this.nodeWidth = event.data.nodeWidth;
    this.nodeHeight = event.data.nodeHeight;
    this.nodeX = event.data.nodeX;
    this.nodeY = event.data.nodeY;
    this.name = event.data.name;
    this.description = event.data.description;
    this.outOfScope = event.data.outOfScope;
    this.outOfScopeReason = event.data.outOfScopeReason;
    this.tags = event.data.tags;
  };

  handleSelectionChanged = (event) => {
    if (this.filterStatementsCallback) {
      if (event.isSelected) {
        this.filterStatementsCallback(
          '',
          this.getID(),
          'trust-boundary',
          this.name || '',
          this.description || '',
          this.outOfScope || false,
          this.outOfScopeReason || '',
          this.tags || [],
          [],
          [],
          [],
          [],
        );
      } else {
        this.filterStatementsCallback(
          '',
          '',
          'trust-boundary',
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
