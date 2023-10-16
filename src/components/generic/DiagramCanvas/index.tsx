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

/** @jsxImportSource @emotion/react */
import styled from 'styled-components';
import { css } from '@emotion/react';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Grid from '@cloudscape-design/components/grid';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { FC, useCallback, useState, useMemo, useEffect, forwardRef } from 'react';
import { DiagramInfo, EditableComponentBaseProps } from '../../../customTypes';
import FlowChartWithState from './flowDiagram/components/FlowChart/FlowChartWithState';
import { IPortDefaultProps, INodeDefaultProps, LinkDefault, IChart } from './flowDiagram';
import { Sidebar, SidebarItem } from './flowDiagram/layout';
import { chartSimple } from './flowDiagram/exampleChartState';
import { generateLabelPosition } from './flowDiagram/utils';
import { useThreatsContext } from '../../../contexts';
import intersectStringArrays from '../../../utils/intersectStringArrays';
import ThreatList from './flowDiagram/components/Canvas/ThreatList/ThreatList';
import PropertiesPanel from './flowDiagram/components/Canvas/PropertiesPanel/PropertiesPanel';

const diagramWrapper = css({
  display: 'grid',
  height: '50vh',
  maxHeight: '100%',
  minHeight: '50%',
  width: '100%',
  maxWidth: '100%',
});

export interface DiagramCanvasProps extends EditableComponentBaseProps {
  entity: DiagramInfo;
  headerTitle: string;
  diagramTitle: string;
  onConfirm: (info: DiagramInfo) => void;
}

const DiagramCanvas: FC<DiagramCanvasProps> = ({
  headerTitle,
  diagramTitle,
  entity,
  onConfirm,
  onEditModeChange,
}) => {
  const [editMode, setEditMode] = useState(!entity.description && !entity.name);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    onEditModeChange?.(editMode);
  }, [editMode, onEditModeChange]);

  const handleSaveDiagramCanvas = useCallback(() => {
    onConfirm({
      id,
      name,
      description: content,
    });
    setEditMode(false);
  }, [id, name, content, onConfirm]);

  const handleEdit = useCallback(() => {
    setId(entity.id || '');
    setContent(entity.description || '');
    setName(entity.name || '');
    setEditMode(true);
  }, [entity, setContent, setEditMode, setName]);


  const actions = useMemo(() => {
    return editMode ? (<SpaceBetween direction='horizontal' size='s'>
      <Button key='cancelBtn' onClick={() => setEditMode(false)}>Cancel</Button>
      <Button key='confirmBtn' variant='primary' onClick={handleSaveDiagramCanvas}>Confirm</Button>
    </SpaceBetween>) : (<Button onClick={handleEdit}>Edit</Button>);
  }, [editMode, handleSaveDiagramCanvas, handleEdit, setEditMode]);

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

  const PortDefaultOuter = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 20px;
  background: #e1dfdf;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: cornflowerblue;
  }
  & svg {
    width: 15px;
    height: 15px;
  }
  `;

  const ProcessQueue = styled.div<{ outOfScope }>`
  width: 120px;
  height: 60px;
  position: absolute;
  text-align: center;
  padding: 0px;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 10px;
  ${(props) => {return (props.property==='selected' ? 'border: 3px dashed black; background: #fdf0f0;' : 'border: 2px dashed black; background: white;');}}
  ${(props) => {
    return (
      props.outOfScope==='yes' ?
        'filter: invert(.3); mix-blend-mode: normal;' :
        'filter: invert(0); mix-blend-mode: normal;'
    );
  }}
  & div {
    padding: 0px;
    margin: 0px;
  }
  &:hover {
    background: #c4d2f2;
  }
  `;

  const ProcessPoint = styled.div<{ outOfScope }>`
  width: 120px;
  height: 60px;
  text-align: center;
  position: absolute;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0px;
  ${(props) => {return (props.property==='selected' ? 'border: 3px solid black; background: #fdf0f0;' : 'border: 2px solid black; background: white;');}}
  ${(props) => {
    return (
      props.outOfScope==='yes' ?
        'filter: invert(.3); mix-blend-mode: normal;' :
        'filter: invert(0); mix-blend-mode: normal;'
    );
  }}
  & div {
    padding: 0px;
    margin: 0px;
  }
  &:hover {
    background: #c4d2f2;
  }
  `;

  const StartPoint = styled.div<{ outOfScope }>`
  position: absolute;
  width: 100px;
  height: 100px;
  padding: 0px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  border-radius: 50%;
  ${(props) => {return (props.property==='selected' ? 'border: 3px solid black; background: #fdf0f0;' : 'border: 2px solid black; background: white;');}}
  ${(props) => {
    return (
      props.outOfScope==='yes' ?
        'filter: invert(.3); mix-blend-mode: normal;' :
        'filter: invert(0); mix-blend-mode: normal;'
    );
  }}
  &:hover {
    background: #c4d2f2;
  }
  `;

  const EndPoint = styled.div<{ outOfScope }>`
  position: absolute;
  width: 120px;
  height: 60px;
  padding: 0px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  border-top: 4px solid black;
  border-bottom: 4px solid black;
  ${(props) => {return (props.property==='selected' ? 'border-left: 2px solid black; border-right: 2px solid black; background: #fdf0f0;' : 'border-left: 0px solid black; border-right: 0px solid black; background: white;');}}
  ${(props) => {
    return (
      props.outOfScope==='yes' ?
        'filter: invert(.3); mix-blend-mode: normal;' :
        'filter: invert(0); mix-blend-mode: normal;'
    );
  }}
  &:hover {
    background: #c4d2f2;
  }
  `;


  const NodeCustom = forwardRef(({ node, isSelected, children, ...otherProps }: INodeDefaultProps, ref: React.Ref<HTMLDivElement>) => {
    switch (node.type) {
      case 'start':
        return (
          <StartPoint outOfScope={node.properties?.outOfScope === true ? 'yes': 'no'} property={(isSelected===true ? 'selected':'')} ref={ref} {...otherProps}>
            {children}
          </StartPoint>
        );
      case 'end':
        return (
          <EndPoint outOfScope={node.properties?.outOfScope === true ? 'yes': 'no'} property={(isSelected===true ? 'selected':'')} ref={ref} {...otherProps}>
            {children}
          </EndPoint>
        );
      case 'process-queue':
        return (
          <ProcessQueue outOfScope={node.properties?.outOfScope === true ? 'yes': 'no'} property={(isSelected===true ? 'selected':'')} ref={ref} {...otherProps}>
            {children}
          </ProcessQueue>
        );
      case 'process-point':
        return (
          <ProcessPoint outOfScope={node.properties?.outOfScope === true ? 'yes': 'no'} property={(isSelected===true ? 'selected':'')} ref={ref} {...otherProps}>
            {children}
          </ProcessPoint>
        );
    }
    return (
      <StartPoint outOfScope={node.properties?.outOfScope === true ? 'yes': 'no'} ref={ref} {...otherProps}>
        {children}
      </StartPoint>
    );
  });

  const PortCustom = (props: IPortDefaultProps) => {
    props;
    return <PortDefaultOuter />;
  };

  const LinkCustom = (props) => {
    // console.log("----props---- ", props)
    const { startPos, endPos, link, onLabelDoubleClick } = props;
    const { centerX, centerY } = generateLabelPosition(startPos, endPos);
    return (
      <>
        <LinkDefault {...props} />
        <Label
          style={{ left: centerX, top: centerY }}
          onDoubleClick={ () => { onLabelDoubleClick( { linkId: link.id } ); } }>
          { props.link.properties && props.link.properties.label && (
            <LabelContent>{props.link.properties && props.link.properties.label}</LabelContent>
          )}
        </Label>
      </>
    );
  };

  const startItemStyle = `
  {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    border: 2px solid black;
    background: white;
    color: black;
    line-height: 100px;
    padding: 0;
    text-align: center;
  }
  `;

  const startPoint = {
    port1: {
      id: 'port1',
      type: 'left',
    },
    port2: {
      id: 'port2',
      type: 'right',
    },
    port3: {
      id: 'port3',
      type: 'top',
    },
    port4: {
      id: 'port4',
      type: 'bottom',
    },
  };

  const processQueuePoint = {
    port1: {
      id: 'port1',
      type: 'top',
    },
    port2: {
      id: 'port2',
      type: 'right',
    },
    port3: {
      id: 'port3',
      type: 'bottom',
    },
    port4: {
      id: 'port4',
      type: 'left',
    },
  };

  const processPoint = {
    port1: {
      id: 'port1',
      type: 'top',
    },
    port2: {
      id: 'port2',
      type: 'right',
    },
    port3: {
      id: 'port3',
      type: 'bottom',
    },
    port4: {
      id: 'port4',
      type: 'left',
    },
  };

  const endPoint = {
    port1: {
      id: 'port1',
      type: 'left',
    },
    port2: {
      id: 'port2',
      type: 'right',
    },
    port3: {
      id: 'port3',
      type: 'top',
    },
    port4: {
      id: 'port4',
      type: 'bottom',
    },
  };

  const nodeRoleOptions = [
    {
      rGuid: '001-guid',
      rName: '001',
    },
    {
      rGuid: '002-guid',
      rName: '002',
    },
    {
      rGuid: '003-guid',
      rName: '003',
    },
    {
      rGuid: '004-guid',
      rName: '004',
    },
  ];

  const [workFlowValue, setWorkFlowValue] = useState<IChart>(chartSimple);
  const { statementList } = useThreatsContext();
  const [threatList, setThreatList] = useState(statementList);
  const [strideFilter, setStrideFilter] = useState('');
  const [clickedObjectId, setClickedObjectId] = useState('');
  const [clickedObjectName, setClickedObjectName] = useState('');
  const [clickedObjectDescription, setClickedObjectDescription] = useState('');
  const [clickedObjectOutOfScope, setClickedObjectOutOfScope] = useState(false);
  const [clickedObjectOutOfScopeReason, setClickedObjectOutOfScopeReason] = useState('');
  const handleObjectNameChange = useCallback((newValue) => {
    setClickedObjectName(newValue);
  }, []);
  const handleObjectDescriptionChange = useCallback((newValue) => {
    setClickedObjectDescription(newValue);
  }, []);
  const handleObjectOutOfScopeChange = useCallback((newValue) => {
    setClickedObjectOutOfScope(newValue);
  }, []);
  const handleObjectOutOfScopeReasonChange = useCallback((newValue) => {
    setClickedObjectOutOfScopeReason(newValue);
  }, []);

  const getWorkFlowChartValue = (newWorkFlowValue) => {
    setWorkFlowValue(newWorkFlowValue);
    //console.log('work-flow: ', JSON.stringify(workFlowValue));
  };

  function filterStatementsCallback (filter: string, objectId: string, objectName?: string,
    objectDescription?: string, objectOutOfScope?: boolean, objectOutOfScopeReason?: string) {
    setStrideFilter(filter);
    setClickedObjectId(objectId);
    setClickedObjectName(objectName!);
    setClickedObjectDescription(objectDescription!);
    setClickedObjectOutOfScope(objectOutOfScope!);
    setClickedObjectOutOfScopeReason(objectOutOfScopeReason!);
  };

  useEffect( () => { // update list of threats panel
    setThreatList(statementList.filter(statement => {
      const stride = statement.metadata?.find(m => m.key === 'STRIDE');
      let mergeSTRIDE: string[] = [];
      if (stride && stride.value) {
        mergeSTRIDE = intersectStringArrays(stride.value as string[], strideFilter.split(','));
      }
      if (mergeSTRIDE.length > 0) {
        return true;
      } else {
        return false;
      }
    }));
  }, [strideFilter, setThreatList, statementList]);


  useEffect( () => { // update properties panel
    if (clickedObjectId && clickedObjectId!== '' && workFlowValue.nodes[clickedObjectId]) {
      workFlowValue.nodes[clickedObjectId].properties.name = clickedObjectName;
      workFlowValue.nodes[clickedObjectId].properties.description = clickedObjectDescription;
      workFlowValue.nodes[clickedObjectId].properties.outOfScope = clickedObjectOutOfScope;
      workFlowValue.nodes[clickedObjectId].properties.outOfScopeReason = clickedObjectOutOfScopeReason;
    } else if (clickedObjectId && clickedObjectId!== '' && workFlowValue.links[clickedObjectId]) {
      workFlowValue.links[clickedObjectId].properties.label = clickedObjectName;
      workFlowValue.links[clickedObjectId].properties.description = clickedObjectDescription;
      workFlowValue.links[clickedObjectId].properties.outOfScope = clickedObjectOutOfScope;
      workFlowValue.links[clickedObjectId].properties.outOfScopeReason = clickedObjectOutOfScopeReason;
    }
  }, [workFlowValue, clickedObjectName, clickedObjectId, clickedObjectDescription, clickedObjectOutOfScope, clickedObjectOutOfScopeReason]);

  return (
    <ContentLayout
      header={
        <SpaceBetween size='s'>
          <Header
            variant='h2'
            actions={actions}
          >
          </Header>
        </SpaceBetween>
      }
    >
      {editMode ? (
        <SpaceBetween direction='vertical' size='s'>
          <Container header={<Header>{headerTitle}</Header>}>
            <Grid gridDefinition={[{ colspan: 2 }, { colspan: clickedObjectId!=='' ? 10:10 }, { colspan: clickedObjectId!=='' ? 0:0 }]}>
              <Sidebar>
                <SidebarItem type="start" ports={startPoint} itemStyle={startItemStyle} />
                <SidebarItem type="process-point" ports={processPoint} />
                <SidebarItem type="end" ports={ endPoint } />
                <SidebarItem type="process-queue" ports={processQueuePoint} />
              </Sidebar>
              <div css={diagramWrapper}>
                <FlowChartWithState
                  isAllowAddLinkLabel = {true}
                  initialValue={workFlowValue}
                  nodeRoleOptions={nodeRoleOptions}
                  getWorkFlowChartValue={getWorkFlowChartValue}
                  Components={{
                    Port: PortCustom,
                    Node: NodeCustom,
                    Link: LinkCustom,
                  }}
                  config={{ readonly: !editMode }}
                  filterStatementsCallbaack = {filterStatementsCallback}
                />
              </div>
            </Grid>
          </Container>
          <Container header={<Header>Properties</Header>}>
            <PropertiesPanel
              name={clickedObjectName}
              description={clickedObjectDescription}
              outOfScope={clickedObjectOutOfScope}
              outOfScopeReason={clickedObjectOutOfScopeReason}
              onChangeName={handleObjectNameChange}
              onChangeDescription={handleObjectDescriptionChange}
              onChangeOutOfScope={handleObjectOutOfScopeChange}
              onChangeOutOfScopeReason={handleObjectOutOfScopeReasonChange}
            />
          </Container>
          <ThreatList threats={threatList} clickedObjectId={clickedObjectId} />
        </SpaceBetween>
      ) :
        (<SpaceBetween direction='vertical' size='s'>
          <Header variant='h3' key='diagramInfo'>Description</Header>
          <Header variant='h3' key='diagram'>{diagramTitle}</Header>
        </SpaceBetween>)
      }
    </ContentLayout>
  );
};

export default DiagramCanvas;