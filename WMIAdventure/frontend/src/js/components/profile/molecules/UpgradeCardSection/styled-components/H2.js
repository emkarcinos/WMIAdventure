import styled from 'styled-components';

const H2 = styled.h2`
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  font-weight: ${({theme}) => theme.weight.medium};
  margin: 0;
  color: ${({theme}) => theme.colors.dark};
  text-transform: uppercase;
`;

export default H2;