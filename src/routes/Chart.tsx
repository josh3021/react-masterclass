import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";

interface IChartProps {
  coinId: string;
}

export interface ICoinHistory {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volumn: string;
  market_cap: number;
}

function Chart({ coinId }: IChartProps) {
  const { isPending: isHistoryPending, data: history } = useQuery({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistory(coinId),
    enabled: !!coinId,
  });
  return <h1>Chart</h1>;
}

export default Chart;
