import { render } from '@testing-library/react';
import { ReactFlowProvider } from 'reactflow';
import ProcessNode from './ProcessNode';

describe('ProcessNode', () => {
  it('should render the actor name', () => {
    const data = { name: 'Name' };
    const selected = false;
    const { getByText } = render(<ReactFlowProvider><ProcessNode data={data} selected={selected} /></ReactFlowProvider>);
    expect(getByText('Name')).toBeInTheDocument();
  });
});