import { render, screen, waitFor } from "@testing-library/react";
import Statistics from "../home/Statistics";
import { totalApi } from "../utils/api";
import { totalData } from "../utils/constants";
import millify from "millify";

// !!! testler apiden gelen verilere bagimli olmamali. Sadece frontendi baglayan testler olmali
// apiden gelen cevap testin gecip gecmemesini etkilememeli
// * buna cozum olarak api isteklerini Mock yapacagiz

// MOCK \\
jest.mock("../utils/api", () => ({
  // mocklayacagim apinin dosya yolu
  totalApi: { get: jest.fn() }, // sahte api yazan fonksiyon
}));

describe("tests of statistics", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("loader component works", () => {
    totalApi.get.mockReturnValue(new Promise(() => {}));
    render(<Statistics />);
    screen.getByTestId("loader");
  });
  test("if error, error component works", async () => {
    totalApi.get.mockRejectedValue(new Error("Error"));
    render(<Statistics />);
    await waitFor(() => screen.getByText("Sorry! There is an error.."));
  });
  test("statistics comes from api and render", async () => {
    totalApi.get.mockResolvedValue({ data: { data: totalData } });
    render(<Statistics />);
    await waitFor(() => expect(totalApi.get).toHaveBeenCalled());
    screen.getByText(millify(totalData.confirmed));
    screen.getByText(millify(totalData.active));
    screen.getByText(millify(totalData.deaths));
  });
});
