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

// test edilecek fonksiyon
/* const fn = (a, b) => a + b;

// testleri gruplandırmak için kullanırız
describe("fonksiyon testleri", () => {
  // bütün testlerin öncesinde bir kez çalışır
  beforeAll(() => {
    console.log("beforeAll çalıştı");
  });

  // bütün testlerin sonrasında bir kez çalışır
  afterAll(() => {
    console.log("afterAll çalıştı");
  });

  // her bir testin öncesinde çalışır
  beforeEach(() => {
    console.log("beforeEach çalıştı");
  });

  // her bir testin sonrasında çalışır
  afterEach(() => {
    console.log("afterEach çalıştı");
  });

  // fonksiyonun 1. testi
  test("pozitif sayılarda çalışır", () => {
    const sum = fn(9, 6);
    expect(sum).toBe(15);
  });

  // fonksiyonun 2. testi
  test("negatif sayılarda çalışır", () => {
    const sum = fn(-6, -8);
    expect(sum).toBe(-14);
  });
}); */
