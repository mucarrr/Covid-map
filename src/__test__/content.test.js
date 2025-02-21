import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import Content from "../detail/Content";
import { mockData } from "../utils/constants";

const mockStore = configureStore([thunk]);

test("while store is loading, loader is rendered", () => {
  const store = mockStore({ isLoading: true, error: null, data: null });
  render(
    <Provider store={store}>
      <Content />
    </Provider>
  );
  screen.getAllByTestId("content-loader");
});
test("while store has error, error component is rendered", () => {
  const store = mockStore({
    isLoading: false,
    error: "İnternetiniz çok yavaş",
    data: null,
  });
  render(
    <Provider store={store}>
      <Content />
    </Provider>
  );
  screen.getByTestId("error");
});
test("while store has data, card component is rendered for each data", () => {
  const store = mockStore({
    isLoading: false,
    error: null,
    data: mockData,
  });
  render(
    <Provider store={store}>
      <Content />
    </Provider>
  );
  const arr = Object.entries(mockData).filter(([key]) => key !== "flag");
  arr.forEach((item) => {
    //sonucta bir dizi dondurmek isteseydim maplerdim. sadece gezmek istedigim iicn forEach yaptim
    screen.getByText(item[0]);
    screen.getByText(item[1]);
  });
});
