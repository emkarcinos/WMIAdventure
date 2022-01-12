import styled from 'styled-components';

const P = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: ${({theme}) => theme.weight.regular};
  color: ${({theme}) => theme.colors.dark};
  margin: 0 20px;
  text-align: center;
`;

export default P;