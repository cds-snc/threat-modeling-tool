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
import * as React from 'react';
import { IConfig, ILink, INode, IOnLinkClick, IOnLinkMouseEnter, IOnLinkMouseLeave, IOnLabelDoubleClick } from '../../';
import { noop } from '../../utils';
import { ILinkDefaultProps, LinkDefault } from './Link.default';
import { getLinkPosition } from './utils';

export interface ILinkWrapperProps {
  config: IConfig;
  link: ILink;
  linkLabel: string;
  isSelected: boolean;
  isHovered: boolean;
  isAllowAddLinkLabel: boolean;
  fromNode: INode;
  toNode: INode | undefined;
  onLinkMouseEnter: IOnLinkMouseEnter;
  onLinkMouseLeave: IOnLinkMouseLeave;
  onLabelDoubleClick: IOnLabelDoubleClick;
  onLinkClick: IOnLinkClick;
  Component?: React.FunctionComponent<ILinkDefaultProps>;
};

export const LinkWrapper = React.memo(({
  config,
  Component = LinkDefault,
  link,
  onLinkMouseEnter,
  onLinkMouseLeave,
  onLinkClick,
  onLabelDoubleClick,
  isAllowAddLinkLabel,
  isSelected,
  isHovered,
  fromNode,
  toNode,
}: ILinkWrapperProps) => {

  const startPos = getLinkPosition(fromNode, link.from.portId);
  // adjusting the start position considering the difference in size between the sidebar items and the actual nodes
  // for now, using hardcoded values, but we'll revisit this once we introduce node resize features
  switch (fromNode.type) {
    case 'start': // process node
      switch (fromNode.ports[link.from.portId].type) {
        case 'left':
          startPos.x = startPos.x - 52;
          startPos.y = startPos.y + 2;
          break;
        case 'top':
          startPos.y = startPos.y - 52;
          startPos.x = startPos.x + 2;
          break;
        case 'right':
          startPos.x = startPos.x + 54;
          startPos.y = startPos.y + 2;
          break;
        case 'bottom':
          startPos.y = startPos.y + 54;
          startPos.x = startPos.x + 2;
          break;
      };
      break;
    case 'end': // datastore node
      switch (fromNode.ports[link.from.portId].type) {
        case 'left':
          startPos.x = startPos.x - 52;
          startPos.y = startPos.y - 16;
          break;
        case 'top':
          startPos.y = startPos.y - 50;
          startPos.x = startPos.x + 10;
          break;
        case 'right':
          startPos.x = startPos.x + 74;
          startPos.y = startPos.y - 16;
          break;
        case 'bottom':
          startPos.y = startPos.y + 18;
          startPos.x = startPos.x + 10;
          break;
      };
      break;
    case 'process-point': // actor node
      switch (fromNode.ports[link.from.portId].type) {
        case 'left':
          startPos.x = startPos.x - 52;
          startPos.y = startPos.y - 18;
          break;
        case 'top':
          startPos.y = startPos.y - 52;
          startPos.x = startPos.x + 13;
          break;
        case 'right':
          startPos.x = startPos.x + 78;
          startPos.y = startPos.y - 18;
          break;
        case 'bottom':
          startPos.y = startPos.y + 16;
          startPos.x = startPos.x + 14;
          break;
      };
      break;
    default:
  };

  const endPos = toNode && link.to.portId ? getLinkPosition(toNode, link.to.portId) : link.to.position;
  // adjusting the end position considering the difference in size between the sidebar items and the actual nodes
  // for now, using hardcoded values, but we'll revisit this once we introduce node resize features
  switch (toNode?.type) {
    case 'start': // process node
      switch (toNode.ports[link.to.portId!].type) {
        case 'left':
          endPos!.x = endPos!.x - 52;
          endPos!.y = endPos!.y + 2;
          break;
        case 'top':
          endPos!.y = endPos!.y - 52;
          endPos!.x = endPos!.x + 2;
          break;
        case 'right':
          endPos!.x = endPos!.x + 54;
          endPos!.y = endPos!.y + 2;
          break;
        case 'bottom':
          endPos!.y = endPos!.y + 54;
          endPos!.x = endPos!.x + 2;
          break;
      };
      break;
    case 'end': // datastore node
      switch (toNode.ports[link.to.portId!].type) {
        case 'left':
          endPos!.x = endPos!.x - 52;
          endPos!.y = endPos!.y - 16;
          break;
        case 'top':
          endPos!.y = endPos!.y - 50;
          endPos!.x = endPos!.x + 10;
          break;
        case 'right':
          endPos!.x = endPos!.x + 74;
          endPos!.y = endPos!.y - 16;
          break;
        case 'bottom':
          endPos!.y = endPos!.y + 18;
          endPos!.x = endPos!.x + 10;
          break;
      };
      break;
    case 'process-point': // actor node
      switch (toNode.ports[link.to.portId!].type) {
        case 'left':
          endPos!.x = endPos!.x - 52;
          endPos!.y = endPos!.y - 18;
          break;
        case 'top':
          endPos!.y = endPos!.y - 52;
          endPos!.x = endPos!.x + 13;
          break;
        case 'right':
          endPos!.x = endPos!.x + 78;
          endPos!.y = endPos!.y - 18;
          break;
        case 'bottom':
          endPos!.y = endPos!.y + 16;
          endPos!.x = endPos!.x + 14;
          break;
      };
      break;
    default:
  };

  // Don't render the link yet if there is no end pos
  // This will occur if the link was just created
  if (!endPos) {
    return null;
  }

  return (
    <Component
      config={config}
      link={link}
      startPos={startPos}
      endPos={endPos}
      onLinkMouseEnter={config.readonly ? noop : onLinkMouseEnter}
      onLinkMouseLeave={config.readonly ? noop : onLinkMouseLeave}
      onLabelDoubleClick={onLabelDoubleClick}
      onLinkClick={config.readonly ? noop : onLinkClick}
      isSelected={isSelected}
      isHovered={isHovered}
      isAllowAddLinkLabel={isAllowAddLinkLabel}
    />
  );
});
