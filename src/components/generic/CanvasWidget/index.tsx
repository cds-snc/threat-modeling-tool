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
import { FC, useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css, Global } from '@emotion/react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import Grid from '@cloudscape-design/components/grid';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import createEngine, { DefaultDiagramState, DefaultLabelModel, DiagramModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import ProcessNodeModel from './CustomNode/ProcessNode/ProcessNodeModel';
import { ProcessNodeFactory, ProcessPortModel, SimplePortFactory } from './CustomNode/ProcessNode';
import DatastoreNodeModel from './CustomNode/DatastoreNode/DatastoreNodeModel';
import { DatastoreNodeFactory, DatastorePortModel } from './CustomNode/DatastoreNode';
import { StraightArrowLinkFactory } from './CustomLink/StraightArrowLink';
import { ActorNodeFactory, ActorPortModel } from './CustomNode/ActorNode';
import ActorNodeModel from './CustomNode/ActorNode/ActorNodeModel';
import { TrayItemWidget, TrayWidget } from './TrayWidget';
import { Container, Header } from '@cloudscape-design/components';
import PropertiesPanel from '../DiagramCanvas/flowDiagram/components/Canvas/PropertiesPanel/PropertiesPanel';
import { OptionDefinition } from '@cloudscape-design/components/internal/components/option/interfaces';
import StraightArrowLinkModel from './CustomLink/StraightArrowLink/StraightArrowLinkModel';
import { useThreatsContext } from '../../../contexts';
import intersectStringArrays from '../../../utils/intersectStringArrays';
import ThreatList from '../DiagramCanvas/flowDiagram/components/Canvas/ThreatList/ThreatList';
import { BaseImageInfo, EditableComponentBaseProps } from '../../../customTypes';
import { MarkdownEditorProps } from '../MarkdownEditor';
import { useWorkspacesContext } from '../../../contexts/WorkspacesContext';
import TrustBoundaryNodeModel from './CustomNode/TrustBoundaryNode/TrustBoundaryNodeModel';
import { TrustBoundaryNodeFactory } from './CustomNode/TrustBoundaryNode';

const diagramWrapper = css({
  display: 'grid',
  height: '60vh',
  maxHeight: '100%',
  minHeight: '50%',
  width: '100%',
  maxWidth: '100%',
  borderRadius: '10px',
});

namespace S {
  export const OuterContainer = styled.div`
    background: black;
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: 5px;
    overflow: hidden;
  `;

  export const Toolbar = styled.div`
    padding: 5px;
    display: flex;
    flex-shrink: 0;
    flex-grow: 1;
    flex-direction: row;
    background: black;
  `;

  export const InnerContainer = styled.div<{ color: string; background: string }>`
		height: 100%;
		background-color: ${(p) => p.background};
		background-size: 50px 50px;
		display: flex;

		> * {
			height: 100%;
			min-height: 100%;
			width: 100%;
		}

		background-image: linear-gradient(
				0deg,
				transparent 24%,
				${(p) => p.color} 25%,
				${(p) => p.color} 26%,
				transparent 27%,
				transparent 74%,
				${(p) => p.color} 75%,
				${(p) => p.color} 76%,
				transparent 77%,
				transparent
			),
			linear-gradient(
				90deg,
				transparent 24%,
				${(p) => p.color} 25%,
				${(p) => p.color} 26%,
				transparent 27%,
				transparent 74%,
				${(p) => p.color} 75%,
				${(p) => p.color} 76%,
				transparent 77%,
				transparent
			);
	`;

  export const Content = styled.div`
    flex-grow: 1;
    height: 100%;
  `;

  export const Expand = css`
		html,
		body,
		#root {
			height: 100%;
		}
	`;
}

export interface BaseDiagramInfoProps extends EditableComponentBaseProps {
  entity: BaseImageInfo;
  headerTitle: string;
  diagramTitle: string;
  validateData?: MarkdownEditorProps['validateData'];
}

const DFDCanvasWidget: FC<BaseDiagramInfoProps> = ({
  headerTitle,
  diagramTitle,
  entity,
  onEditModeChange,
}) => {

  function registerFactories(engine) {
    engine
      .getPortFactories()
      .registerFactory(new SimplePortFactory('process', (_config) => new ProcessPortModel(PortModelAlignment.TOP)));
    engine.getNodeFactories().registerFactory(new ProcessNodeFactory(filterStatementsCallback));
    engine
      .getPortFactories()
      .registerFactory(new SimplePortFactory('datastore', (_config) => new DatastorePortModel(PortModelAlignment.TOP)));
    engine.getNodeFactories().registerFactory(new DatastoreNodeFactory(filterStatementsCallback));
    engine
      .getPortFactories()
      .registerFactory(new SimplePortFactory('actor', (_config) => new ActorPortModel(PortModelAlignment.TOP)));
    engine.getNodeFactories().registerFactory(new ActorNodeFactory(filterStatementsCallback));

    engine.getNodeFactories().registerFactory(new TrustBoundaryNodeFactory({
      nodeWidth: 150,
      nodeHeight: 100,
      nodeX: 0,
      nodeY: 0,
      filterStatementsCallback: filterStatementsCallback,
    }));

    engine.getLinkFactories().registerFactory(new StraightArrowLinkFactory(filterStatementsCallback));
  };

  headerTitle;
  diagramTitle;
  const [editMode, _setEditMode] = useState(!entity.description && !entity.image);
  const { currentWorkspace } = useWorkspacesContext();
  const [content, setContent] = useState(JSON.parse( localStorage.getItem(`json-diagram-${currentWorkspace?.id}`) || '""'));
  const { statementList } = useThreatsContext();
  const [threatList, setThreatList] = useState(statementList);
  const [selectedThreatList, setSelectedThreatList] = useState<{id: string}[]>([]);
  const [strideFilter, setStrideFilter] = useState('');
  const [clickedObjectId, setClickedObjectId] = useState('');
  const [clickedObjectType, _setClickedObjectType] = useState('');
  const [clickedObjectName, setClickedObjectName] = useState('');
  const [clickedObjectDescription, setClickedObjectDescription] = useState('');
  const [clickedObjectOutOfScope, setClickedObjectOutOfScope] = useState(false);
  const [clickedObjectOutOfScopeReason, setClickedObjectOutOfScopeReason] = useState('');
  const [clickedObjectTags, setClickedObjectTags] = useState<string[]>([]);
  const [clickedObjectDataFeatures, setClickedObjectDataFeatures] = useState<ReadonlyArray<OptionDefinition>>();
  const [clickedObjectTechFeatures, setClickedObjectTechFeatures] = useState<ReadonlyArray<OptionDefinition>>();
  const [clickedObjectSecurityFeatures, setClickedObjectSecurityFeatures] = useState<ReadonlyArray<OptionDefinition>>();
  const [selectedLink, setSelectedLink] = useState<{
    positionX?: number;
    positionY?: number;
    link?: StraightArrowLinkModel;
  }>({
    positionX: 0, positionY: 0, link: undefined,
  });

  useEffect(() => {
    onEditModeChange?.(editMode);
  }, [editMode, onEditModeChange]);

  //const [modelJSON, setModelJSON] = useState('{"id":"b38b674a-8351-4f25-974b-1cda112346be","offsetX":0,"offsetY":0,"zoom":100,"gridSize":0,"layers":[{"id":"94bc227d-520e-44dc-8efe-e4da59c745f0","type":"diagram-links","isSvg":true,"transformed":true,"models":{"e58f38a6-b668-4789-a0c9-4bd3821de249":{"id":"e58f38a6-b668-4789-a0c9-4bd3821de249","type":"straight-arrow","source":"106e8aac-2f0c-450b-bd2f-199764cbbbab","sourcePort":"134b3986-9ffa-4792-85b2-308c41ea7b68","target":"61faa149-f4ae-462f-ad26-4e24831913af","targetPort":"f00a542d-38b2-42bb-95e4-5a46d3db5c2e","points":[{"id":"db27ce48-cb74-46a1-8d52-88ee2a85131f","type":"point","x":250,"y":158},{"id":"64d06078-0933-450b-a4d5-9385d41fd572","type":"point","x":450,"y":158}],"labels":[{"id":"1f4807b1-f34d-4b22-af24-d0f1f04dfeaa","type":"default","offsetX":0,"offsetY":-23,"label":"Actor --> Process"}],"width":4,"color":"gray","curvyness":50,"selectedColor":"rgb(0,192,255)"},"f84f3da5-85f6-4021-b4ff-7a0fff5451e8":{"id":"f84f3da5-85f6-4021-b4ff-7a0fff5451e8","type":"straight-arrow","source":"61faa149-f4ae-462f-ad26-4e24831913af","sourcePort":"3eaae707-19cc-4f37-8916-9941c8e8b506","target":"b1afd513-8d0e-452e-bbd6-fcd9d88da278","targetPort":"086d5ff8-7f85-41d4-b849-10def0882e89","points":[{"id":"6fa1e51d-9915-44c9-b408-88297156a0c6","type":"point","x":500,"y":208},{"id":"2fd6f72a-0afa-4fcc-a6de-373125f6abb4","type":"point","x":500,"y":338}],"labels":[{"id":"ccb5a308-9490-46d3-b8c4-14f15d66debf","type":"default","offsetX":0,"offsetY":-23,"label":"Process --> Datastore"}],"width":4,"color":"gray","curvyness":50,"selectedColor":"rgb(0,192,255)"}}},{"id":"115674ac-bfba-47c5-8ad9-9bec2f84b769","type":"diagram-nodes","isSvg":false,"transformed":true,"models":{"61faa149-f4ae-462f-ad26-4e24831913af":{"id":"61faa149-f4ae-462f-ad26-4e24831913af","type":"process","x":450,"y":108,"ports":[{"id":"5a0ec17f-477c-43b8-bbd6-1aae3ea13383","type":"process","x":492,"y":100,"name":"top","alignment":"top","parentNode":"61faa149-f4ae-462f-ad26-4e24831913af","links":[],"label":"top"},{"id":"f00a542d-38b2-42bb-95e4-5a46d3db5c2e","type":"process","x":442,"y":150,"name":"left","alignment":"left","parentNode":"61faa149-f4ae-462f-ad26-4e24831913af","links":["e58f38a6-b668-4789-a0c9-4bd3821de249"],"label":"left"},{"id":"3eaae707-19cc-4f37-8916-9941c8e8b506","type":"process","x":492,"y":200,"name":"bottom","alignment":"bottom","parentNode":"61faa149-f4ae-462f-ad26-4e24831913af","links":["f84f3da5-85f6-4021-b4ff-7a0fff5451e8"],"label":"bottom"},{"id":"cff9d820-3278-4472-93f4-03553ae7d4d5","type":"process","x":542,"y":150,"name":"right","alignment":"right","parentNode":"61faa149-f4ae-462f-ad26-4e24831913af","links":[],"label":"right"}]},"b1afd513-8d0e-452e-bbd6-fcd9d88da278":{"id":"b1afd513-8d0e-452e-bbd6-fcd9d88da278","type":"datastore","x":440,"y":338,"ports":[{"id":"086d5ff8-7f85-41d4-b849-10def0882e89","type":"datastore","x":492,"y":330,"name":"top","alignment":"top","parentNode":"b1afd513-8d0e-452e-bbd6-fcd9d88da278","links":["f84f3da5-85f6-4021-b4ff-7a0fff5451e8"],"label":"top"},{"id":"85bc32b2-80f3-4604-bc98-2e2d3aaf6223","type":"datastore","x":432,"y":360,"name":"left","alignment":"left","parentNode":"b1afd513-8d0e-452e-bbd6-fcd9d88da278","links":[],"label":"left"},{"id":"32cad184-0dab-485f-8d72-89c849c46aee","type":"datastore","x":492,"y":390,"name":"bottom","alignment":"bottom","parentNode":"b1afd513-8d0e-452e-bbd6-fcd9d88da278","links":[],"label":"bottom"},{"id":"3a950bc2-f15b-4bac-8b18-5106f871a491","type":"datastore","x":552,"y":360,"name":"right","alignment":"right","parentNode":"b1afd513-8d0e-452e-bbd6-fcd9d88da278","links":[],"label":"right"}]},"106e8aac-2f0c-450b-bd2f-199764cbbbab":{"id":"106e8aac-2f0c-450b-bd2f-199764cbbbab","type":"actor","x":130,"y":128,"ports":[{"id":"7076e056-12ef-4eea-9da8-b84e3f6685c7","type":"actor","x":182,"y":120,"name":"top","alignment":"top","parentNode":"106e8aac-2f0c-450b-bd2f-199764cbbbab","links":[],"label":"top"},{"id":"ccea5e13-2d70-459d-9de1-8cd870dcacb1","type":"actor","x":122,"y":150,"name":"left","alignment":"left","parentNode":"106e8aac-2f0c-450b-bd2f-199764cbbbab","links":[],"label":"left"},{"id":"3a6a1335-0f1c-40a3-9c19-459091873de9","type":"actor","x":182,"y":180,"name":"bottom","alignment":"bottom","parentNode":"106e8aac-2f0c-450b-bd2f-199764cbbbab","links":[],"label":"bottom"},{"id":"134b3986-9ffa-4792-85b2-308c41ea7b68","type":"actor","x":242,"y":150,"name":"right","alignment":"right","parentNode":"106e8aac-2f0c-450b-bd2f-199764cbbbab","links":["e58f38a6-b668-4789-a0c9-4bd3821de249"],"label":"right"}]}}}]}');
  var initialEngine = createEngine();
  const model = new DiagramModel();
  registerFactories(initialEngine);
  if (content && content !== '') {
    var jsonModel = JSON.parse(content);
    model.deserializeModel(jsonModel, initialEngine);
  }
  model.registerListener({
    eventDidFire: handleEventDidFire,
  });

  initialEngine.setModel(model);
  initialEngine.repaintCanvas();

  const [engine, _setEngine] = useState(initialEngine);

  const handleSerialize = useCallback( () => {
    // unselect first any entity in the diagram
    engine.getModel().clearSelection();
    var diagramContent = JSON.stringify(engine.getModel().serialize());
    localStorage.setItem(`json-diagram-${currentWorkspace?.id}`, JSON.stringify(diagramContent));
  }, [currentWorkspace?.id, engine]);

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


  const engineState = engine.getStateMachine().getCurrentState();
  if (engineState instanceof DefaultDiagramState) {
    engineState.dragNewLink.config.allowLooseLinks = false;
  }

  function filterStatementsCallback (
    filter: string,
    objectId: string,
    _objectType: string,
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

  useEffect( () => { // edit selected entitity
    engine.getModel().getNodes().forEach( (node) => {
      console.log('selecte node info', node);
      if (node.isSelected()) {
        switch (node.getOptions().type) {
          case 'actor':
            ( node as ActorNodeModel ).name = clickedObjectName;
            ( node as ActorNodeModel ).description = clickedObjectDescription;
            ( node as ActorNodeModel ).outOfScope = clickedObjectOutOfScope;
            ( node as ActorNodeModel ).outOfScopeReason = clickedObjectOutOfScopeReason;
            ( node as ActorNodeModel ).tags = clickedObjectTags;
            ( node as ActorNodeModel ).dataFeatures = clickedObjectDataFeatures;
            ( node as ActorNodeModel ).techFeatures = clickedObjectTechFeatures;
            ( node as ActorNodeModel ).securityFeatures = clickedObjectSecurityFeatures;
            ( node as ActorNodeModel ).threats = selectedThreatList;
            break;
          case 'process':
            ( node as ProcessNodeModel ).name = clickedObjectName;
            ( node as ProcessNodeModel ).description = clickedObjectDescription;
            ( node as ProcessNodeModel ).outOfScope = clickedObjectOutOfScope;
            ( node as ProcessNodeModel ).outOfScopeReason = clickedObjectOutOfScopeReason;
            ( node as ProcessNodeModel ).tags = clickedObjectTags;
            ( node as ProcessNodeModel ).dataFeatures = clickedObjectDataFeatures;
            ( node as ProcessNodeModel ).techFeatures = clickedObjectTechFeatures;
            ( node as ProcessNodeModel ).securityFeatures = clickedObjectSecurityFeatures;
            ( node as ProcessNodeModel ).threats = selectedThreatList;
            break;
          case 'datastore':
            ( node as DatastoreNodeModel ).name = clickedObjectName;
            ( node as DatastoreNodeModel ).description = clickedObjectDescription;
            ( node as DatastoreNodeModel ).outOfScope = clickedObjectOutOfScope;
            ( node as DatastoreNodeModel ).outOfScopeReason = clickedObjectOutOfScopeReason;
            ( node as DatastoreNodeModel ).tags = clickedObjectTags;
            ( node as DatastoreNodeModel ).dataFeatures = clickedObjectDataFeatures;
            ( node as DatastoreNodeModel ).techFeatures = clickedObjectTechFeatures;
            ( node as DatastoreNodeModel ).securityFeatures = clickedObjectSecurityFeatures;
            ( node as DatastoreNodeModel ).threats = selectedThreatList;
            break;
          case 'trust-boundary':
            ( node as TrustBoundaryNodeModel ).name = clickedObjectName;
            ( node as TrustBoundaryNodeModel ).description = clickedObjectDescription;
            ( node as TrustBoundaryNodeModel ).outOfScope = clickedObjectOutOfScope;
            ( node as TrustBoundaryNodeModel ).outOfScopeReason = clickedObjectOutOfScopeReason;
            ( node as TrustBoundaryNodeModel ).tags = clickedObjectTags;
            break;
        }
      }
    });
    engine.getModel().getLinks().forEach( (link) => {
      if (link.isSelected() && link.getLabels()[0]) {
        (link.getLabels()[0] as DefaultLabelModel).setLabel(clickedObjectName);
        ( link as StraightArrowLinkModel ).name = clickedObjectName;
        ( link as StraightArrowLinkModel ).description = clickedObjectDescription;
        ( link as StraightArrowLinkModel ).outOfScope = clickedObjectOutOfScope;
        ( link as StraightArrowLinkModel ).outOfScopeReason = clickedObjectOutOfScopeReason;
        ( link as StraightArrowLinkModel ).tags = clickedObjectTags;
        ( link as StraightArrowLinkModel ).dataFeatures = clickedObjectDataFeatures;
        ( link as StraightArrowLinkModel ).techFeatures = clickedObjectTechFeatures;
        ( link as StraightArrowLinkModel ).securityFeatures = clickedObjectSecurityFeatures;
        ( link as StraightArrowLinkModel ).filterStatementsCallback = filterStatementsCallback;
        ( link as StraightArrowLinkModel ).threats = selectedThreatList;
      }
    });
    engine.repaintCanvas();
  }, [engine, clickedObjectDataFeatures, clickedObjectDescription, clickedObjectName, clickedObjectOutOfScope,
    clickedObjectOutOfScopeReason, clickedObjectSecurityFeatures, clickedObjectTags, clickedObjectTechFeatures,
    selectedThreatList]);

  function handleZoomIn(_event) {
    let scale = engine?.getCanvas().style.transform;
    if (engine) {
      switch (scale) {
        case '':
          engine.getCanvas().style.transform = 'scale(1.1)';
          break;
        case 'scale(0.7)':
          engine.getCanvas().style.transform = 'scale(0.8)';
          break;
        case 'scale(0.8)':
          engine.getCanvas().style.transform = 'scale(0.9)';
          break;
        case 'scale(0.9)':
          engine.getCanvas().style.transform = 'scale(1)';
          break;
        case 'scale(1)':
          engine.getCanvas().style.transform = 'scale(1.1)';
          break;
        case 'scale(1.1)':
          engine.getCanvas().style.transform = 'scale(1.2)';
          break;
        case 'scale(1.2)':
          engine.getCanvas().style.transform = 'scale(1.3)';
          break;
      }
      engine.getCanvas().style.transformOrigin = 'top left';
    }
  };

  function handleZoomOut(_event) {
    let scale = engine?.getCanvas().style.transform;
    if (engine) {
      switch (scale) {
        case '':
          engine.getCanvas().style.transform = 'scale(0.9)';
          break;
        case 'scale(1.3)':
          engine.getCanvas().style.transform = 'scale(1.2)';
          break;
        case 'scale(1.2)':
          engine.getCanvas().style.transform = 'scale(1.1)';
          break;
        case 'scale(1.2)':
          engine.getCanvas().style.transform = 'scale(1.1)';
          break;
        case 'scale(1.1)':
          engine.getCanvas().style.transform = 'scale(1)';
          break;
        case 'scale(1)':
          engine.getCanvas().style.transform = 'scale(0.9)';
          break;
        case 'scale(0.9)':
          engine.getCanvas().style.transform = 'scale(0.8)';
          break;
        case 'scale(0.8)':
          engine.getCanvas().style.transform = 'scale(0.7)';
          break;
      }
      engine.getCanvas().style.transformOrigin = 'top left';
    }
  };

  function handleZoomToFit(_event) {
    if (engine) {
      engine.zoomToFit();
    }
  };

  function handleZoomReset(_event) {
    if (engine) {
      engine.getCanvas().style.transform = 'scale(1)';
    }
  };

  function handleEventDidFire(event) {
    if (event.function === 'linksUpdated') {
      setSelectedLink({
        positionX: event.link.getPoints()[1].getPosition().x,
        positionY: event.link.getPoints()[1].getPosition().y,
        link: event.link,
      });
      // unselect all previously selected entities
      engine.getModel().clearSelection();
    }
    var diagramContent = JSON.stringify(engine.getModel().serialize());
    setContent(diagramContent);
  };

  onmouseup = (event) => {
    if ( selectedLink.link !== undefined ) {
      if (selectedLink.link?.getPoints()[1].getPosition().x !== selectedLink.positionX &&
      selectedLink.link?.getPoints()[1].getPosition().y !== selectedLink.positionY) {
        setClickedObjectName('');
        if (selectedLink.link?.getLabels().length === 1) {
          (selectedLink.link.getLabels()[0] as DefaultLabelModel).setLabel(clickedObjectName);
        } else {
          selectedLink.link?.addLabel(clickedObjectName);
        }
        selectedLink.link?.setSelected(true);
        engine.repaintCanvas();
        setSelectedLink({
          positionX: 0, positionY: 0, link: undefined,
        });
      }
      event.stopPropagation();
    }
  };

  return (
    <SpaceBetween direction="vertical" size="s">
      <S.OuterContainer>
        <Global styles={S.Expand} />
        <S.Toolbar>
          <SpaceBetween direction="horizontal" size="xs">
            <Button iconName="zoom-out" variant="primary" ariaLabel="Zoom out" onClick={handleZoomOut} />
            <Button iconName="zoom-in" variant="primary" ariaLabel="Zoom in" onClick={handleZoomIn} />
            <Button iconName="zoom-to-fit" variant="primary" ariaLabel="Zoom to fit" onClick={handleZoomToFit} />
            <Button iconName="expand" variant="primary" ariaLabel="Reset zoom" onClick={handleZoomReset} />
            <Button variant="primary" ariaLabel="Confirm changes" onClick={handleSerialize}>Save</Button>
          </SpaceBetween>
        </S.Toolbar>

        <Grid
          gridDefinition={[
            { colspan: 1 },
            { colspan: 11 },
          ]}
        >
          <TrayWidget>
            <TrayItemWidget model={'actor'} />
            <TrayItemWidget model={'process'} />
            <TrayItemWidget model={'datastore'} />
            <TrayItemWidget model={'trust-boundary'} />
          </TrayWidget>

          <S.InnerContainer
            background={'rgb(228, 222, 222)'}
            color={'rgba(47, 44, 44, 0.05)'}
            onDrop={(event) => {
              // unselect all previously selected entities
              engine.getModel().clearSelection();
              // get the actual tray widget position on the screen
              var elementType = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
              // create a new node at the same position
              var point = engine.getRelativeMousePoint(event);
              var node: any = null;
              switch (elementType) {
                case 'actor':
                  node = new ActorNodeModel({
                    name: clickedObjectName,
                    description: clickedObjectDescription,
                    outOfScope: clickedObjectOutOfScope,
                    outOfScopeReason: clickedObjectOutOfScopeReason,
                    tags: clickedObjectTags,
                    dataFeatures: clickedObjectDataFeatures,
                    techFeatures: clickedObjectTechFeatures,
                    securityFeatures: clickedObjectSecurityFeatures,
                    filterStatementsCallback: filterStatementsCallback,
                  });
                  break;
                case 'process':
                  node = new ProcessNodeModel({
                    name: clickedObjectName,
                    description: clickedObjectDescription,
                    outOfScope: clickedObjectOutOfScope,
                    outOfScopeReason: clickedObjectOutOfScopeReason,
                    tags: clickedObjectTags,
                    dataFeatures: clickedObjectDataFeatures,
                    techFeatures: clickedObjectTechFeatures,
                    securityFeatures: clickedObjectSecurityFeatures,
                    filterStatementsCallback: filterStatementsCallback,
                  });
                  break;
                case 'datastore':
                  node = new DatastoreNodeModel({
                    name: clickedObjectName,
                    description: clickedObjectDescription,
                    outOfScope: clickedObjectOutOfScope,
                    outOfScopeReason: clickedObjectOutOfScopeReason,
                    tags: clickedObjectTags,
                    dataFeatures: clickedObjectDataFeatures,
                    techFeatures: clickedObjectTechFeatures,
                    securityFeatures: clickedObjectSecurityFeatures,
                    filterStatementsCallback: filterStatementsCallback,
                  });
                  break;
                case 'trust-boundary':
                  node = new TrustBoundaryNodeModel({
                    nodeWidth: 150,
                    nodeHeight: 100,
                    nodeX: point.x - 225,
                    nodeY: point.y - 175,
                    name: clickedObjectName,
                    description: clickedObjectDescription,
                    outOfScope: clickedObjectOutOfScope,
                    outOfScopeReason: clickedObjectOutOfScopeReason,
                    tags: clickedObjectTags,
                    filterStatementsCallback: filterStatementsCallback,
                  });
                  break;
              };
              node.setPosition(point);
              engine.getModel().addNode(node);
              // repaint the canvas
              engine.repaintCanvas();
            }}
            onDragOver={(event) => {
              event.preventDefault();
            }}
          >
            <div css={diagramWrapper}>
              { engine && <CanvasWidget engine={engine} /> }
            </div>
          </S.InnerContainer>
        </Grid>
      </S.OuterContainer>

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
  );
};

export default DFDCanvasWidget;