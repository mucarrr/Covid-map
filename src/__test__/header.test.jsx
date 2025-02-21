import { BrowserRouter } from "react-router-dom";
import Header from "../detail/Header";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";
import configureStore from "redux-mock-store";
import { mockData } from "../utils/constants";

const mockStore = configureStore([thunk]);

it("while store is loading, loader is rendered", () => {
  const store = mockStore({ isLoading: true, error: null, data: null });
  render(
    // 1.eger component icinde <Link/> varsa onun sarmalayicisi ile test icindeki componenti de sarmalamaliyim.
    // 2. component icinde useSelector oldugu icin ve useSelector provder ile sarmalanmadan calismadigi icin onu da sarmalamaliyim
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );
  screen.getByTestId("header-loader");
});
it("when store is loaded, loader is not rendered", () => {
  const store = mockStore({ isLoading: false, error: null, data: null });
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );
  const loader = screen.queryByTestId("header-loader");
  expect(loader).toBeNull();
});
it("when data comes to store, data is rendered", () => {
  const store = mockStore({ isLoading: false, error: null, data: mockData });

  render(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  ); //elemanlar ekrana geldi mi tek tek kontrol edecegim
  screen.getByRole("heading", { name: mockData.country });
  const img = screen.getByAltText(mockData.flag.alt); //resimleri boyle aliyorum
  expect(img).toHaveAttribute("src", mockData.flag.png);
});

/* Selector metodlari:

*** birinci kisim 
1. get....ekranda component var mi yoksa hata verir
2. query...ekrandaki componenti alamazsa null verir, testi sonlandirmaz
3. find... ekrana async olarak basilan componentleri alir

*** ikinci kisim
All ifadesi tek metodla birden fazla eleman almak istedigimde kullanilir. donen cevap her zaman dizi icinde olur 
queryAllBy, getAllBy, findAllBy

*** ucuncu kisim 
sorgu metodlari: hangi yontemle elementi sececegim
ByRole
ByLabelText
ByPlaceholder
ByText
ByDisplayValue
ByAltText
ByTitle
ByTestId


*/
