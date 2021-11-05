import styled from 'styled-components';

const Number = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  font-weight: ${({theme}) => theme.weight.medium};
  color: ${({theme}) => theme.colors.dark};
  margin: 2px 0 0 0;
  padding-left: 10px;
`;

export default Number;