import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const Btn = styled.button`
  color: #fff;
  background-color: tomato;
  border: 0;
  border-radius: 1rem;
`;

const Box = styled.div`
  width: 6rem;
  height: 6rem;
  background-color: ${(props) => props.bgColor};
`;

const Circle = styled(Box)`
  width: 6rem;
  height: 6rem;
  background-color: ${(props) => props.bgColor};
  border-radius: 3rem;
`;

const Link = styled(Btn)``;

const Input = styled.input.attrs({ required: true })`
  background-color: tomato;
`;

function App() {
  return (
    <Father>
      <Btn>로그인</Btn>
      <Btn as="a" href="/">
        로그인
      </Btn>
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
    </Father>
  );
}

export default App;
