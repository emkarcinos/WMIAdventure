import styled from 'styled-components';

const H2 = styled.h2`
  font-size: 24px;
  text-transform: uppercase;
  font-weight: ${({theme}) => theme.weight.semibold};
  margin: 90px 0 14px 0;
  
  @media (min-width: ${({theme}) => theme.overMobile}px) {
    margin-bottom: 32px;
  }
`;

export default H2;