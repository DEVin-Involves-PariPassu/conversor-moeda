import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import App from './App'

beforeAll(() => jest.spyOn(window, 'fetch'));

describe('<App />', () => {

  test('shows the amount in brazilian real after submit', async () => {
    render(<App />);

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        USDBRL: { ask: "5.16" }
      })
    })

    userEvent.type(screen.getByLabelText(/valor/i), "3000");
    userEvent.selectOptions(screen.getByLabelText(/moeda/i), "USD");
    userEvent.click(screen.getByRole('button', {name: /calcular/i}));

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(await screen.findByText("15480.00")).toBeInTheDocument()

  })

  test('renders on error message from the server', async () => {
    render(<App />);

    window.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        message: "test error"
      })
    })

    userEvent.type(screen.getByLabelText(/valor/i), "3000");
    userEvent.selectOptions(screen.getByLabelText(/moeda/i), "USD");
    userEvent.click(screen.getByRole('button', {name: /calcular/i}));

    expect(await screen.findByRole('alert')).toHaveTextContent("test error")

  })

})