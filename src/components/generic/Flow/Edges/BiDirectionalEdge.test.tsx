import { render } from '@testing-library/react';
import { Position, ReactFlowProvider } from 'reactflow';

import BiDirectionalEdge from './BiDirectionalEdge';

describe('BiDirectionalEdge', () => {
  it('renders without errors', () => {
    const props = {
        id: 'edge1',
        source: 'node1',
        target: 'node2',
        sourceX: 100,
        sourceY: 200,
        targetX: 300,
        targetY: 400,
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        selected: false,
        data: { name: 'Edge 1' },
    };

    render(<ReactFlowProvider><svg><BiDirectionalEdge {...props} /></svg></ReactFlowProvider>);
  });
});