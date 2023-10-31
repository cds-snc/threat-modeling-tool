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

import { FC, PropsWithChildren } from 'react';
import ControlProfilesLocalStateContextProvider from './components/LocalStateContextProvider';
import ControlProfilesLocalStorageContextProvider from './components/LocalStorageContextProvider';
import { useControlProfilesContext } from './context';
import { ControlProfilesContextProviderProps } from './types';
import { EXAMPLE_WORKSPACE_ID } from '../../configs/constants';
import { useExampleContext } from '../ExampleContext';

const ControlProfilesContextProvider: FC<PropsWithChildren<ControlProfilesContextProviderProps>> = (props) => {
  const { controlProfiles } = useExampleContext();

  return props.workspaceId === EXAMPLE_WORKSPACE_ID ?
    (<ControlProfilesLocalStateContextProvider initialValue={controlProfiles} {...props} />) :
    (<ControlProfilesLocalStorageContextProvider {...props} />);
};

export default ControlProfilesContextProvider;

export {
  useControlProfilesContext,
};
