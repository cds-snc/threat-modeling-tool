import { render } from '@testing-library/react';
import { ReactFlowProvider } from 'reactflow';
import TrustBoundaryNode from './TrustBoundaryNode';

describe('TrustBoundaryNode', () => {
  it('should render the actor name', () => {
    const data = { name: 'Name' };
    const id = 'id';
    const selected = false;
    const { getByText } = render(<ReactFlowProvider><TrustBoundaryNode id={id} data={data} selected={selected} /></ReactFlowProvider>);
    expect(getByText('Name')).toBeInTheDocument();
  });
});