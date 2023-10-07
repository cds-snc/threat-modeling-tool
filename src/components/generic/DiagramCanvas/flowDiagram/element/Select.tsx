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
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowIcon } from './Icons';

const SelectBackground = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background: transparent;
`;

const SelectBox = styled.div`
    width: 100%;
    position: relative;
`;

const SelectHeader = styled.div`
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-left: 0.5rem;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  outline: none;
  font-size: 14px;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    border: 1px solid #10a9ff;
  }
`;

const SelectValue = styled.div`
  width: 100%;
  height: 100%;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #333;
`;

const ArrowBox = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  &.up-arrow {
    transform: rotate( 0deg )
  }

  &.down-arrow {
    transform: rotate( 180deg )
  }

  transition: transform 200ms ease;
`;

const SelectBody = styled.div`
  width: 100%;
  max-height: 200px;
  background: #fff;
  z-index: 101;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #eee;
  position: absolute;
  top: 32px;
  overflow-y: auto;
  box-sizing: border-box;

  &.hide-body {
    display: none;
  }

  &::-webkit-scrollbar {
    width: 5px;
    background-color: #eee;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #999;
    border-radius: 20px;
  }
`;

const SelectOption = styled.div`
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  line-height: 30px;
  padding-left: 0.5rem;
  color: #333;
  cursor: pointer;
  
  &:hover {
    background: #e6f7ff;
  }
`;

export interface Ioption {
  rGuid: string;
  rName: string;
};

export interface ISelectProps {
  optionList: Ioption[];
  value: string;
  onChange: (e: string) => void;
  children?: any;
}

export const Select = ({ optionList = [], value, onChange }: ISelectProps) => {
  const [isArrowUp, setIsArrowUp] = useState(false);
  const [isBodyShow, setIsBodyShow] = useState(false);
  const [isBgShow, setIsBgShow] = useState(true);
  const [selectValue, setSelectValue] = useState(value);

  useEffect(() => {
    let selectRole = optionList.filter(role => role.rGuid === value);
    let selectRoleName = selectRole[0].rName;
    setSelectValue(selectRoleName);
  }, [value, optionList]);

  const handleClickOption = (optionValue: string) => {
    hideSelectBody();
    onChange(optionValue);
  };

  const hideSelectBody = () => {
    setIsBodyShow(!isBodyShow);
    setIsArrowUp(false);
    setIsBodyShow(false);
    setIsBgShow(false);
  };

  const showSelectBody = () => {
    setIsBodyShow(!isBodyShow);
    setIsArrowUp(true);
    setIsBodyShow(true);
    setIsBgShow(true);
  };

  return (
    <SelectBox>
      { isBgShow ? <SelectBackground onClick={ () => { hideSelectBody(); } } /> : '' }
      <SelectHeader onClick={ () => { showSelectBody(); } }>
        <SelectValue>{ selectValue }</SelectValue>
        <ArrowBox className={ isArrowUp ? 'up-arrow' : 'down-arrow'}>
          <ArrowIcon width={20} height={20}/>
        </ArrowBox>
      </SelectHeader>
      <SelectBody className={ isBodyShow ? '' : 'hide-body' }>
        {
          optionList.map(
            option => <SelectOption key={option.rGuid} onClick={ () => { handleClickOption(option.rGuid); } }>{option.rName}</SelectOption>)
        }
      </SelectBody>
    </SelectBox>
  );
};