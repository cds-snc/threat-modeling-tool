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

import { FC } from 'react';
import { useDiagramInfoContext } from '../../../contexts/DiagramContext/context';
import { EditableComponentBaseProps } from '../../../customTypes';
import DiagramCanvas from '../../generic/DiagramCanvas';


const DiagramInfo: FC<EditableComponentBaseProps> = (props) => {
  //return <div><h2>DIAGRAMINFO</h2></div>;
  const { diagramInfo, setDiagramInfo } = useDiagramInfoContext();
  return <DiagramCanvas
    {...props}
    headerTitle='Dataflow Diagram'
    diagramTitle='Dataflow Diagram'
    entity={diagramInfo}
    onConfirm={(diagram) => setDiagramInfo(diagram)}
  />;

};

export default DiagramInfo;