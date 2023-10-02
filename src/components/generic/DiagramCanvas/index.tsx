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
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { FC, useCallback, useState, useMemo, useEffect, forwardRef } from 'react';
import { BaseImageInfo, EditableComponentBaseProps } from '../../../customTypes';

import FlowChartWithState from './flowDiagram/components/FlowChart/FlowChartWithState';
import { IPortDefaultProps, INodeDefaultProps, LinkDefault } from './flowDiagram';
import { Content, Sidebar, SidebarItem } from './flowDiagram/layout';
import { chartSimple } from './flowDiagram/exampleChartState';
import { generateLabelPosition } from './flowDiagram/utils';

export interface DiagramCanvasProps extends EditableComponentBaseProps {
  entity: BaseImageInfo;
  headerTitle: string;
  diagramTitle: string;
  onConfirm: (info: BaseImageInfo) => void;
}

const DiagramCanvas: FC<DiagramCanvasProps> = ({
  headerTitle,
  diagramTitle,
  entity,
  onConfirm,
  onEditModeChange,
}) => {
  const [editMode, setEditMode] = useState(!entity.description && !entity.image);
  const [image, setImage] = useState<string>('');
  const [content, setContent] = useState('');

  useEffect(() => {
    onEditModeChange?.(editMode);
  }, [editMode]);

  const handleSaveDiagramCanvas = useCallback(() => {
    onConfirm({
      image,
      description: content,
    });
    setEditMode(false);
  }, [image, content, onConfirm]);

  const handleEdit = useCallback(() => {
    setContent(entity.description || '');
    setImage(entity.image || '');
    setEditMode(true);
  }, [entity, setContent, setEditMode, setImage]);

  const actions = useMemo(() => {
    return editMode ? (<SpaceBetween direction='horizontal' size='s'>
      <Button key='cancelBtn' onClick={() => setEditMode(false)}>Cancel</Button>
      <Button key='confirmBtn' variant='primary' onClick={handleSaveDiagramCanvas}>Confirm</Button>
    </SpaceBetween>) : (<Button onClick={handleEdit}>Edit</Button>);
  }, [editMode, handleSaveDiagramCanvas, handleEdit, setEditMode]);

  /*
  const Input = styled.input`
    padding: 10px;
    border: 1px solid cornflowerblue;
    width: 100%;
  `
  */
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

  /*
  interface Port {
  id: string,
  type: string,
  position?: any
  }
  */

  const Message = styled.div`
  margin: 10px;
  padding: 10px;
  background: rgba(0,0,0,0.05);
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

  const ProcessQueue = styled.div`
  width: 120px;
  height: 60px;
  position: absolute;
  text-align: center;
  padding: 0px;
  justify-content: center;
  align-items: center;
  background: white;
  color: black;
  border-radius: 10px;
  border: 2px dashed black;
  & div {
    padding: 0px;
    margin: 0px;
  }
  `;

  const ProcessPoint = styled.div`
  width: 120px;
  height: 60px;
  text-align: center;
  position: absolute;
  justify-content: center;
  align-items: center;
  padding: 0px;
  background: white;
  border: 2px solid black;
  color: black;
  & div {
    padding: 0px;
    margin: 0px;
  }
  `;

  const StartPoint = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  padding: 0px;
  display: flex;
  border: 2px solid black;
  justify-content: center;
  align-items: center;
  background: white;
  color: black;
  border-radius: 50%;
  `;

  const EndPoint = styled.div`
  position: absolute;
  width: 120px;
  height: 60px;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  color: black;
  border-top: 4px solid black;
  border-bottom: 4px solid black;
  `;


  const NodeCustom = forwardRef(({ node, children, ...otherProps }: INodeDefaultProps, ref: React.Ref<HTMLDivElement>) => {
    switch (node.type) {
      case 'start':
        return (
          <StartPoint ref={ref} {...otherProps}>
            {children}
          </StartPoint>
        );
      case 'end':
        return (
          <EndPoint ref={ref} {...otherProps}>
            {children}
          </EndPoint>
        );
      case 'process-queue':
        return (
          <ProcessQueue ref={ref} {...otherProps}>
            {children}
          </ProcessQueue>
        );
      case 'process-point':
        return (
          <ProcessPoint ref={ref} {...otherProps}>
            {children}
          </ProcessPoint>
        );
    }
    return (
      <StartPoint ref={ref} {...otherProps}>
        {children}
      </StartPoint>
    );
  });

  const PortCustom = (props: IPortDefaultProps) => {
    console.log('DiagramCanvas >>> PortCustom: ', props);
    return <PortDefaultOuter />;
  };

  const LinkCustom = (props) => {
    // console.log("----props---- ", props)
    const { startPos, endPos, link, onLabelDoubleClick } = props;
    const { centerX, centerY } = generateLabelPosition(startPos, endPos);
    return (
      <>
        <LinkDefault {...props} />
        <Label style={{ left: centerX, top: centerY }} onDoubleClick={ () => { onLabelDoubleClick( { linkId: link.id } ); } }>
          { props.link.properties && props.link.properties.label && (
            <LabelContent>{props.link.properties && props.link.properties.label}</LabelContent>
          )}
        </Label>
      </>
    );
  };

  /*
  function validateLink({ linkId, fromNodeId, fromPortId, toNodeId, toPortId, chart }): boolean {

  if (fromNodeId === toNodeId) {
    return false
  }

  return true;
  }
  */

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
    port5: {
      id: 'port5',
      type: 'left',
    },
    port6: {
      id: 'port6',
      type: 'right',
    },
    port7: {
      id: 'port7',
      type: 'top',
    },
    port8: {
      id: 'port8',
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

  let workFlowValue = {};

  let getWorkFlowChartValue = (newWorkFlowValue) => {
    workFlowValue = newWorkFlowValue;
    console.log('work-flow: ', JSON.stringify(workFlowValue));
  };

  return (
    <Container header={<Header actions={actions}>{headerTitle}</Header>}>
      {editMode ? (
        <SpaceBetween direction='vertical' size='s'>

          <Sidebar>
            <Message>
              Drag and drop these items onto the canvas.
            </Message>
            <SidebarItem type="start" ports={startPoint} itemStyle={startItemStyle} />
            <SidebarItem type="process-point" ports={processPoint} />
            <SidebarItem type="end" ports={ endPoint } />
            <SidebarItem type="process-queue" ports={processQueuePoint} />
          </Sidebar>

          <Content>
            <FlowChartWithState
              isAllowAddLinkLabel = {true}
              initialValue={chartSimple}
              nodeRoleOptions={nodeRoleOptions}
              getWorkFlowChartValue={getWorkFlowChartValue}
              Components={{
                Port: PortCustom,
                Node: NodeCustom,
                Link: LinkCustom,
              }}
              config={{ readonly: false }}
            />
          </Content>

        </SpaceBetween>) :
        (<SpaceBetween direction='vertical' size='s'>
          <Header variant='h3' key='diagramInfo'>Description</Header>
          <Header variant='h3' key='diagram'>{diagramTitle}</Header>
        </SpaceBetween>)
      }
    </Container>
  );
};

export default DiagramCanvas;