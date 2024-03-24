import { render } from '@testing-library/react';
import { ReactFlowProvider } from 'reactflow';
import ActorNode from './ActorNode';

describe('ActorNode', () => {
  it('should render the actor name', () => {
    const data = { name: 'Name' };
    const selected = false;
    const { getByText } = render(<ReactFlowProvider><ActorNode data={data} selected={selected} /></ReactFlowProvider>);
    expect(getByText('Name')).toBeInTheDocument();
  });
});