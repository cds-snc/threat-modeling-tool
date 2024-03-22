import { memo } from 'react';
import { BoxIcon, CircleIcon, SectionIcon, TransparencyGridIcon } from '@radix-ui/react-icons';

import styled from '@emotion/styled';

type NodeSelectorProps = {
  addCallback?: (string) => void;
};

const NodeSelectorStyle = styled.div`
    border: 2px solid #000;
    padding: 10px;
`;

export default memo(({ addCallback }: NodeSelectorProps) => {
  return (
    <NodeSelectorStyle>
      <BoxIcon onClick={() => addCallback && addCallback('actor')}/>
      <CircleIcon onClick={() => addCallback && addCallback('process')}/>
      <SectionIcon onClick={() => addCallback && addCallback('datastore')}/>
      <TransparencyGridIcon onClick={() => addCallback && addCallback('trustBoundary')}/>
    </NodeSelectorStyle>
  );
});
