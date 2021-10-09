import styled from 'styled-components';

const H2 = styled.h2`
  font-size: 24px;
  text-transform: uppercase;
  font-weight: ${({theme}) => theme.weight.semibold};
  margin: 20px 0 14px 0;
  
  @media (min-width: 768px) {
    margin-bottom: 32px;
  }
`;

export default H2;