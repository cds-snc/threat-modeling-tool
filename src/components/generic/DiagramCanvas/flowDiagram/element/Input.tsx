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

const CustomInput = styled.input`
  width: 100%;
  height: 30px;
  padding-left: 0.5rem;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  outline: none;
  font-size: 14px;

  &:focus {
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    border: 1px solid #10a9ff;
  }
`;

export interface IInputProps {
  value: string;
  type: string;
  onChange: (e: any) => void;
};

export const Input = ({ value, type, onChange }: IInputProps) => {
  return (
    <CustomInput value={value} type={type} onChange={onChange} />
  );
};
