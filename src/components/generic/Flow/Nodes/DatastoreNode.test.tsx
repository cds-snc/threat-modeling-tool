import { render } from '@testing-library/react';
import { ReactFlowProvider } from 'reactflow';
import DatastoreNode from './DatastoreNode';

describe('DatastoreNode', () => {
  it('should render the actor name', () => {
    const data = { name: 'Name' };
    const selected = false;
    const { getByText } = render(<ReactFlowProvider><DatastoreNode data={data} selected={selected} /></ReactFlowProvider>);
    expect(getByText('Name')).toBeInTheDocument();
  });
});