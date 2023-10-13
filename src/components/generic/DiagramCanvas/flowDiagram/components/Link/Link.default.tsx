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
//import * as React from 'react';
import styled from 'styled-components';
import { generateLinkPath, IConfig, ILink, IOnLinkClick, IOnLinkMouseEnter, IOnLinkMouseLeave, IOnLabelDoubleClick, IPosition } from '../../';
import generateArrowPath from './utils/generateArrowPath';
import { generateLabelPosition } from '../../utils';

const Label = styled.div`
  position: absolute;
  width: 120px;
`;

const LabelContent = styled.div`
  padding: 5px 10px;
  background: cornflowerblue;
  color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  cursor: pointer;
`;

export interface ILinkDefaultProps {
  config: IConfig;
  link: ILink;
  startPos: IPosition;
  endPos: IPosition;
  onLinkMouseEnter: IOnLinkMouseEnter;
  onLinkMouseLeave: IOnLinkMouseLeave;
  onLinkClick: IOnLinkClick;
  onLabelDoubleClick: IOnLabelDoubleClick;
  isHovered: boolean;
  isSelected: boolean;
  isAllowAddLinkLabel: boolean;
};

export const LinkDefault = ({
  config,
  link,
  startPos,
  endPos,
  //onLinkMouseEnter,
  //onLinkMouseLeave,
  onLabelDoubleClick,
  onLinkClick,
  isHovered,
  isSelected,
  isAllowAddLinkLabel,
}: ILinkDefaultProps) => {
  const points = generateLinkPath(startPos, endPos);
  const arrow = generateArrowPath(startPos, endPos);
  const { centerX, centerY } = generateLabelPosition(startPos, endPos);

  // console.log("arrow: ", arrow)

  if (isAllowAddLinkLabel) {
    return (
      <>
        <svg style={{ overflow: 'visible', position: 'absolute', cursor: 'pointer', left: 0, right: 0 }}>
          <circle
            r="4"
            cx={startPos.x}
            cy={startPos.y}
            fill="cornflowerblue"
          />
          {/* Main line */}
          <path
            d={points}
            stroke="cornflowerblue"
            strokeWidth="2"
            fill="none"
          />
          {/* Arrow */}
          <path
            d={arrow}
            stroke="cornflowerblue"
            strokeWidth="2"
            fill="cornflowerblue"
          />
          {/* Thick line to make selection easier */}
          <path
            d={points}
            stroke="cornflowerblue"
            strokeWidth="15"
            fill="none"
            strokeLinecap="round"
            strokeOpacity={(isHovered || isSelected) ? 0.2 : 0}
            //onMouseEnter={() => onLinkMouseEnter({ config, linkId: link.id })}
            //onMouseLeave={() => onLinkMouseLeave({ config, linkId: link.id })}
            onDoubleClick={() => onLabelDoubleClick({ linkId: link.id })}
            onClick={(e) => {
              onLinkClick({ config, linkId: link.id });
              e.stopPropagation();
            }}
          />
          <circle
            r="4"
            cx={endPos.x}
            cy={endPos.y}
            fill="cornflowerblue"
          />
        </svg>

        <Label style={{ left: centerX, top: centerY }} onDoubleClick={() => { onLabelDoubleClick({ linkId: link.id }); }}>
          {link.properties && link.properties.label && (
            <LabelContent>{link.properties && link.properties.label}</LabelContent>
          )}
        </Label>
      </>
    );
  } else {
    return (
      <svg style={{ overflow: 'visible', position: 'absolute', cursor: 'pointer', left: 0, right: 0 }}>
        <circle
          r="4"
          cx={startPos.x}
          cy={startPos.y}
          fill="cornflowerblue"
        />
        {/* Main line */}
        <path
          d={points}
          stroke="cornflowerblue"
          strokeWidth="3"
          fill="none"
        />
        {/* Arrow */}
        <path
          d={arrow}
          stroke="cornflowerblue"
          strokeWidth="3"
          fill="cornflowerblue"
        />
        {/* Thick line to make selection easier */}
        <path
          d={points}
          stroke="cornflowerblue"
          strokeWidth="20"
          fill="none"
          strokeLinecap="round"
          strokeOpacity={(isHovered || isSelected) ? 0.1 : 0}
          //onMouseEnter={() => onLinkMouseEnter({ config, linkId: link.id })}
          //onMouseLeave={() => onLinkMouseLeave({ config, linkId: link.id })}
          onDoubleClick={() => onLabelDoubleClick({ linkId: link.id })}
          onClick={(e) => {
            onLinkClick({ config, linkId: link.id });
            e.stopPropagation();
          }}
        />
        <circle
          r="4"
          cx={endPos.x}
          cy={endPos.y}
          fill="cornflowerblue"
        />
      </svg>
    );
  }
};