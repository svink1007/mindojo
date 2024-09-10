import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Select from './Select';

describe('Select', () => {
  it('should render the select options and handle selection', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(
      <Select options={['Option 1', 'Option 2']} onChange={handleChange} />
    );

    fireEvent.change(getByRole('combobox'), { target: { value: 'Option 1' } });
    expect(handleChange).toHaveBeenCalled();
  });
});
