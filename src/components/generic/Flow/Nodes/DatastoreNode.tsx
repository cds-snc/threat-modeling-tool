import { memo } from 'react';
import { Handle, Position } from 'reactflow';

import styled from '@emotion/styled';

const DatastoreStyle = styled.div`
  padding: 10px 50px 10px 50px;
  border: 1px solid #000;
`;

const InsideDatastore = styled.div`
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  margin-top:5px;
  marigin-bottom:5px;
`;

export default memo(({ data }: { data: any }) => {
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
      <DatastoreStyle>
        <InsideDatastore>
          {data.label}
        </InsideDatastore>
      </DatastoreStyle>
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