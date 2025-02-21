import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import {
  Link,
  Location,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router";
import styled from "styled-components";
import { fetchInfoData, fetchPriceData } from "../api";

// Styled Components
const Container = styled.div`
  padding: 0px 20px;
  max-width: 45rem;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
`;

const HomeLink = styled(Link)`
  width: 4rem;
  height: 4rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: ${({ theme }) => theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const OverviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const TabsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ $isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.accentColor : theme.textColor};
  width: 100%;
  a {
    display: block;
  }
`;

type RouteParams = {
  coinId: string;
};

interface RouteState {
  name?: string;
}

export interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

export interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
// Components
const Overview = ({
  info,
  ticker,
}: {
  info: IInfoData;
  ticker: IPriceData;
}) => (
  <>
    <OverviewContainer>
      <OverviewItem>
        <span>Rank</span>
        <span>{info.rank}</span>
      </OverviewItem>
      <OverviewItem>
        <span>Symbol</span>
        <span>${info.symbol}</span>
      </OverviewItem>
      <OverviewItem>
        <span>Price:</span>
        <span>${ticker.quotes.USD.price.toLocaleString("ko-KR")}</span>
      </OverviewItem>
    </OverviewContainer>
    <Description>{info.description}</Description>
    <OverviewContainer>
      <OverviewItem>
        <span>Total Supply</span>
        <span>{ticker.total_supply.toLocaleString("ko-KR")}</span>
      </OverviewItem>
      <OverviewItem>
        <span>Max Supply</span>
        <span>{ticker.max_supply.toLocaleString("ko-KR")}</span>
      </OverviewItem>
    </OverviewContainer>
  </>
);

const Tabs = ({ coinId }: { coinId: string }) => {
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  return (
    <TabsContainer>
      <Tab $isActive={chartMatch !== null}>
        <Link to={`/${coinId}/chart`}>Chart</Link>
      </Tab>
      <Tab $isActive={priceMatch !== null}>
        <Link to={`/${coinId}/price`}>Price</Link>
      </Tab>
    </TabsContainer>
  );
};

// Main Component
function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state }: Location<RouteState> = useLocation();

  const { isPending: isInfoPending, data: info } = useQuery({
    queryKey: ["info", coinId],
    queryFn: () => fetchInfoData(coinId),
    enabled: !!coinId,
  });

  const { isPending: isTickerPending, data: ticker } = useQuery({
    queryKey: ["ticker", coinId],
    queryFn: () => fetchPriceData(coinId),
    enabled: !!coinId,
  });

  const isLoading = isInfoPending || isTickerPending;
  const hasData = info && ticker;

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ?? (isInfoPending ? "Loading..." : info?.name)}
        </title>
      </Helmet>
      <Header>
        <HomeLink to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            width="2rem"
            height="2rem"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </HomeLink>
        <Title>
          {state?.name ?? (isInfoPending ? "Loading..." : info?.name)}
        </Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : hasData ? (
        <>
          <Overview info={info} ticker={ticker} />
          <Tabs coinId={coinId!} />
          <Outlet />
        </>
      ) : null}
    </Container>
  );
}

export default Coin;
