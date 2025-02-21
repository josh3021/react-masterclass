import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
  padding: 0 1rem;
  max-width: 30rem;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  a {
    padding: 1rem;
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 2rem;
  height: 2rem;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: ${(props) => props.theme.accentColor};
`;

export interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isPending, error, data } = useQuery({
    queryKey: ["allCoins"],
    queryFn: fetchCoins,
  });
  // const [page, setPage] = useState(0);

  if (error) return "An Error has occurred " + error.message;
  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      {isPending ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <CoinsList>
            {data?.slice(0, 50).map((coin) => (
              <Coin key={coin.id}>
                <Img
                  src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol
                    .toLowerCase()
                    .split(" ")
                    .join("-")}`}
                  alt={coin.symbol}
                />
                <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))}
          </CoinsList>
          {/* <button
            onClick={() => setPage((prev) => (prev >= 50 ? prev - 50 : prev))}
          >
            Prev
          </button>
          <button
            onClick={() =>
              setPage((prev) => (prev <= 48000 ? prev + 50 : prev))
            }
          >
            Next
          </button> */}
        </>
      )}
    </Container>
  );
}

export default Coins;
