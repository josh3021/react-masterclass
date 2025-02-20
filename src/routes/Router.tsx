import { BrowserRouter, Route, Routes } from "react-router";
import Chart from "./Chart";
import Coin from "./Coin";
import Coins from "./Coins";
import Price from "./Price";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId/*" element={<Coin />}>
          <Route path="chart" element={<Chart />} />
          <Route path="price" element={<Price />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
