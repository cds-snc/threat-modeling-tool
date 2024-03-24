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
      <BoxIcon role='button' aria-label='actor-icon' onClick={() => addCallback && addCallback('actor')}/>
      <CircleIcon role='button' aria-label='process-icon' onClick={() => addCallback && addCallback('process')}/>
      <SectionIcon role='button' aria-label='datastore-icon' onClick={() => addCallback && addCallback('datastore')}/>
      <TransparencyGridIcon role='button' aria-label='trust-boundary-icon' onClick={() => addCallback && addCallback('trustBoundary')}/>
    </NodeSelectorStyle>
  );
});
