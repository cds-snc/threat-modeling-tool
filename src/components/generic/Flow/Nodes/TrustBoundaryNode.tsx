import { memo } from 'react';
import { NodeResizer } from 'reactflow';

import styled from '@emotion/styled';

type StyleProps = {
  selected: boolean;
};

const TrustBoundaryStyle = styled.div`
  border: 2px dashed ${(props: StyleProps) => (props.selected ? '#56bdf9' : '#f00')};
  background-color: ${(props: StyleProps) => (props.selected ? '#dbf1fe' : '#fff')};
  width: 99%;
  height: 99%;
  padding-left: 5px;
`;

const ResizableNodeSelected = ({ id, data, selected }) => {
  return (
    <>
      <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={100} nodeId={id} />
      <TrustBoundaryStyle selected={selected}>{data.name}</TrustBoundaryStyle>
    </>
  );
};

export default memo(ResizableNodeSelected);