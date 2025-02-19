import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Detail from "./detail/Detail";
import Header from "./components/header/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:country" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
