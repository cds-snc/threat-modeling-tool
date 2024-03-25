import { memo } from 'react';
import { Handle, Position } from 'reactflow';

import styled from '@emotion/styled';

type StyleProps = {
  selected: boolean;
};

const ActorStyle = styled.div`
  padding: 10px 50px 10px 50px;
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
      <ActorStyle selected={selected}>
        {data.name}
      </ActorStyle>
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