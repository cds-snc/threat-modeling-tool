import { memo } from 'react';
import { DoubleArrowUpIcon, ArrowUpIcon, ArrowDownIcon, DoubleArrowDownIcon } from '@radix-ui/react-icons';

import styled from '@emotion/styled';

type ZIndexChangerProps = {
  addCallback?: (string) => void;
};

const ZIndexChangerStyle = styled.div`
    border: 1px dashed #000;
    padding: 5px;
`;

export default memo(({ addCallback }: ZIndexChangerProps) => {
  return (
    <ZIndexChangerStyle>
      <DoubleArrowUpIcon role='button' aria-label='double-arrow-up-icon' onClick={() => addCallback && addCallback('first')}/>
      <ArrowUpIcon role='button' aria-label='arrow-up-icon' onClick={() => addCallback && addCallback('up')}/>
      <ArrowDownIcon role='button' aria-label='arrow-down-icon' onClick={() => addCallback && addCallback('down')}/>
      <DoubleArrowDownIcon role='button' aria-label='double-arrow-down-icon' onClick={() => addCallback && addCallback('last')}/>
    </ZIndexChangerStyle>
  );
});
