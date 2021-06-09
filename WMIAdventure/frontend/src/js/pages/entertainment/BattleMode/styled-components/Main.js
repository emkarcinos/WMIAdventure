import styled from 'styled-components';

const Main = styled.main`
  width: 100%;
  margin-top: 72px;
  display: ${({visible}) => visible ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  
  @media (min-width: 768px) {
    width: 80%;
    margin-top: 112px;
  }
`;

export default Main;