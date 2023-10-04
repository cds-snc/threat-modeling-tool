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
import { DiagramInfo } from '../../../../customTypes';
import { INFO_DEFAULT_VALUE } from '../../../constants';
import { LocalStateContextProviderBaseProps } from '../../../types';
import { DiagramInfoContext } from '../../context';
import { DiagramContextProviderProps } from '../../types';

const DiagramLocalStateContextProvider: FC<PropsWithChildren<
DiagramContextProviderProps & LocalStateContextProviderBaseProps<DiagramInfo>>> = ({
  children,
  initialValue,
}) => {
  const [diagramInfo, setDiagramInfo] = useState<DiagramInfo>(initialValue || INFO_DEFAULT_VALUE);

  const handleRemoveDiagramInfo = useCallback(async () => {
    setDiagramInfo(INFO_DEFAULT_VALUE);
  }, []);

  const handleDeleteWorkspace = useCallback(async (_workspaceId: string) => {
    setDiagramInfo(INFO_DEFAULT_VALUE);
  }, []);

  return (<DiagramInfoContext.Provider value={{
    diagramInfo,
    setDiagramInfo,
    removeDiagramInfo: handleRemoveDiagramInfo,
    onDeleteWorkspace: handleDeleteWorkspace,
  }}>
    {children}
  </DiagramInfoContext.Provider>);
};

export default DiagramLocalStateContextProvider;

