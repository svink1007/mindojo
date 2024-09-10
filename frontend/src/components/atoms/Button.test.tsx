import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('should render the button and handle click event', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick}>Click Me</Button>);

    fireEvent.click(getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
