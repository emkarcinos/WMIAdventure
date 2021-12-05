import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    flex-direction: column;
    margin: 0;
  }
`;

export default Container;