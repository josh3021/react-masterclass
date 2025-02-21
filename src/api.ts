import { ICoinOhlcv } from "./routes/Chart";
import { IInfoData, IPriceData } from "./routes/Coin";
import { ICoin } from "./routes/Coins";

const BASE_URL = "https://api.coinpaprika.com/v1";

export const fetchCoins = async (): Promise<ICoin[]> => {
  return fetch(`${BASE_URL}/coins`).then((res) => res.json());
};
export const fetchInfoData = async (coinId?: string): Promise<IInfoData> => {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());
};

export const fetchPriceData = async (coinId?: string): Promise<IPriceData> => {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json());
};

export const fetchCoinOhlcv = async (coinId: string): Promise<ICoinOhlcv[]> => {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}&start=${startDate}&end=${endDate}`
  )
    .then((res) => res.json())
    .then((ohlcvs) => {
      return ohlcvs.map(
        (ohlcv: {
          time_open: number;
          time_close: number;
          open: string;
          high: string;
          low: string;
          close: string;
          volume: string;
          market_cap: number;
        }) => ({
          time_open: ohlcv.time_open * 1000,
          time_close: ohlcv.time_close * 1000,
          close: Number(ohlcv.close),
          high: Number(ohlcv.high),
          low: Number(ohlcv.low),
          open: Number(ohlcv.open),
          volume: Number(ohlcv.volume),
          market_cap: ohlcv.market_cap,
        })
      );
    });
};
