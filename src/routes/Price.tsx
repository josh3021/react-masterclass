import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import styled from "styled-components";
import { fetchCoinOhlcv } from "../api";

type RouteParams = {
  coinId: string;
};

export interface ICoinOhlcv {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const PriceTableContainer = styled.div`
  width: 20rem;
  height: 25rem;
  overflow: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  border-radius: 0.5rem;
  @media (min-width: 768px) {
    width: 40rem;
    height: 35rem;
  }
`;

const PriceTable = styled.table`
  border-collapse: collapse;
  font-size: 1rem;
  min-width: 20rem;
  height: 25rem;
  @media (min-width: 768px) {
    width: 40rem;
    height: 35rem;
  }
`;

const PriceHead = styled.tr`
  color: #ffffff;
  text-align: left;
`;

const PriceTh = styled.th`
  padding: 0.25rem 0.5rem;
  font-weight: bold;
  font-size: 0.75rem;
  overflow: hideen;
  position: sticky;
  top: 0;
  background-color: #009879;
  @media (min-width: 768px) {
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
  }
`;

const PriceTd = styled.td`
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  overflow: hideen;
`;

function Price() {
  const { coinId } = useParams<RouteParams>();

  const { isPending: isOhlcvPending, data: ohlcvs } = useQuery({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinOhlcv(coinId!),
    enabled: !!coinId,
    refetchInterval: 10000,
  });

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {isOhlcvPending || !ohlcvs ? (
        "Loading Chart..."
      ) : (
        <PriceTableContainer>
          <PriceTable>
            <thead>
              <PriceHead>
                <PriceTh>Time Open</PriceTh>
                <PriceTh>Time Close</PriceTh>
                <PriceTh>Open</PriceTh>
                <PriceTh>High</PriceTh>
                <PriceTh>Low</PriceTh>
                <PriceTh>Close</PriceTh>
                <PriceTh>Volume</PriceTh>
                <PriceTh>Market Cap</PriceTh>
              </PriceHead>
            </thead>
            <tbody>
              {ohlcvs?.map((ohlcv, index) => (
                <tr key={index}>
                  <PriceTd>
                    {new Date(ohlcv.time_open)
                      .toISOString()
                      .replace("T", " ")
                      .substring(0, 19)}
                  </PriceTd>
                  <PriceTd>
                    {new Date(ohlcv.time_close)
                      .toISOString()
                      .replace("T", " ")
                      .substring(0, 19)}
                  </PriceTd>
                  <PriceTd>{ohlcv.open}</PriceTd>
                  <PriceTd>{ohlcv.high}</PriceTd>
                  <PriceTd>{ohlcv.low}</PriceTd>
                  <PriceTd>{ohlcv.close}</PriceTd>
                  <PriceTd>{ohlcv.volume.toFixed(2)}</PriceTd>
                  <PriceTd>{ohlcv.market_cap}</PriceTd>
                </tr>
              ))}
            </tbody>
          </PriceTable>
        </PriceTableContainer>
      )}
    </div>
  );
}

export default Price;
