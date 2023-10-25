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
import { RouteProps } from 'react-router-dom';
import {
  ROUTE_WORKSPACE_HOME,
  ROUTE_APPLICATION_INFO,
  ROUTE_ARCHITECTURE_INFO,
  ROUTE_ASSUMPTION_LIST,
  //ROUTE_DATAFLOW_INFO,
  ROUTE_DIAGRAM_INFO,
  ROUTE_MITIGATION_LIST,
  ROUTE_CONTROL_LIST,
  ROUTE_THREAT_EDITOR,
  ROUTE_THREAT_LIST,
  ROUTE_VIEW_THREAT_MODEL,
} from '../configs/routes';

//import UIDataflow from '../containers/UIDataflow';


import ThreatModelReport from '../containers/ThreatModelReport';
import ThreatStatementEditor from '../containers/ThreatStatementEditor';
import ThreatStatementList from '../containers/ThreatStatementList';
import UIApplication from '../containers/UIApplication';
import UIArchitecture from '../containers/UIArchitecture';
import UIAssumptionList from '../containers/UIAssumptionList';
import UIDiagram from '../containers/UIDiagram';
import UIMitigationList from '../containers/UIMitigationList';
import UIControlList from '../containers/UIControlList';
import UIWorkspaceHome from '../containers/UIWorkspaceHome';

const ROUTE_BASE_PATH = process.env.REACT_APP_ROUTE_BASE_PATH || '';

const getRouteWithBasePath = (route: string) => {
  return `${ROUTE_BASE_PATH}${route}`;
};

const routes: RouteProps[] = [
  {
    path: getRouteWithBasePath(ROUTE_WORKSPACE_HOME),
    element: <UIWorkspaceHome />,
  },
  {
    path: getRouteWithBasePath(ROUTE_APPLICATION_INFO),
    element: <UIApplication />,
  },
  {
    path: getRouteWithBasePath(ROUTE_ARCHITECTURE_INFO),
    element: <UIArchitecture />,
  },
  {
    path: getRouteWithBasePath(ROUTE_ASSUMPTION_LIST),
    element: <UIAssumptionList />,
  },
  /*
  {
    path: getRouteWithBasePath(ROUTE_DATAFLOW_INFO),
    element: <Dataflow />,
  }*/
  {
    path: getRouteWithBasePath(ROUTE_DIAGRAM_INFO),
    element: <UIDiagram />,
  },
  {
    path: getRouteWithBasePath(ROUTE_MITIGATION_LIST),
    element: <UIMitigationList />,
  },
  {
    path: getRouteWithBasePath(ROUTE_CONTROL_LIST),
    element: <UIControlList />,
  },
  {
    path: getRouteWithBasePath(ROUTE_VIEW_THREAT_MODEL),
    element: <ThreatModelReport />,
  },
  {
    path: getRouteWithBasePath(ROUTE_THREAT_EDITOR),
    element: <ThreatStatementEditor />,
  },
  {
    path: getRouteWithBasePath(ROUTE_THREAT_LIST),
    element: <ThreatStatementList />,
  },
];

export default routes;