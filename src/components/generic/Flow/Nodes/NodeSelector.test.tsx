import { render, fireEvent } from '@testing-library/react';
import NodeSelector from './NodeSelector';

describe('NodeSelector', () => {
it('should call the addCallback function with "actor" when BoxIcon is clicked', () => {
    const addCallback = jest.fn();
    const { getByRole } = render(<NodeSelector addCallback={addCallback} />);
    fireEvent.click(getByRole('button', {name: 'actor-icon'}));
    expect(addCallback).toHaveBeenCalledWith('actor');
});

it('should call the addCallback function with "process" when CircleIcon is clicked', () => {
    const addCallback = jest.fn();
    const { getByRole } = render(<NodeSelector addCallback={addCallback} />);
    fireEvent.click(getByRole('button', {name: 'process-icon'}));
    expect(addCallback).toHaveBeenCalledWith('process');
});

  it('should call the addCallback function with "datastore" when SectionIcon is clicked', () => {
    const addCallback = jest.fn();
    const { getByRole } = render(<NodeSelector addCallback={addCallback} />);
    fireEvent.click(getByRole('button', {name: 'datastore-icon'}));
    expect(addCallback).toHaveBeenCalledWith('datastore');
  });

  it('should call the addCallback function with "trustBoundary" when TransparencyGridIcon is clicked', () => {
    const addCallback = jest.fn();
    const { getByRole } = render(<NodeSelector addCallback={addCallback} />);
    fireEvent.click(getByRole('button', {name: 'trust-boundary-icon'}));
    expect(addCallback).toHaveBeenCalledWith('trustBoundary');
  });
});