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
import { IPortDefaultProps, INodeDefaultProps, LinkDefault, IChart, ITrustBoundaryDefaultProps } from './flowDiagram';
import { Sidebar, SidebarItem } from './flowDiagram/layout';
import { chartSimple } from './flowDiagram/exampleChartState';
import { generateLabelPosition } from './flowDiagram/utils';
import { useThreatsContext } from '../../../contexts';
import intersectStringArrays from '../../../utils/intersectStringArrays';
import ThreatList from './flowDiagram/components/Canvas/ThreatList/ThreatList';
import PropertiesPanel from './flowDiagram/components/Canvas/PropertiesPanel/PropertiesPanel';
import { OptionDefinition } from '@cloudscape-design/components/internal/components/option/interfaces';

const diagramWrapper = css({
  display: 'grid',
  height: '50vh',
  maxHeight: '100%',
  minHeight: '50%',
  width: '100%',
  maxWidth: '100%',
  borderRadius: '10px',
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
  onEditModeChange,
}) => {
  const [editMode, setEditMode] = useState(!entity.description);
  const [workFlowValue, setWorkFlowValue] = useState<IChart>(chartSimple);

  useEffect(() => {
    onEditModeChange?.(editMode);
  }, [editMode, onEditModeChange]);

  const handleSaveDiagramCanvas = useCallback(() => {
    setEditMode(false);
  }, []);

  const handleEdit = useCallback(() => {
    setEditMode(true);
  }, [setEditMode]);


  const actions = useMemo(() => {
    return editMode ? (<SpaceBetween direction='horizontal' size='s'>
      <Button key='cancelBtn' onClick={() => setEditMode(false)}>Cancel</Button>
      <Button key='confirmBtn' variant='primary' onClick={handleSaveDiagramCanvas}>Confirm</Button>
    </SpaceBetween>) : (<Button onClick={handleEdit}>Edit</Button>);
  }, [editMode, handleSaveDiagramCanvas, handleEdit, setEditMode]);

  const Label = styled.div`
  position: absolute;
  width: fit-content;
  `;

  const LabelContent = styled.div`
  padding: 2px 3px;
  background: cornflowerblue;
  color: white;
  border-radius: 3px;
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
  filter: opacity(0%);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: cornflowerblue;
    filter: opacity(100%);
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
    filter: opacity(50%);
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
    filter: opacity(50%);
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
    filter: opacity(50%);
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
    filter: opacity(50%);
  }
  `;

  const TrustBoundaryDefault = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(148, 80, 81);
  color: white;
  border-radius: 50%;
  ${(props: any) => props.isSelected && css`box-shadow: 0 10px 20px rgba(0,0,0,.1); margin-top: -2px`}
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

  // eslint-disable-next-line max-len
  const TrustBoundaryCustom = forwardRef(({ trustBoundary, isSelected, children, ...otherProps }: ITrustBoundaryDefaultProps, ref: React.Ref<HTMLDivElement>) => {
    return (
      <TrustBoundaryDefault outOfScope={trustBoundary.properties?.outOfScope === true ? 'yes': 'no'} ref={ref} {...otherProps}>
        {children}
      </TrustBoundaryDefault>
    );
  });

  const PortCustom = (props: IPortDefaultProps) => {
    props;
    return <PortDefaultOuter />;
  };

  const LinkCustom = (props) => {
    //TODO: we should pass in the current label width for a better positioning system
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

  // const processQueuePoint = {
  //   port1: {
  //     id: 'port1',
  //     type: 'top',
  //   },
  //   port2: {
  //     id: 'port2',
  //     type: 'right',
  //   },
  //   port3: {
  //     id: 'port3',
  //     type: 'bottom',
  //   },
  //   port4: {
  //     id: 'port4',
  //     type: 'left',
  //   },
  // };

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

  /* START>>> TO BE REFACTORED */
  const { statementList } = useThreatsContext();
  const [threatList, setThreatList] = useState(statementList);
  const [selectedThreatList, setSelectedThreatList] = useState<{id: string}[]>([]);
  const [strideFilter, setStrideFilter] = useState('');
  const [clickedObjectId, setClickedObjectId] = useState('');
  const [clickedObjectType, setClickedObjectType] = useState('');
  const [clickedObjectName, setClickedObjectName] = useState('');
  const [clickedObjectDescription, setClickedObjectDescription] = useState('');
  const [clickedObjectOutOfScope, setClickedObjectOutOfScope] = useState(false);
  const [clickedObjectOutOfScopeReason, setClickedObjectOutOfScopeReason] = useState('');
  const [clickedObjectTags, setClickedObjectTags] = useState<string[]>([]);
  const [clickedObjectDataFeatures, setClickedObjectDataFeatures] = useState<ReadonlyArray<OptionDefinition>>();
  const [clickedObjectTechFeatures, setClickedObjectTechFeatures] = useState<ReadonlyArray<OptionDefinition>>();
  const [clickedObjectSecurityFeatures, setClickedObjectSecurityFeatures] = useState<ReadonlyArray<OptionDefinition>>();

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
  const handleObjectTagsChange = useCallback((newValue) => {
    setClickedObjectTags(newValue);
  }, []);
  const handleObjectDataFeaturesChange = useCallback((newValue) => {
    setClickedObjectDataFeatures(newValue);
  }, []);
  const handleObjectTechFeaturesChange = useCallback((newValue) => {
    setClickedObjectTechFeatures(newValue);
  }, []);
  const handleObjectSecurityFeaturesChange = useCallback((newValue) => {
    setClickedObjectSecurityFeatures(newValue);
  }, []);

  const handleThreatsSelectionChange = useCallback((newValue) => {
    setSelectedThreatList(newValue);
  }, []);

  const getWorkFlowChartValue = (newWorkFlowValue) => {
    setWorkFlowValue(newWorkFlowValue);
  };

  function filterStatementsCallback (
    filter: string,
    objectId: string,
    objectType: string,
    objectName?: string,
    objectDescription?: string,
    objectOutOfScope?: boolean,
    objectOutOfScopeReason?: string,
    objectTags?: string[],
    dataFeatures?: ReadonlyArray<OptionDefinition>,
    techFeatures?: ReadonlyArray<OptionDefinition>,
    securityFeatures?: ReadonlyArray<OptionDefinition>,
    threats?: {id: string}[]) {
    setStrideFilter(filter);
    setClickedObjectId(objectId);
    setClickedObjectType(objectType);
    setClickedObjectName(objectName!);
    setClickedObjectDescription(objectDescription!);
    setClickedObjectOutOfScope(objectOutOfScope!);
    setClickedObjectOutOfScopeReason(objectOutOfScopeReason!);
    setClickedObjectTags(objectTags!);
    setClickedObjectDataFeatures(dataFeatures!);
    setClickedObjectTechFeatures(techFeatures!);
    setClickedObjectSecurityFeatures(securityFeatures!);
    setSelectedThreatList(threats!);
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
      workFlowValue.nodes[clickedObjectId].properties.tags = clickedObjectTags;
      workFlowValue.nodes[clickedObjectId].properties.dataFeatures = clickedObjectDataFeatures;
      workFlowValue.nodes[clickedObjectId].properties.techFeatures = clickedObjectTechFeatures;
      workFlowValue.nodes[clickedObjectId].properties.securityFeatures = clickedObjectSecurityFeatures;
      workFlowValue.nodes[clickedObjectId].properties.threats = selectedThreatList;
    } else if (clickedObjectId && clickedObjectId!== '' && workFlowValue.links[clickedObjectId]) {
      workFlowValue.links[clickedObjectId].properties.label = clickedObjectName;
      workFlowValue.links[clickedObjectId].properties.description = clickedObjectDescription;
      workFlowValue.links[clickedObjectId].properties.outOfScope = clickedObjectOutOfScope;
      workFlowValue.links[clickedObjectId].properties.outOfScopeReason = clickedObjectOutOfScopeReason;
      workFlowValue.links[clickedObjectId].properties.tags = clickedObjectTags;
      workFlowValue.links[clickedObjectId].properties.dataFeatures = clickedObjectDataFeatures;
      workFlowValue.links[clickedObjectId].properties.techFeatures = clickedObjectTechFeatures;
      workFlowValue.links[clickedObjectId].properties.securityFeatures = clickedObjectSecurityFeatures;
      workFlowValue.links[clickedObjectId].properties.threats = selectedThreatList;
    } else if (clickedObjectId && clickedObjectId!== '' && workFlowValue.trustBoundaries[clickedObjectId]) {
      workFlowValue.trustBoundaries[clickedObjectId].properties.name = clickedObjectName;
      workFlowValue.trustBoundaries[clickedObjectId].properties.description = clickedObjectDescription;
      workFlowValue.trustBoundaries[clickedObjectId].properties.outOfScope = clickedObjectOutOfScope;
      workFlowValue.trustBoundaries[clickedObjectId].properties.outOfScopeReason = clickedObjectOutOfScopeReason;
      workFlowValue.trustBoundaries[clickedObjectId].properties.tags = clickedObjectTags;
      workFlowValue.trustBoundaries[clickedObjectId].properties.dataFeatures = clickedObjectDataFeatures;
      workFlowValue.trustBoundaries[clickedObjectId].properties.techFeatures = clickedObjectTechFeatures;
      workFlowValue.trustBoundaries[clickedObjectId].properties.securityFeatures = clickedObjectSecurityFeatures;
      workFlowValue.trustBoundaries[clickedObjectId].properties.threats = selectedThreatList;
    }
  }, [workFlowValue, clickedObjectName, clickedObjectId, clickedObjectDescription,
    clickedObjectOutOfScope, clickedObjectOutOfScopeReason, clickedObjectTags, selectedThreatList,
    clickedObjectDataFeatures, clickedObjectTechFeatures, clickedObjectSecurityFeatures]);
  /* END>>> TO BE REFACTORED */

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
            <Grid gridDefinition={[{ colspan: 1 }, { colspan: 11 }]}>
              <Sidebar>
                <SidebarItem type="start" ports={startPoint} />
                <SidebarItem type="process-point" ports={processPoint} />
                <SidebarItem type="end" ports={ endPoint } />
                <SidebarItem type="process-queue" />
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
                    TrustBoundary: TrustBoundaryCustom,
                  }}
                  config={{ readonly: !editMode }}
                  filterStatementsCallback = {filterStatementsCallback}
                />
              </div>
            </Grid>
          </Container>
          <Container header={<Header>Properties</Header>}>
            <PropertiesPanel
              type={clickedObjectType}
              name={clickedObjectName}
              description={clickedObjectDescription}
              outOfScope={clickedObjectOutOfScope}
              outOfScopeReason={clickedObjectOutOfScopeReason}
              tags={clickedObjectTags}
              dataFeatures={clickedObjectDataFeatures}
              techFeatures={clickedObjectTechFeatures}
              securityFeatures={clickedObjectSecurityFeatures}
              onChangeName={handleObjectNameChange}
              onChangeDescription={handleObjectDescriptionChange}
              onChangeOutOfScope={handleObjectOutOfScopeChange}
              onChangeOutOfScopeReason={handleObjectOutOfScopeReasonChange}
              onChangeTags={handleObjectTagsChange}
              onChangeDataFeatures={handleObjectDataFeaturesChange}
              onChangeTechFeatures={handleObjectTechFeaturesChange}
              onChangeSecurityFeatures={handleObjectSecurityFeaturesChange}
            />
          </Container>
          <ThreatList
            threats={threatList}
            clickedObjectId={clickedObjectId}
            selectedThreats={selectedThreatList}
            onThreatsSelectionChange={handleThreatsSelectionChange} />
        </SpaceBetween>
      ) :
        (<SpaceBetween direction='vertical' size='s'>
          <Header variant='h3' key='diagramInfo'>Description</Header>
          <Header variant='h3' key='diagram'>{diagramTitle}</Header>
          <div css={diagramWrapper}>
            <FlowChartWithState
              isAllowAddLinkLabel = {false}
              initialValue={workFlowValue}
              nodeRoleOptions={nodeRoleOptions}
              Components={{
                Port: PortCustom,
                Node: NodeCustom,
                Link: LinkCustom,
                TrustBoundary: TrustBoundaryCustom,
              }}
              config={{ readonly: true }}
            />
          </div>
        </SpaceBetween>)
      }
    </ContentLayout>
  );
};

export default DiagramCanvas;