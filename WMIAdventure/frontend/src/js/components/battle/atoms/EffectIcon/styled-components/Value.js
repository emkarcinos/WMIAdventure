import styled from 'styled-components';

const Value = styled.p`
  display: block;
  margin: 0 0 0 10px;
  font-size: ${({value}) => value > 9 ? '14x' : '24px'};
  font-family: 'Roboto', sans-serif;
  font-weight: ${({theme}) => theme.weight.regular};
  color: ${({theme}) => theme.colors.dark};
`;

export default Value;