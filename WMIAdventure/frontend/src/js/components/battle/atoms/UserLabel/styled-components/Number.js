import styled from 'styled-components';

const Number = styled.p`
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
  font-weight: ${({theme}) => theme.weight.regular};
  color: ${({theme}) => theme.colors.darkgrey};
  margin: 0;
  padding-left: 10px;
`;

export default Number;