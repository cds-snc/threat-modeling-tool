import { memo } from 'react';
import { Handle, Position } from 'reactflow';

import styled from '@emotion/styled';

type StyleProps = {
  selected: boolean;
};

const ProcessStyle = styled.div`
  border-radius: 50%;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px; 
  border: 2px solid ${(props: StyleProps) => (props.selected ? '#56bdf9' : '#000')};
  background-color: ${(props: StyleProps) => (props.selected ? '#dbf1fe' : '#fff')};
`;

export default memo(({ data, selected }: { data: any; selected: boolean }) => {
  return (
    <>
      <Handle
        type="source"
        id="top-source"
        position={Position.Top}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={true}
      />
      <Handle
        type="source"
        id="left-source"
        position={Position.Left}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={true}
      />
      <ProcessStyle selected={selected}>
        {data.name}
      </ProcessStyle>
      <Handle
        type="source"
        id="right-source"
        position={Position.Right}
        style={{ background: '#555' }}
        isConnectable={true}
      />
      <Handle
        type="source"
        id="bottom-source"
        position={Position.Bottom}
        style={{ background: '#555' }}
        isConnectable={true}
      />
    </>
  );
});