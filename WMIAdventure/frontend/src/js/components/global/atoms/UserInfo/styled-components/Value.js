import styled from 'styled-components';

const Value = styled.p`
  margin: 0;
  line-height: 24px;
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  font-weight: ${({theme}) => theme.weight.regular};
  color: ${({theme}) => theme.colors.dark};
`;

export default Value;