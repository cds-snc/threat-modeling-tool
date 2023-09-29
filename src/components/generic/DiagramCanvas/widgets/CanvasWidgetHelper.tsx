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
import styled from '@emotion/styled';
import { css, Global } from '@emotion/react';

export interface CanvasWidgetHelperProps {
  color?: string;
  background?: string;
}

namespace S {
  export const Container = styled.div<{ color: string; background: string }>`
		height: 100%;
		background-color: ${(p) => p.background};
		background-size: 50px 50px;
		display: flex;

		> * {
			height: 100%;
			min-height: 100%;
			width: 100%;
		}

		background-image: linear-gradient(
				0deg,
				transparent 24%,
				${(p) => p.color} 25%,
				${(p) => p.color} 26%,
				transparent 27%,
				transparent 74%,
				${(p) => p.color} 75%,
				${(p) => p.color} 76%,
				transparent 77%,
				transparent
			),
			linear-gradient(
				90deg,
				transparent 24%,
				${(p) => p.color} 25%,
				${(p) => p.color} 26%,
				transparent 27%,
				transparent 74%,
				${(p) => p.color} 75%,
				${(p) => p.color} 76%,
				transparent 77%,
				transparent
			);
	`;

  export const Expand = css`
		html,
		body,
		#root {
			height: 100%;
		}
	`;
}

export class CanvasWidgetHelper extends React.Component<React.PropsWithChildren<CanvasWidgetHelperProps>> {
  render() {
    return (
      <>
        <Global styles={S.Expand} />
        <S.Container
          background={this.props.background || 'rgb(60, 60, 60)'}
          color={this.props.color || 'rgba(255,255,255, 0.05)'}
        >
          {this.props.children}
        </S.Container>
	  </>
    );
  }
}
