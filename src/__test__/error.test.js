import { fireEvent, render, screen } from "@testing-library/react";
import Error from "../components/Error";

it("prop info works, error message is rendered", () => {
  // componenti yazarken proplarini da eklemek zorundayim
  render(<Error info="İnternetiniz çok yavaş" refetch={() => {}} />); //fonksiyonu bos yazdim cunku test etmeyecegim
  screen.getByText(/yavaş/i);
});
it("prop refetch works when button is clicked ", () => {
  const mockFn = jest.fn();
  render(<Error info="İnternetiniz çok yavaş" refetch={mockFn} />);
  const button = screen.getByRole("button");
  fireEvent.click(button);
  expect(mockFn).toHaveBeenCalled();
});
