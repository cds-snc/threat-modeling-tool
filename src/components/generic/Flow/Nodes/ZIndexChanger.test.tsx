import { render, fireEvent } from '@testing-library/react';
import ZIndexChanger from './ZIndexChanger';

describe('ZIndexChanger', () => {
it('should call the addCallback function with "first" when DoubleArrowUpIcon is clicked', () => {
    const addCallback = jest.fn();
    const { getByRole } = render(<ZIndexChanger addCallback={addCallback} />);
    fireEvent.click(getByRole('button', {name: 'double-arrow-up-icon'}));
    expect(addCallback).toHaveBeenCalledWith('first');
});

it('should call the addCallback function with "up" when ArrowUpIcon is clicked', () => {
    const addCallback = jest.fn();
    const { getByRole } = render(<ZIndexChanger addCallback={addCallback} />);
    fireEvent.click(getByRole('button', {name: 'arrow-up-icon'}));
    expect(addCallback).toHaveBeenCalledWith('up');
});

  it('should call the addCallback function with "down" when ArrowDownIcon is clicked', () => {
    const addCallback = jest.fn();
    const { getByRole } = render(<ZIndexChanger addCallback={addCallback} />);
    fireEvent.click(getByRole('button', {name: 'arrow-down-icon'}));
    expect(addCallback).toHaveBeenCalledWith('down');
  });

  it('should call the addCallback function with "last" when DoubleArrowDownIcon is clicked', () => {
    const addCallback = jest.fn();
    const { getByRole } = render(<ZIndexChanger addCallback={addCallback} />);
    fireEvent.click(getByRole('button', {name: 'double-arrow-down-icon'}));
    expect(addCallback).toHaveBeenCalledWith('last');
  });
});