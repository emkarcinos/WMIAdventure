import styled from 'styled-components';

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;

  @media (min-width: 400px) {
    margin-bottom: 26px;
  }
`;

export default MainDiv;