import { ICoinHistory } from "./routes/Chart";
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

export const fetchCoinHistory = async (
  coinId: string
): Promise<ICoinHistory[]> => {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}&start=${startDate}&end=${endDate}`
  ).then((res) => res.json());
};
