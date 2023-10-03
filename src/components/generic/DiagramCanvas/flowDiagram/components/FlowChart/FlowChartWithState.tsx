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
import * as React from 'react';
import styled from 'styled-components';
import mapValues from '../../container/utils/mapValues';
import { FlowChart, IChart, IConfig, IFlowChartComponents, IOnNodeDoubleClick, IOnLabelDoubleClick } from '../..';
import {
  onDragNode, onDragCanvas, onLinkStart, onLinkMove, onLinkComplete,
  onLinkCancel, onLinkMouseEnter, onLinkMouseLeave, onLinkClick,
  onCanvasClick, onDeleteKey, onNodeClick,
  onNodeSizeChange, onPortPositionChange, onCanvasDrop,
} from '../../container/actions';
import { Input, Button, Select, Message } from '../../element';

const ModelBox = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0,0,0,0.8);
  z-index: 99;

  &.hide {
    display: none;
  }
`;

const ModelContent = styled.div`
  position: relative;
  width: 50%;
  background: #fff;
  margin: 10% auto;
  border-radius: 10px;
  padding: 0.5rem;
`;

const ButtonBox =styled.div`
  width: 100px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-right: 1rem;
  text-align: center;
  margin-right: 40px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const InputBox = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  padding: 0 1rem;
  
  & label {
    width: 20%;
  }

  & input {
    width: 100%;
    height: 30px;
    padding-left: 0.5rem;
  }
`;

export interface IFlowChartWithStateProps {
  initialValue: IChart;
  Components?: IFlowChartComponents;
  config?: IConfig;
  getWorkFlowChartValue?: (workFlowValue: any) => void;
  isAllowAddLinkLabel?: boolean;
  nodeRoleOptions: any[];
};

let timer:any = null;


/**
 * Flow Chart With State
 */
class FlowChartWithState extends React.Component<IFlowChartWithStateProps, IChart> {
  public state: IChart;

  constructor (props: IFlowChartWithStateProps) {
    super(props);
    this.state = {
      ...props.initialValue,
      preNodes: Object.keys(props.initialValue.nodes),
      preLinks: Object.keys(props.initialValue.links),
      isModelShow: false,
      showModelName: '',
      nodeName: '',
      nodeId: '',
      nodeRoleOption: '',
      linkLabel: '',
      newNodeId: '',
      clickNodeId: '',
      newLinkId: '',
      clickLinkId: '',
      modelOption: 'addNode',
      alertMessageInfo: '',
      alertMessageStatus: 'init',
    };
  };

  onNodeDoubleClick: IOnNodeDoubleClick = ({ nodeId }) => {
    let clickNodeProperties = this.state.nodes[nodeId].properties;
    clickNodeProperties = !!clickNodeProperties ? clickNodeProperties : {};

    this.setState({
      modelOption: 'editNode',
      showModelName: 'newNodeModel',
      clickNodeId: nodeId,
      nodeName: clickNodeProperties.name,
      nodeId: clickNodeProperties.Id,
      nodeRoleOption: !!clickNodeProperties.nodeRole ? clickNodeProperties.nodeRole : '',
    }, () => {
      this.setState({
        isModelShow: true,
      });
    });
  };

  onLabelDoubleClick: IOnLabelDoubleClick = ({ linkId }) => {
    this.setState((preState) => {
      let preLabel = !!preState.links[linkId].properties && !!preState.links[linkId].properties.label ? preState.links[linkId].properties.label: '';
      return {
        isModelShow: true,
        showModelName: 'newLinkModel',
        linkLabel: preLabel,
        modelOption: 'editLabel',
        clickLinkId: linkId,
      };
    });
  };

  private stateActions = mapValues({
    onDragNode,
    onDragCanvas,
    onLinkStart,
    onLinkMove,
    onLinkComplete,
    onLinkCancel,
    onLinkMouseEnter,
    onLinkMouseLeave,
    onLinkClick,
    onCanvasClick,
    onDeleteKey,
    onNodeClick,
    onNodeSizeChange,
    onPortPositionChange,
    onCanvasDrop,
    onNodeDoubleClick: this.onNodeDoubleClick,
    onLabelDoubleClick: this.onLabelDoubleClick,
  }, (func: any) => (...args: any) => this.setState(func(...args)));

  hideModel = () => {
    this.setState({
      isModelShow: false,
      nodeName: '',
      nodeId: '',
      linkLabel: '',
    });
  };

  handleCancelEditNode = () => {
    if (this.state.modelOption === 'addNode') {
      let _newNodeId = this.state.newNodeId;

      console.log('\\//\\//\\// New Node ID: ', _newNodeId);

      let _nodes = {};
      let _preNodes: any = [];

      Object.keys(this.state.nodes).forEach(nodeId => {
        if (nodeId !== _newNodeId) {
          _nodes[nodeId] = this.state.nodes[nodeId];
        }
      });

      this.state.preNodes.forEach((preNodeId: any) => {
        if (preNodeId !== _newNodeId) {
          _preNodes.push(preNodeId);
        }
      });

      this.setState({
        newNodeId: '',
        nodes: _nodes,
        preNodes: _preNodes,
      });
    }

    this.hideModel();
  };

  handleNameInput = (e: any) => {
    this.setState({
      nodeName: e.currentTarget.value,
    });
  };

  handleDescriptionInput = (e: any) => {
    this.setState({
      nodeId: e.currentTarget.value,
    });
  };

  handleLinkDescriptionInput = (e: any) => {
    this.setState({
      linkLabel: e.currentTarget.value,
    });
  };

  setNodeInfo = (): boolean => {
    console.log('***&&&*** nodeName: ', this.state.nodeName);
    console.log('***&&&*** newNodeId: ', this.state.newNodeId);
    console.log('***&&&*** clickNodeId: ', this.state.clickNodeId);
    let nodeKey = '';
    for (var key of Object.keys(this.state.nodes)) {
      console.log('***&&&*** current node.position: ', this.state.nodes[key].position);
      if (nodeKey !== '' && this.state.nodes[key].position === this.state.nodes[nodeKey].position) {
        console.log('***&&&*** WE HAVE A MATCH ');
        delete this.state.nodes[key];
      }
      nodeKey = key;
    }

    if (this.state.nodeName.trim() === '') {
      this.warningMessage('Please input the node name!');
      return false;
    }
    let _nodes = this.state.nodes;
    let _nodeId = this.state.modelOption === 'addNode' ? this.state.newNodeId : this.state.clickNodeId;
    _nodes[_nodeId].properties = {
      name: this.state.nodeName,
      Id: this.state.nodeId,
      nodeRole: this.state.nodeRoleOption,
    };
    this.setState({
      nodes: _nodes,
      isModelShow: false,
    });
    return true;
  };

  setLinkInfo = () => {
    let _links = this.state.links;
    if (this.state.modelOption === 'editLabel') {
      _links[this.state.clickLinkId].properties = {
        label: this.state.linkLabel,
      };
    } else if (this.state.modelOption === 'addLabel') {
      _links[this.state.newLinkId].properties = {
        label: this.state.linkLabel,
      };
    }

    this.setState({
      links: _links,
      isModelShow: false,
      linkLabel: '',
    });
  };

  handleNodeRoleChange = (value: string): void => {
    // console.log(value)
    this.setState({
      nodeRoleOption: value,
    });
  };

  renderAddNewNodeModel = () => {
    const { nodeRoleOptions = [] } = this.props;
    // console.log("nodeRoleOptions: ", nodeRoleOptions)
    return (
      <ModelBox className={this.state.isModelShow ? '' : 'hide'}>
        <ModelContent>
          <div className="InputBox">
            <InputBox>
              <label>Name:</label>
              <Input onChange={this.handleNameInput} value={this.state.nodeName} type="text" />
            </InputBox>
            <InputBox>
              <label>Id:</label>
              <Input onChange={this.handleDescriptionInput} value={this.state.nodeId} type="text" />
            </InputBox>
            <InputBox>
              <label>Role:</label>
              <Select
                optionList={ nodeRoleOptions }
                value={!!this.state.nodeRoleOption ? this.state.nodeRoleOption : nodeRoleOptions[0].rGuid}
                onChange={this.handleNodeRoleChange} >
              </Select>
            </InputBox>
          </div>
          <ButtonBox>
            <Button onClick={this.setNodeInfo} type="primary">Confirm</Button>
            <Button onClick={this.handleCancelEditNode} type="cancel">Cancel</Button>
          </ButtonBox>
        </ModelContent>
      </ModelBox>
    );
  };

  renderAddNewLinkModel = () => {
    if (this.props.isAllowAddLinkLabel !== true) {
      return false;
    };
    return (
      <ModelBox className={this.state.isModelShow ? '' : 'hide'}>
        <ModelContent>
          <div className="InputBox">
            <InputBox>
              <label>Name:</label>
              <Input onChange={this.handleLinkDescriptionInput} value={this.state.linkLabel} type="text" />
            </InputBox>
          </div>
          <ButtonBox>
            <Button onClick={this.setLinkInfo} type="primary">Confirm</Button>
            <Button onClick={this.hideModel} type="cancel">Cancel</Button>
          </ButtonBox>
        </ModelContent>
      </ModelBox>
    );
  };

  warningMessage = (content: string): void => {
    this.setState(() => ({
      alertMessageInfo: content,
      alertMessageStatus: 'show',
    }));

    clearTimeout(timer);
    timer = setTimeout(() => {
      this.setState({
        alertMessageStatus: 'hide',
      });
    }, 2000);
  };

  renderAlertMessage = () => {
    return (
      <Message errorInfo={this.state.alertMessageInfo} alertMessageStatus={this.state.alertMessageStatus} />
    );
  };

  componentDidUpdate() {
    let flowData = this.state;
    delete flowData.offset.node;
    for (var key of Object.keys(flowData.nodes)) {
      let node = flowData.nodes[key];
      if (node.position && node.position.node) {
        delete node.position.node;
      }
    }
    // console.log("flow data: ", JSON.stringify(flowData))
    if (!!this.props.getWorkFlowChartValue) {
      this.props.getWorkFlowChartValue(flowData);
    }

    // when user add new link, he shold add the label of this link
    let addedLinkNumber = 0;
    for (var linkKey in this.state.links) {
      if (!!this.state.links[linkKey].to && !!this.state.links[linkKey].to.nodeId) {
        addedLinkNumber += 1;
      }
    }

    if (addedLinkNumber > this.state.preLinks.length) {
      let _preLinks = this.state.preLinks;
      let _currentLinks = Object.keys(this.state.links);
      let _newLink = _currentLinks.filter(link => !_preLinks.includes(link));

      this.setState({
        isModelShow: true,
        showModelName: 'newLinkModel',
        modelOption: 'addLabel',
        newLinkId: _newLink[0],
      });
    }

    if (addedLinkNumber != this.state.preLinks.length) {
      this.setState((preState) => ({
        preLinks: Object.keys(preState.links),
      }));
    }

    if (Object.keys(this.state.nodes).length > this.state.preNodes.length) {
      // console.log("Add Node");
      let preNodes = this.state.preNodes;
      let currentNodes = Object.keys(this.state.nodes);
      let newNode = currentNodes.filter(node => !preNodes.includes(node));

      this.setState({
        isModelShow: true,
        showModelName: 'newNodeModel',
        modelOption: 'addNode',
        newNodeId: newNode[0],
        nodeName: '',
        nodeId: '',
      });
    }
    if (Object.keys(this.state.nodes).length != this.state.preNodes.length) {
      this.setState((preState) => ({
        preNodes: Object.keys(preState.nodes),
      }));
    }
  }

  public render () {
    const { Components, config } = this.props;

    return (
      <React.Fragment>
        { this.state.showModelName === 'newNodeModel' ? this.renderAddNewNodeModel() : ''}
        { this.state.showModelName === 'newLinkModel' ? this.renderAddNewLinkModel() : ''}
        { this.renderAlertMessage() }
        <FlowChart
          chart={this.state}
          callbacks={this.stateActions}
          Components={ Components }
          config={config}
          isAllowAddLinkLabel={!!this.props.isAllowAddLinkLabel}
        />
      </React.Fragment>
    );
  }
};

export default FlowChartWithState;