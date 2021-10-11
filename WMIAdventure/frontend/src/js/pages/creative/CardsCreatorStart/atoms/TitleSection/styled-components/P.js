import styled from 'styled-components';

const P = styled.p`
  line-height: 22px;
  font-size: 14px;
  margin: 0;
  font-weight: 200;
  max-width: 190px;
  text-align: center;
  
  @media (min-width: ${({theme}) => theme.overMobile}px) {
    font-size: 24px;
    max-width: 500px;
    line-height: 30px;
  }
`;

export default P;