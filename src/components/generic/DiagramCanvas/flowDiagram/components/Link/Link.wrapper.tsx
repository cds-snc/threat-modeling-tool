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

  const endPos = toNode && link.to.portId
    ? getLinkPosition(toNode, link.to.portId)
    : link.to.position;

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
