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

import { useCallback } from 'react';
import { ControlProfile } from '../../customTypes';

const useControlProfiles = (
  _controlProfileList: ControlProfile[],
  setControlProfileList: React.Dispatch<React.SetStateAction<ControlProfile[]>>,
) => {
  const handlRemoveControlProfile = useCallback((schema: string) => {
    setControlProfileList((prevList) => prevList.filter(x => x.schema !== schema));
  }, [setControlProfileList]);

  const handleSaveControlProfile = useCallback((controlProfile: ControlProfile) => {
    let newEntity = controlProfile;
    setControlProfileList((prevList) => {

      let updated: ControlProfile = {
        ...controlProfile,
        schema: controlProfile.schema,
        controls: controlProfile.controls,
      };

      newEntity = { ...updated };

      const foundIndex = prevList.findIndex(st => st.schema === updated.schema);
      if (foundIndex >= 0) {
        return [...prevList.slice(0, foundIndex), updated, ...prevList.slice(foundIndex + 1)];
      }

      return [...prevList, updated];
    });

    return newEntity;
  }, [setControlProfileList]);

  return {
    handlRemoveControlProfile,
    handleSaveControlProfile,
  };
};

export default useControlProfiles;