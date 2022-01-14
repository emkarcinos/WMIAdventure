import styled from 'styled-components';

const P = styled.p`
  text-align: center;
  max-width: 342px;
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  font-weight: ${({theme}) => theme.weight.regular};
  color: ${({theme}) => theme.colors.dark};
  margin: 0;
  line-height: 24px;
`;

export default P;