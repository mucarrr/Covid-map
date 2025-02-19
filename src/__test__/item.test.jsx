import { render, screen } from "@testing-library/react";
import Item from "../home/Item";

// prop olan elementleri test ediyorsak testte de proplar gonderilmeli
test("Gonderilen proplar dogru sekilde kullanilir", () => {
  // 1.Render    2. Proplari benzer degerler kullanarak ekle
  render(<Item color="text-blue-500" text="Toplam Test" value="299M" />);
  // 3. color ile basliyoruz. color ikonun classname ine gidiyor. ikonu al
  const icon = screen.getByTestId("icon");
  // 4.color propu ile gelen deger iconun classname inde var mi?
  expect(icon).toHaveClass("text-blue-500");
  // 5. text iceriklerini kontrol ederken iki yol var
  // 1. elementi cagir icerigi kontrol et
  const h2 = screen.getByRole("heading");
  expect(h2).toHaveTextContent("299M");
  // 2. elementi text ine gore cagir
  screen.getByText("Toplam Test");
});
