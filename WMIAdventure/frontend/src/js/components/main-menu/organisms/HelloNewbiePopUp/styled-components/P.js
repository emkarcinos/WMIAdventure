import styled from 'styled-components';

const P = styled.p`
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  font-weight: ${({theme}) => theme.weight.regular};
  color: ${({theme}) => theme.colors.dark};
  margin: 0;
  line-height: 24px;
  text-align: center;
`;

export default P;