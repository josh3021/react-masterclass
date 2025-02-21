import { useQuery } from "@tanstack/react-query";
import ApexChart from "react-apexcharts";
import { useParams } from "react-router";
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

function Chart() {
  const { coinId } = useParams<RouteParams>();
  const { isPending: isOhlcvPending, data: ohlcv } = useQuery({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinOhlcv(coinId!),
    enabled: !!coinId,
    refetchInterval: 10000,
  });
  return (
    <div>
      {isOhlcvPending || !ohlcv ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data: ohlcv.map((price) => ({
                x: new Date(price.time_close),
                y: [
                  Number(price.open),
                  Number(price.high),
                  Number(price.low),
                  Number(price.close),
                ],
              })),
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: true },
            yaxis: {
              show: true,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: true },
              type: "datetime",
              categories: ohlcv?.map((price) =>
                new Date(price.time_close).toISOString()
              ),
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
