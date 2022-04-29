const { render, screen } = require('@testing-library/react');
const { default: Highlight } = require('.');

describe('<Highlight />', () => {
  it('renders a value', () => {
    const value = '3000';

    render(<Highlight value={value} />)

    expect(screen.getByText(value)).toBeInTheDocument();
  })

  it('renders another value', () => {
    const value = '5000';

    render(<Highlight value={value} />)

    expect(screen.getByText(value)).toBeInTheDocument();
  })
})