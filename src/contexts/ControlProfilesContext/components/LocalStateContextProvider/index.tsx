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

import { FC, PropsWithChildren, useCallback, useState } from 'react';
import { ControlProfile } from '../../../../customTypes';
import { LocalStateContextProviderBaseProps } from '../../../types';
import { ControlProfilesContext } from '../../context';
import { ControlProfilesContextProviderProps } from '../../types';
import useControlProfiles from '../../useControlProfiles';

const ControlProfilesLocalStateContextProvider: FC<PropsWithChildren<
ControlProfilesContextProviderProps & LocalStateContextProviderBaseProps<ControlProfile[]>>> = ({
  children,
  initialValue,
}) => {
  const [controlProfileList, setControlProfileList] = useState<ControlProfile[]>(initialValue || []);

  const {
    handlRemoveControlProfile,
    handleSaveControlProfile,
  } = useControlProfiles(controlProfileList, setControlProfileList);

  const handleRemoveAllControlProfiles = useCallback(async () => {
    setControlProfileList([]);
  }, []);

  const handleDeleteWorkspace = useCallback(async (_workspaceId: string) => {
    setControlProfileList([]);
  }, []);

  return (<ControlProfilesContext.Provider value={{
    controlProfileList,
    setControlProfileList,
    removeControlProfile: handlRemoveControlProfile,
    saveControlProfile: handleSaveControlProfile,
    removeAllControlProfiles: handleRemoveAllControlProfiles,
    onDeleteWorkspace: handleDeleteWorkspace,
  }}>
    {children}
  </ControlProfilesContext.Provider>);
};

export default ControlProfilesLocalStateContextProvider;

